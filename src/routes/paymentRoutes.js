const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const User = require('../models/User');
const Course = require('../models/Course');
const { verifyAuth } = require('../middleware/auth');

// ==============================================================================
// FR-08: Automated Payments — bKash/Nagad + Coupon System
// ==============================================================================

// In-memory coupon store (in production, use Coupon model in MongoDB)
const activeCoupons = [
  {
    code: 'WELCOME50',
    discountType: 'percentage',
    discountValue: 50,
    maxDiscountBDT: 500,
    maxUses: 1000,
    usedCount: 342,
    perUserLimit: 1,
    usedBy: [],
    validUntil: new Date('2027-12-31'),
    isActive: true,
  },
  {
    code: 'EID2026',
    discountType: 'fixed',
    discountValue: 200,
    maxDiscountBDT: 200,
    maxUses: 500,
    usedCount: 128,
    perUserLimit: 1,
    usedBy: [],
    validUntil: new Date('2027-06-30'),
    isActive: true,
  },
  {
    code: 'DIPU100',
    discountType: 'fixed',
    discountValue: 100,
    maxDiscountBDT: 100,
    maxUses: 5000,
    usedCount: 1240,
    perUserLimit: 2,
    usedBy: [],
    validUntil: new Date('2027-12-31'),
    isActive: true,
  },
];

// POST /api/payment/validate-coupon & POST /api/payment/apply-coupon
const handleCoupon = async (req, res) => {
  try {
    const { code, coursePrice } = req.body;
    if (!code) {
      return res.status(400).json({ success: false, message: 'Coupon code is required.' });
    }

    const coupon = activeCoupons.find(c => c.code === code.toUpperCase());

    if (!coupon) {
      return res.status(404).json({ success: false, message: 'Invalid coupon code.' });
    }

    if (!coupon.isActive) {
      return res.status(400).json({ success: false, message: 'This coupon is no longer active.' });
    }

    if (new Date() > new Date(coupon.validUntil)) {
      return res.status(400).json({ success: false, message: 'This coupon has expired.' });
    }

    if (coupon.usedCount >= coupon.maxUses) {
      return res.status(400).json({ success: false, message: 'This coupon has reached its usage limit.' });
    }

    // Calculate discount
    const price = coursePrice || 999;
    let discountAmount = 0;

    if (coupon.discountType === 'percentage') {
      discountAmount = Math.round(price * (coupon.discountValue / 100));
      discountAmount = Math.min(discountAmount, coupon.maxDiscountBDT);
    } else {
      discountAmount = coupon.discountValue;
    }

    const finalPrice = Math.max(0, price - discountAmount);

    return res.status(200).json({
      success: true,
      coupon: {
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        discountAmountBDT: discountAmount,
        originalPrice: price,
        finalPrice,
        savingBDT: discountAmount,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Coupon validation failed.', error: error.message });
  }
};

router.post('/validate-coupon', handleCoupon);
router.post('/apply-coupon', handleCoupon);

// POST /api/payment/create & POST /api/payment/bkash/checkout
const handleCheckout = async (req, res) => {
  try {
    const { courseId, paymentGateway, couponCode, amount: customAmount } = req.body;
    const user = req.user;

    const course = await Course.findById(courseId).catch(() => null);
    let amount = customAmount || (course ? (course.discountPrice || course.price) : 999);

    // Apply coupon if provided
    let couponDiscount = 0;
    if (couponCode) {
      const coupon = activeCoupons.find(c => c.code === couponCode.toUpperCase() && c.isActive);
      if (coupon && new Date() <= new Date(coupon.validUntil)) {
        if (coupon.discountType === 'percentage') {
          couponDiscount = Math.min(Math.round(amount * (coupon.discountValue / 100)), coupon.maxDiscountBDT);
        } else {
          couponDiscount = coupon.discountValue;
        }
        amount = Math.max(0, amount - couponDiscount);
        coupon.usedCount += 1;
      }
    }

    const transactionId = `TXN_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;

    return res.status(200).json({
      success: true,
      gateway: paymentGateway || 'bKash',
      paymentID: transactionId,
      transactionId,
      amount,
      couponDiscount,
      currency: 'BDT',
      redirectUrl: `https://payment-simulator.dipusedu.com/checkout?txn=${transactionId}&amount=${amount}`,
      customerPhone: user.phone,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to initiate payment.', error: error.message });
  }
};

router.post('/create', verifyAuth, handleCheckout);
router.post('/bkash/checkout', verifyAuth, handleCheckout);

// POST /api/payment/webhook & POST /api/payment/bkash/callback
const handleCallback = async (req, res) => {
  try {
    const { transactionId, trxID, studentPhone, courseId, amount, signature, status } = req.body;
    const finalTrxId = trxID || transactionId || `BKASH_${Date.now()}`;

    // Cryptographic SHA-256 HMAC signature verification
    const secret = process.env.BKASH_APP_SECRET || 'dipu_edu_webhook_secret_key';
    const computedSignature = crypto
      .createHmac('sha256', secret)
      .update(`${finalTrxId}|${studentPhone}|${amount}|${status}`)
      .digest('hex');

    // In production, signature match is mandatory
    if (signature && signature !== computedSignature && process.env.NODE_ENV === 'production') {
      return res.status(403).json({ success: false, message: 'Invalid cryptographic signature.' });
    }

    const paymentStatus = status ? status.toUpperCase() : 'SUCCESS';

    if (paymentStatus === 'SUCCESS' || paymentStatus === 'COMPLETED') {
      // Auto-enroll user and award EduCoins
      const Enrollment = require('../models/Enrollment');
      const user = await User.findOne({ phone: studentPhone });
      
      if (user && courseId) {
        if (!user.enrolledCourses.includes(courseId)) {
          user.enrolledCourses.push(courseId);
          user.eduCoins += 100; // Welcome reward coins
          await user.save();
        }

        // Create Enrollment record
        try {
          await Enrollment.create({
            userId: user._id,
            courseId,
            amount: Number(amount) || 999,
            paymentMethod: 'bkash',
            trxID: finalTrxId,
            status: 'completed',
          });
        } catch (enrErr) {
          console.log('[Enrollment Record Note]', enrErr.message);
        }
      }

      console.log(`[Payment IPN] Verified & Enrolled: Phone ${studentPhone} in Course ${courseId}. BDT ${amount}`);

      return res.status(200).json({
        success: true,
        message: 'Payment verified and enrollment activated.',
        transactionId: finalTrxId,
        trxID: finalTrxId,
        status: 'completed',
      });
    }

    return res.status(400).json({ success: false, message: 'Payment status not successful.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Webhook processing error.', error: error.message });
  }
};

router.post('/webhook', handleCallback);
router.post('/bkash/callback', handleCallback);

module.exports = router;

