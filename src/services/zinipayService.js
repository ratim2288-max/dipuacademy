/**
 * ZiniPay Payment Gateway Integration Service
 * Official Website: https://zinipay.com
 * API Documentation: https://api.zinipay.com/v1/
 */

const ZINIPAY_API_KEY = process.env.ZINIPAY_API_KEY || '5afe9edc5f795f08013c2280de1028ecfa25ea0c9b774b1a';
const ZINIPAY_BASE_URL = (process.env.ZINIPAY_BASE_URL || 'https://api.zinipay.com').replace(/\/+$/, '');

/**
 * Initialize a hosted payment invoice
 * @param {Object} params
 * @param {number} params.amount - Amount in BDT
 * @param {string} params.cus_name - Customer / Student Name
 * @param {string} params.cus_email - Customer Email
 * @param {Object} params.metadata - Custom transaction metadata (courseId, studentPhone, etc.)
 * @param {string} params.redirect_url - URL to redirect student after payment
 * @param {string} params.cancel_url - URL to redirect student if cancelled
 * @param {string} params.webhook_url - Webhook listener on our server
 * @returns {Promise<Object>} ZiniPay creation response containing payment_url and val_id
 */
async function createInvoice({ amount, cus_name, cus_email, metadata = {}, redirect_url, cancel_url, webhook_url }) {
  try {
    const payload = {
      amount: Number(amount),
      cus_name: (cus_name || 'Student').trim(),
      cus_email: (cus_email || 'student@dipuacademy.com').trim(),
      metadata,
      redirect_url,
      cancel_url: cancel_url || redirect_url,
      webhook_url
    };

    const res = await fetch(`${ZINIPAY_BASE_URL}/v1/payment/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'zini-api-key': ZINIPAY_API_KEY
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    return {
      status: res.status,
      ok: res.ok && data.status === true,
      data
    };
  } catch (error) {
    console.error('[ZiniPay createInvoice error]:', error);
    return {
      status: 500,
      ok: false,
      error: error.message
    };
  }
}

/**
 * Verify a payment invoice via val_id
 * @param {string} val_id - ZiniPay validation ID
 * @returns {Promise<Object>} Verification details from ZiniPay
 */
async function verifyInvoice(val_id) {
  try {
    const res = await fetch(`${ZINIPAY_BASE_URL}/v1/payment/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'zini-api-key': ZINIPAY_API_KEY
      },
      body: JSON.stringify({ val_id })
    });

    const data = await res.json();
    return {
      status: res.status,
      ok: res.ok,
      data
    };
  } catch (error) {
    console.error('[ZiniPay verifyInvoice error]:', error);
    return {
      status: 500,
      ok: false,
      error: error.message
    };
  }
}

/**
 * Verify a direct Transaction ID (bKash/Nagad/Rocket TrxID)
 * @param {string} transactionId - e.g. "BLA123XYZ"
 * @param {number} amount - Expected BDT amount
 * @returns {Promise<Object>}
 */
async function verifyTransaction(transactionId, amount) {
  try {
    const res = await fetch(`${ZINIPAY_BASE_URL}/v1/trx/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'zinipay-api-key': ZINIPAY_API_KEY,
        'zini-api-key': ZINIPAY_API_KEY
      },
      body: JSON.stringify({
        transactionId: transactionId.trim(),
        amount: Number(amount)
      })
    });

    const data = await res.json();
    return {
      status: res.status,
      ok: res.ok && (data.status === 'UNUSED' || data.success === true),
      data
    };
  } catch (error) {
    console.error('[ZiniPay verifyTransaction error]:', error);
    return {
      status: 500,
      ok: false,
      error: error.message
    };
  }
}

/**
 * Health check: verify API key connectivity with ZiniPay
 */
async function checkConnection() {
  try {
    const res = await fetch(`${ZINIPAY_BASE_URL}/v1/payment/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'zini-api-key': ZINIPAY_API_KEY
      },
      body: JSON.stringify({ val_id: 'health_check_ping' })
    });
    const data = await res.json().catch(() => ({}));
    return {
      connected: res.status === 200 || res.status === 404,
      status: res.status,
      apiKeyValid: res.status !== 401 && res.status !== 403,
      data
    };
  } catch (error) {
    return {
      connected: false,
      status: 500,
      apiKeyValid: false,
      error: error.message
    };
  }
}

module.exports = {
  ZINIPAY_API_KEY,
  ZINIPAY_BASE_URL,
  createInvoice,
  verifyInvoice,
  verifyTransaction,
  checkConnection
};

