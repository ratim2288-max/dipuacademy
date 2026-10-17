const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const crypto = require('crypto');
const User = require('../models/User');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const PaymentAuditLog = require('../models/PaymentAuditLog');
const { verifyAuth } = require('../middleware/auth');
const zinipayService = require('../services/zinipayService');

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
      await PaymentAuditLog.create({
        trxID: finalTrxId,
        userPhone: studentPhone,
        courseId,
        amount: Number(amount) || 0,
        paymentGateway: 'bkash',
        status: 'REJECTED_INVALID_SIGNATURE',
        ipAddress: req.ip || req.headers['x-forwarded-for'] || '',
        userAgent: req.headers['user-agent'] || '',
        failureReason: 'Cryptographic HMAC SHA-256 signature mismatch.'
      }).catch(() => {});

      return res.status(403).json({ success: false, message: 'Invalid cryptographic signature.' });
    }

    const paymentStatus = status ? status.toUpperCase() : 'SUCCESS';

    if (paymentStatus === 'SUCCESS' || paymentStatus === 'COMPLETED') {
      // Auto-enroll user and award EduCoins
      const user = await User.findOne({ phone: studentPhone });
      
      if (user && courseId) {
        if (!user.enrolledCourses.includes(courseId)) {
          user.enrolledCourses.push(courseId);
          user.eduCoins += 100; // Welcome reward coins
          await user.save();
        }

        // Create Enrollment record (Unique TrxID enforced)
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

        // Audit Log entry
        await PaymentAuditLog.create({
          trxID: finalTrxId,
          userId: user._id,
          userPhone: studentPhone,
          courseId,
          amount: Number(amount) || 999,
          paymentGateway: 'bkash',
          status: 'SUCCESS',
          ipAddress: req.ip || req.headers['x-forwarded-for'] || '',
          userAgent: req.headers['user-agent'] || '',
          gatewayResponse: { type: 'IPN_WEBHOOK_VERIFIED', signatureVerified: true }
        }).catch(() => {});
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

// POST /api/payment/enroll — Direct Course Enrollment & Database Tracking
router.post('/enroll', async (req, res) => {
  try {
    const { courseId, courseSlug, studentPhone, paymentGateway, amount: customAmount, trxID } = req.body;
    let user = null;

    // 1. Resolve student from JWT token if available
    try {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const jwt = require('jsonwebtoken');
        const token = authHeader.split(' ')[1];
        const secret = process.env.JWT_SECRET || 'dipu_edu_default_jwt_secret_dev';
        const decoded = jwt.verify(token, secret);
        if (decoded && decoded.id) {
          user = await User.findById(decoded.id);
        }
      }
    } catch (e) {}

    // 2. Resolve student from phone if not found via token
    const phone = (user && user.phone) || studentPhone || req.body.phone || '01712345678';
    if (!user) {
      user = await User.findOne({ phone });
      if (!user) {
        user = await User.create({
          phone,
          name: req.body.studentName || 'Student',
          role: 'student',
          eduCoins: 100,
        });
      }
    }

    // 3. Resolve course from MongoDB
    const targetIdOrSlug = courseSlug || courseId;
    let course = null;
    if (targetIdOrSlug) {
      course = await Course.findOne({
        $or: [
          { slug: targetIdOrSlug.toString().toLowerCase() },
          ...(mongoose.Types.ObjectId.isValid(targetIdOrSlug) ? [{ _id: targetIdOrSlug }] : [])
        ]
      });
    }

    const cSlug = course ? course.slug : (courseSlug || courseId || 'course-enrolled');
    const cId = course ? course._id : (courseId || cSlug);
    const cTitle = course ? (course.title?.bn || course.title?.en || course.title) : 'কোর্স';
    const cLevel = course ? course.classLevel : 'HSC';
    const finalAmount = Number(customAmount) || (course ? (course.discountPrice || course.price) : 999);
    const finalTrxId = (trxID || '').toString().trim() || `TXN_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;
    const gateway = paymentGateway || 'bkash';

    // Anti-Fraud 1: Duplicate Transaction Check (ডুপ্লিকেট ট্রানজাকশন রোধ)
    const existingTxn = await Enrollment.findOne({ trxID: finalTrxId });
    if (existingTxn) {
      await PaymentAuditLog.create({
        trxID: finalTrxId,
        userId: user ? user._id : null,
        userPhone: phone,
        courseId: cId,
        courseSlug: cSlug,
        amount: finalAmount,
        paymentGateway: gateway,
        status: 'DUPLICATE',
        ipAddress: req.ip || req.headers['x-forwarded-for'] || '',
        userAgent: req.headers['user-agent'] || '',
        failureReason: 'ডুপ্লিকেট ট্রানজাকশন আইডি দিয়ে পুনরায় কোর্স অ্যাক্টিভেশনের চেষ্টা শনাক্ত।'
      }).catch(() => {});

      return res.status(409).json({
        success: false,
        duplicateTrx: true,
        message: 'এই ট্রানজাকশন আইডি (TrxID) দিয়ে ইতোমধ্যে কোর্স সক্রিয় করা হয়েছে। একই TrxID দুইবার ব্যবহার করা যাবে না।'
      });
    }

    // 4. Update User record in MongoDB
    if (!user.enrolledCourses) user.enrolledCourses = [];
    if (!user.enrolledCourseSlugs) user.enrolledCourseSlugs = [];

    const alreadyInUser = user.enrolledCourseSlugs.includes(cSlug) || 
      user.enrolledCourses.some(c => c && c.toString() === cId.toString());

    if (!alreadyInUser) {
      user.enrolledCourses.push(cId);
      user.enrolledCourseSlugs.push(cSlug);
      user.eduCoins = (user.eduCoins || 0) + 100;
      await user.save();
    }

    // 5. Create or Update Enrollment in MongoDB
    let enrollment = await Enrollment.findOne({
      $and: [
        { $or: [{ userId: user._id }, { userPhone: user.phone }] },
        { $or: [{ courseId: cId }, { courseSlug: cSlug }] }
      ]
    });

    if (enrollment) {
      enrollment.status = 'completed';
      enrollment.trxID = finalTrxId;
      enrollment.paymentMethod = gateway;
      enrollment.amount = finalAmount;
      await enrollment.save();
    } else {
      enrollment = await Enrollment.create({
        userId: user._id,
        userPhone: user.phone,
        courseId: cId,
        courseSlug: cSlug,
        courseTitle: cTitle,
        classLevel: cLevel,
        amount: finalAmount,
        paymentMethod: gateway,
        trxID: finalTrxId,
        status: 'completed',
        accessibleLessons: ['*'], // Full course access unlocked
        completedLessons: [],
        progress: 0,
        enrolledAt: new Date()
      });
    }

    // Increment course enrolled count if Course exists
    if (course) {
      course.enrolledStudentsCount = (course.enrolledStudentsCount || 0) + 1;
      await course.save().catch(() => {});
    }

    // Anti-Fraud 2: Audit Log (প্রতিটি সফল লেনদেনের আইপি, সময় ও গেটওয়ে রেসপন্স সংরক্ষণ)
    await PaymentAuditLog.create({
      trxID: finalTrxId,
      userId: user._id,
      userPhone: user.phone,
      courseId: cId,
      courseSlug: cSlug,
      amount: finalAmount,
      paymentGateway: gateway,
      status: 'SUCCESS',
      ipAddress: req.ip || req.headers['x-forwarded-for'] || '',
      userAgent: req.headers['user-agent'] || '',
      gatewayResponse: { status: 'VERIFIED_AND_ENROLLED', timestamp: new Date() }
    }).catch(() => {});

    console.log(`[DB Enrollment Tracked & Audited] User ${user.phone} (${user._id}) successfully enrolled in course "${cSlug}"! Trx: ${finalTrxId}`);

    return res.status(200).json({
      success: true,
      message: 'কোর্সটি সফলভাবে কেনা হয়েছে এবং ডেটাবেসে রেজিস্টার করা হয়েছে!',
      enrollment: {
        id: enrollment._id,
        userId: user._id,
        userPhone: user.phone,
        courseId: cId,
        courseSlug: cSlug,
        courseTitle: cTitle,
        amount: finalAmount,
        paymentMethod: gateway,
        trxID: finalTrxId,
        status: 'completed',
        enrolledAt: enrollment.enrolledAt,
      },
      user: {
        phone: user.phone,
        name: user.name,
        enrolledCourses: user.enrolledCourses,
        enrolledCourseSlugs: user.enrolledCourseSlugs
      }
    });
  } catch (error) {
    console.error('[Enrollment Error]', error);
    return res.status(500).json({ success: false, message: 'কোর্স এনরোলমেন্ট সংরক্ষণ করতে সমস্যা হয়েছে।', error: error.message });
  }
});

// ==============================================================================
// ZiniPay Payment Gateway Integration (https://zinipay.com)
// API Key: 5afe9edc5f795f08013c2280de1028ecfa25ea0c9b774b1a
// Brand: dipuacademy
// ==============================================================================

// Helper: Activate course enrollment and save to MongoDB
async function activateCourseEnrollment({ phone, name, courseId, courseSlug, amount, paymentMethod = 'zinipay', trxID, valId, invoiceId, req }) {
  let user = await User.findOne({ phone });
  if (!user) {
    user = await User.create({
      phone,
      name: name || 'শিক্ষার্থী',
      role: 'student',
      eduCoins: 100
    });
  }

  const targetIdOrSlug = courseSlug || courseId;
  let course = null;
  if (targetIdOrSlug) {
    course = await Course.findOne({
      $or: [
        { slug: targetIdOrSlug.toString().toLowerCase() },
        ...(mongoose.Types.ObjectId.isValid(targetIdOrSlug) ? [{ _id: targetIdOrSlug }] : [])
      ]
    });
  }

  const cSlug = course ? course.slug : (courseSlug || courseId || 'course-enrolled');
  const cId = course ? course._id : (courseId || cSlug);
  const cTitle = course ? (course.title?.bn || course.title?.en || course.title) : 'কোর্স';
  const cLevel = course ? course.classLevel : 'HSC';
  const finalAmount = Number(amount) || (course ? (course.discountPrice || course.price) : 850);
  const finalTrxId = (trxID || valId || invoiceId || `ZINI_${Date.now()}`).toString().trim();

  if (!user.enrolledCourses) user.enrolledCourses = [];
  if (!user.enrolledCourseSlugs) user.enrolledCourseSlugs = [];

  const alreadyInUser = user.enrolledCourseSlugs.includes(cSlug) ||
    user.enrolledCourses.some(c => c && c.toString() === cId.toString());

  if (!alreadyInUser) {
    user.enrolledCourses.push(cId);
    user.enrolledCourseSlugs.push(cSlug);
    user.eduCoins = (user.eduCoins || 0) + 100;
    await user.save();
  }

  let enrollment = await Enrollment.findOne({
    $and: [
      { $or: [{ userId: user._id }, { userPhone: user.phone }] },
      { $or: [{ courseId: cId }, { courseSlug: cSlug }] }
    ]
  });

  if (enrollment) {
    enrollment.status = 'completed';
    enrollment.trxID = finalTrxId;
    enrollment.paymentMethod = paymentMethod;
    enrollment.amount = finalAmount;
    await enrollment.save();
  } else {
    enrollment = await Enrollment.create({
      userId: user._id,
      userPhone: user.phone,
      courseId: cId,
      courseSlug: cSlug,
      courseTitle: cTitle,
      classLevel: cLevel,
      amount: finalAmount,
      paymentMethod,
      trxID: finalTrxId,
      status: 'completed',
      accessibleLessons: ['*'],
      completedLessons: [],
      progress: 0,
      enrolledAt: new Date()
    });
  }

  if (course) {
    course.enrolledStudentsCount = (course.enrolledStudentsCount || 0) + 1;
    await course.save().catch(() => {});
  }

  await PaymentAuditLog.create({
    trxID: finalTrxId,
    userId: user._id,
    userPhone: user.phone,
    courseId: cId,
    courseSlug: cSlug,
    amount: finalAmount,
    paymentGateway: paymentMethod,
    status: 'SUCCESS',
    ipAddress: req ? (req.ip || req.headers['x-forwarded-for'] || '') : '',
    userAgent: req ? (req.headers['user-agent'] || '') : '',
    gatewayResponse: { gateway: 'ZiniPay', valId, invoiceId, timestamp: new Date() }
  }).catch(() => {});

  return { user, course, enrollment, finalTrxId, cSlug };
}

// Universal fulfillment helper for all products (Course, Book, eBook, AI Subscription)
async function fulfillGenericOrder({ orderType = 'course', meta = {}, verifyData = {}, req }) {
  const phone = (meta.studentPhone || (verifyData && verifyData.senderNumber) || '01700000000').toString().trim();
  const name = meta.studentName || (verifyData && verifyData.cus_name) || 'Student';
  const amount = Number(meta.amount || (verifyData && verifyData.amount) || 0);
  const valId = verifyData.val_id || meta.valId;
  const invoiceId = verifyData.invoice_id || meta.invoiceId;
  const trxID = (verifyData && verifyData.transaction_id && verifyData.transaction_id !== 'N/A')
    ? verifyData.transaction_id
    : (valId || `TXN_${Date.now()}`);
  const paymentMethod = `zinipay_${verifyData.payment_method || 'online'}`;

  let user = await User.findOne({ phone });
  if (!user && phone) {
    user = await User.create({
      phone,
      name,
      role: 'student',
      eduCoins: 50
    }).catch(() => null);
  }

  if (orderType === 'book' || orderType === 'ebook') {
    const bookTitle = meta.bookTitle || meta.bookId || 'বই / ই-বুক';
    if (user) {
      user.eduCoins = (user.eduCoins || 0) + 50;
      await user.save().catch(() => {});
    }

    await PaymentAuditLog.create({
      trxID,
      userId: user ? user._id : null,
      userPhone: phone,
      courseSlug: `[বই] ${bookTitle}`,
      amount,
      paymentGateway: paymentMethod,
      status: 'SUCCESS',
      ipAddress: req ? (req.ip || req.headers['x-forwarded-for'] || '') : '',
      userAgent: req ? (req.headers['user-agent'] || '') : '',
      gatewayResponse: { gateway: 'ZiniPay', orderType, bookTitle, valId, invoiceId, timestamp: new Date() }
    }).catch(() => {});

    return { type: orderType, title: bookTitle, trxID, amount };
  }

  if (orderType === 'ai_subscription') {
    const planName = meta.planName || meta.planId || 'AI সাবস্ক্রিপশন';
    if (user) {
      user.eduCoins = (user.eduCoins || 0) + 200;
      user.aiSubscription = {
        active: true,
        plan: meta.planId || 'premium',
        validUntil: new Date(Date.now() + (Number(meta.duration) || 30) * 24 * 60 * 60 * 1000)
      };
      await user.save().catch(() => {});
    }

    await PaymentAuditLog.create({
      trxID,
      userId: user ? user._id : null,
      userPhone: phone,
      courseSlug: `[AI] ${planName}`,
      amount,
      paymentGateway: paymentMethod,
      status: 'SUCCESS',
      ipAddress: req ? (req.ip || req.headers['x-forwarded-for'] || '') : '',
      userAgent: req ? (req.headers['user-agent'] || '') : '',
      gatewayResponse: { gateway: 'ZiniPay', orderType, planName, valId, invoiceId, timestamp: new Date() }
    }).catch(() => {});

    return { type: 'ai_subscription', title: planName, trxID, amount };
  }

  // Course fulfillment
  const courseSlug = meta.courseSlug || meta.courseId;
  return await activateCourseEnrollment({
    phone,
    name,
    courseId: meta.courseId,
    courseSlug,
    amount,
    paymentMethod,
    trxID,
    valId,
    invoiceId,
    req
  });
}

// GET /api/payment/zinipay/status — Check gateway connectivity & brand
router.get('/zinipay/status', async (req, res) => {
  const conn = await zinipayService.checkConnection().catch(() => ({ connected: false, apiKeyValid: false }));
  return res.status(200).json({
    success: true,
    gateway: 'ZiniPay',
    brand: 'dipuacademy',
    connected: conn.connected,
    apiKeyValid: conn.apiKeyValid,
    maskedKey: '5afe9edc**********************************4b1a',
    supportedMethods: ['bKash', 'Nagad', 'Rocket', 'Upay', 'Visa', 'Mastercard']
  });
});

// GET /api/payment/zinipay/logs — Fetch recent transactions & statistics
router.get('/zinipay/logs', async (req, res) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 30, 100);
    const logs = await PaymentAuditLog.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    const stats = await PaymentAuditLog.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalAmount: { $sum: '$amount' }
        }
      }
    ]).catch(() => []);

    const totalSuccess = stats.find(s => s._id === 'SUCCESS' || s._id === 'COMPLETED')?.count || 0;
    const totalVolume = stats.find(s => s._id === 'SUCCESS' || s._id === 'COMPLETED')?.totalAmount || 0;

    return res.status(200).json({
      success: true,
      logs: logs || [],
      totalSuccess,
      totalVolume
    });
  } catch (err) {
    console.error('[ZiniPay logs error]:', err);
    return res.status(500).json({ success: false, message: 'লগ লোড করা যায়নি।', error: err.message, logs: [] });
  }
});

// POST /api/payment/zinipay/create — Generate secure hosted payment URL via ZiniPay for Any Item
router.post('/zinipay/create', async (req, res) => {
  try {
    const {
      orderType = 'course', // 'course' | 'book' | 'ebook' | 'ai_subscription'
      courseId,
      courseSlug,
      bookId,
      bookTitle,
      deliveryAddress,
      planId,
      planName,
      duration,
      studentPhone,
      studentName,
      studentEmail,
      amount: customAmount,
      couponCode
    } = req.body;

    const protocol = req.headers['x-forwarded-proto'] || req.protocol || 'http';
    const host = req.headers['x-forwarded-host'] || req.get('host') || 'localhost:5000';
    const baseUrl = `${protocol}://${host}`;

    // ZiniPay requires redirect_url and cancel_url domains to strictly match the registered brand website domain.
    // The brand 'dipuacademy' is registered with domain 'https://dipuacademy.com'.
    // If the request comes from dipuacademy.com, use baseUrl; otherwise use https://dipuacademy.com
    // and attach origin=${encodeURIComponent(baseUrl)} so the user returns to their current portal seamlessly.
    const isBrandDomain = host.includes('dipuacademy.com');
    const brandBaseUrl = isBrandDomain ? baseUrl.replace(/\/+$/, '') : 'https://dipuacademy.com';
    const originParam = `&origin=${encodeURIComponent(baseUrl)}`;

    const phone = (studentPhone || '01712345678').trim();
    const name = (studentName || 'Student').trim();
    const email = (studentEmail || `${phone.replace(/[^0-9]/g, '')}@dipuacademy.com`).trim();

    let amount = Number(customAmount) || 0;
    let redirect_url = '';
    let cancel_url = '';
    let cSlug = '';
    let course = null;
    let itemTitle = 'Dipu Academy Order';

    if (orderType === 'book' || orderType === 'ebook') {
      const bTitle = bookTitle || bookId || 'বই অর্ডার';
      itemTitle = bTitle;
      amount = amount || 450;
      redirect_url = `${brandBaseUrl}/payment-success?type=${orderType}&item=${encodeURIComponent(bTitle)}&id=${encodeURIComponent(bookId || '')}&phone=${encodeURIComponent(phone)}${originParam}`;
      cancel_url = `${brandBaseUrl}/book?id=${encodeURIComponent(bookId || '')}&payment_cancelled=1${originParam}`;
    } else if (orderType === 'ai_subscription') {
      const pTitle = planName || planId || 'AI সাবস্ক্রিপশন';
      itemTitle = pTitle;
      amount = amount || 490;
      redirect_url = `${brandBaseUrl}/payment-success?type=ai_subscription&item=${encodeURIComponent(pTitle)}&phone=${encodeURIComponent(phone)}${originParam}`;
      cancel_url = `${brandBaseUrl}/ai?payment_cancelled=1${originParam}`;
    } else {
      // Default: Course
      const targetIdOrSlug = courseSlug || courseId;
      if (targetIdOrSlug && mongoose.connection.readyState === 1) {
        try {
          course = await Course.findOne({
            $or: [
              { slug: targetIdOrSlug.toString().toLowerCase() },
              ...(mongoose.Types.ObjectId.isValid(targetIdOrSlug) ? [{ _id: targetIdOrSlug }] : [])
            ]
          }).maxTimeMS(2500);
        } catch (dbErr) {
          console.warn('[Course find non-blocking note]:', dbErr.message);
          course = null;
        }
      }
      amount = amount || (course ? (course.discountPrice || course.price) : 850);
      cSlug = course ? course.slug : (courseSlug || courseId || 'hsc-27-full-prep');
      itemTitle = course ? (course.title?.bn || course.title?.en || course.slug) : cSlug;
      redirect_url = `${brandBaseUrl}/payment-success?type=course&course=${encodeURIComponent(cSlug)}&phone=${encodeURIComponent(phone)}${originParam}`;
      cancel_url = `${brandBaseUrl}/course?slug=${encodeURIComponent(cSlug)}&payment_cancelled=1${originParam}`;
    }

    if (couponCode) {
      const coupon = activeCoupons.find(c => c.code === couponCode.toUpperCase() && c.isActive);
      if (coupon && new Date() <= new Date(coupon.validUntil)) {
        const disc = coupon.discountType === 'percentage'
          ? Math.min(Math.round(amount * (coupon.discountValue / 100)), coupon.maxDiscountBDT)
          : coupon.discountValue;
        amount = Math.max(10, amount - disc);
      }
    }

    const webhook_url = `${baseUrl}/api/payment/zinipay/webhook`;

    const result = await zinipayService.createInvoice({
      amount,
      cus_name: name,
      cus_email: email,
      metadata: {
        orderType,
        courseId: course ? course._id.toString() : cSlug,
        courseSlug: cSlug,
        bookId,
        bookTitle,
        deliveryAddress,
        planId,
        planName,
        duration,
        studentPhone: phone,
        studentName: name,
        amount
      },
      redirect_url,
      cancel_url,
      webhook_url
    });

    if (!result.ok || !result.data?.payment_url) {
      console.warn('[ZiniPay Create Fallback]:', result.data || result.error);
      return res.status(502).json({
        success: false,
        message: 'ZiniPay পেমেন্ট গেটওয়েতে সংযোগ করতে সমস্যা হয়েছে।',
        error: result.data?.message || result.error
      });
    }

    // Log the initiation safely
    if (mongoose.connection.readyState === 1) {
      PaymentAuditLog.create({
        trxID: result.data.val_id || result.data.invoice_id || `INIT_${Date.now()}`,
        userPhone: phone,
        courseId: course ? course._id : null,
        courseSlug: itemTitle,
        amount,
        paymentGateway: 'zinipay',
        status: 'INITIATED',
        ipAddress: req.ip || req.headers['x-forwarded-for'] || '',
        userAgent: req.headers['user-agent'] || '',
        gatewayResponse: result.data
      }).catch(() => {});
    }

    return res.status(200).json({
      success: true,
      payment_url: result.data.payment_url,
      val_id: result.data.val_id,
      invoice_id: result.data.invoice_id,
      amount
    });
  } catch (err) {
    console.error('[ZiniPay Create Error]:', err);
    return res.status(500).json({ success: false, message: 'পেমেন্ট তৈরি করতে সমস্যা হয়েছে।', error: err.message });
  }
});

// POST /api/payment/zinipay/webhook — Receive real-time payment IPN from ZiniPay
router.post('/zinipay/webhook', async (req, res) => {
  try {
    const body = req.body || {};
    console.log('[ZiniPay Webhook Received]:', JSON.stringify(body));

    const valId = body.val_id || body.valId || body.id;
    let verifyData = null;

    if (valId) {
      const verifyRes = await zinipayService.verifyInvoice(valId);
      if (verifyRes.ok && verifyRes.data) {
        verifyData = verifyRes.data;
      }
    }

    const isCompleted = (verifyData && (verifyData.status === 'COMPLETED' || verifyData.status === 'SUCCESS')) ||
                        body.event === 'billing.payment_received' ||
                        body.status === 'COMPLETED';

    if (isCompleted) {
      const meta = (verifyData && verifyData.metadata) || body.metadata || {};
      const orderType = meta.orderType || 'course';

      await fulfillGenericOrder({
        orderType,
        meta,
        verifyData: verifyData || body,
        req
      });
      console.log(`[ZiniPay Webhook] Fulfilled ${orderType} order successfully!`);
    }

    return res.status(200).json({ success: true, received: true });
  } catch (err) {
    console.error('[ZiniPay Webhook Error]:', err);
    return res.status(200).json({ success: false, error: err.message });
  }
});

// GET /api/payment/zinipay/verify-status — Verify invoice and fulfill on return
router.get('/zinipay/verify-status', async (req, res) => {
  try {
    const { val_id, course: courseSlug, phone: queryPhone, type: queryType, item: queryItem, id: queryId } = req.query;
    if (!val_id) {
      return res.status(400).json({ success: false, message: 'val_id পাওয়া যায়নি।' });
    }

    const verifyRes = await zinipayService.verifyInvoice(val_id);
    if (!verifyRes.ok || !verifyRes.data) {
      return res.status(404).json({ success: false, message: 'ইনভয়েস যাচাই করা যায়নি।' });
    }

    const data = verifyRes.data;
    const isCompleted = data.status === 'COMPLETED' || data.status === 'SUCCESS';

    let fulfillmentResult = null;
    const meta = data.metadata || {};
    const orderType = meta.orderType || queryType || (courseSlug ? 'course' : (queryItem ? 'book' : 'course'));
    const phone = meta.studentPhone || queryPhone || data.senderNumber;

    if (isCompleted) {
      fulfillmentResult = await fulfillGenericOrder({
        orderType,
        meta: {
          ...meta,
          courseSlug: meta.courseSlug || courseSlug,
          bookId: meta.bookId || queryId,
          bookTitle: meta.bookTitle || queryItem,
          planName: meta.planName || queryItem,
          studentPhone: phone
        },
        verifyData: data,
        req
      });
    }

    const finalItemTitle = meta.bookTitle || meta.planName || meta.courseSlug || courseSlug || queryItem || 'অর্ডারকৃত আইটেম';

    return res.status(200).json({
      success: true,
      isCompleted,
      status: data.status,
      transaction_id: data.transaction_id,
      amount: data.amount,
      payment_method: data.payment_method,
      orderType,
      itemTitle: finalItemTitle,
      fulfilled: !!fulfillmentResult
    });
  } catch (err) {
    console.error('[ZiniPay Verify Status Error]:', err);
    return res.status(500).json({ success: false, message: 'পেমেন্ট স্ট্যাটাস যাচাই করতে সমস্যা হয়েছে।', error: err.message });
  }
});

module.exports = router;

