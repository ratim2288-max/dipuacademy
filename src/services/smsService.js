// ==============================================================================
// BulkSMSBD Gateway Service — Real SMS Dispatch for OTP & Alerts
// Docs: https://www.bulksmsbd.com/developer
// Endpoint: http://bulksmsbd.net/api/smsapi
// ==============================================================================

/**
 * Format phone number to standard Bangladeshi 8801XXXXXXXXX format
 * @param {string} phone
 * @returns {string}
 */
function formatPhoneNumber(phone) {
  if (!phone) return '';
  const cleaned = phone.toString().trim().replace(/[^\d+]/g, '');
  if (cleaned.startsWith('+88')) {
    return cleaned.replace('+', '');
  }
  if (cleaned.startsWith('880')) {
    return cleaned;
  }
  if (cleaned.startsWith('01')) {
    return '88' + cleaned;
  }
  return cleaned;
}

/**
 * Send SMS via BulkSMSBD API
 * @param {string} phone - Bangladeshi phone number (01XXXXXXXXX or 8801XXXXXXXXX)
 * @param {string} message - SMS body text
 * @returns {Promise<{success: boolean, messageId?: string, error?: string, simulated?: boolean}>}
 */
async function sendSMS(phone, message) {
  const apiKey = process.env.SMS_API_KEY;
  const gatewayUrl = process.env.SMS_GATEWAY_URL || 'http://bulksmsbd.net/api/smsapi';
  const senderId = process.env.SMS_SENDER_ID || 'DIPUEDU';
  const formattedPhone = formatPhoneNumber(phone);

  // Check if running in mock/demo mode (only when explicit mock key or missing key)
  const isMockKey = !apiKey || 
    apiKey === 'your_bulksmsbd_api_key_here' || 
    apiKey === 'local_dev_mock_key' ||
    apiKey.startsWith('mock_');

  if (isMockKey) {
    console.log(`[SMS Gateway - SIMULATED] To: ${formattedPhone} (${phone}) | Message: "${message}"`);
    return {
      success: true,
      messageId: `sim_${Date.now()}`,
      simulated: true,
      phone: formattedPhone,
    };
  }

  try {
    const postParams = new URLSearchParams({
      api_key: apiKey,
      type: 'text',
      number: formattedPhone,
      senderid: senderId,
      message: message,
    });

    const response = await fetch(gatewayUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: postParams.toString(),
    });

    const rawText = await response.text();
    let data;
    try {
      data = JSON.parse(rawText);
    } catch (e) {
      if (rawText.trim() === '202' || rawText.includes('202')) {
        data = { response_code: 202, success: true };
      } else {
        data = { response_code: rawText.trim(), error_message: rawText.trim() };
      }
    }

    if (data.response_code === 202 || data.response_code === '202' || data.success) {
      const messageId = data.message_id || `msg_${Date.now()}`;
      console.log(`[SMS Gateway] ✅ Dispatched to ${formattedPhone}: Message ID ${messageId}`);
      return { success: true, messageId, data };
    } else {
      const errorMsg = data.error_message || `Gateway returned code: ${data.response_code}`;
      console.error(`[SMS Gateway] ❌ Failed for ${formattedPhone}: ${errorMsg}`);
      return { success: false, error: errorMsg, code: data.response_code };
    }
  } catch (error) {
    console.error(`[SMS Gateway] ❌ Network/Request error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

/**
 * Send bulk SMS to multiple recipients
 * @param {string[]} phones - Array of phone numbers
 * @param {string} message - SMS body text
 * @returns {Promise<{success: boolean, sent: number, failed: number, simulated?: boolean, error?: string}>}
 */
async function sendBulkSMS(phones, message) {
  const apiKey = process.env.SMS_API_KEY;
  const gatewayUrl = process.env.SMS_GATEWAY_URL || 'http://bulksmsbd.net/api/smsapi';
  const senderId = process.env.SMS_SENDER_ID || 'DIPUEDU';

  if (!Array.isArray(phones) || phones.length === 0) {
    return { success: false, sent: 0, failed: 0, error: 'Recipient list is empty' };
  }

  const formattedPhones = phones.map(formatPhoneNumber).filter(Boolean);

  const isMockKey = !apiKey || 
    apiKey === 'your_bulksmsbd_api_key_here' || 
    apiKey === 'local_dev_mock_key' ||
    apiKey.startsWith('mock_');

  if (isMockKey) {
    console.log(`[SMS Gateway - SIMULATED BULK] To ${formattedPhones.length} numbers: "${message.substring(0, 60)}..."`);
    return {
      success: true,
      sent: formattedPhones.length,
      failed: 0,
      simulated: true,
    };
  }

  try {
    const postParams = new URLSearchParams({
      api_key: apiKey,
      type: 'text',
      number: formattedPhones.join(','),
      senderid: senderId,
      message: message,
    });

    const response = await fetch(gatewayUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: postParams.toString(),
    });

    const rawText = await response.text();
    let data;
    try {
      data = JSON.parse(rawText);
    } catch (e) {
      if (rawText.trim() === '202' || rawText.includes('202')) {
        data = { response_code: 202, success: true };
      } else {
        data = { response_code: rawText.trim(), error_message: rawText.trim() };
      }
    }

    if (data.response_code === 202 || data.response_code === '202' || data.success) {
      console.log(`[SMS Gateway] ✅ Bulk SMS dispatched to ${formattedPhones.length} recipients`);
      return { success: true, sent: formattedPhones.length, failed: 0, data };
    } else {
      console.error(`[SMS Gateway] ❌ Bulk SMS error: ${data.error_message || data.response_code}`);
      return {
        success: false,
        sent: 0,
        failed: formattedPhones.length,
        error: data.error_message || 'Bulk SMS dispatch failed',
      };
    }
  } catch (error) {
    console.error(`[SMS Gateway] ❌ Bulk SMS network error: ${error.message}`);
    return { success: false, sent: 0, failed: formattedPhones.length, error: error.message };
  }
}

/**
 * Check BulkSMSBD account balance
 * @returns {Promise<{success: boolean, balance?: number, error?: string, simulated?: boolean}>}
 */
async function getBalance() {
  const apiKey = process.env.SMS_API_KEY;
  const isMockKey = !apiKey || 
    apiKey === 'your_bulksmsbd_api_key_here' || 
    apiKey === 'local_dev_mock_key' ||
    apiKey.startsWith('mock_');

  if (isMockKey) {
    return { success: true, balance: 500, simulated: true };
  }

  try {
    const url = `http://bulksmsbd.net/api/getBalanceApi?api_key=${encodeURIComponent(apiKey)}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.response_code === 202 || data.response_code === '202') {
      return { success: true, balance: Number(data.balance) || 0 };
    }
    return { success: false, error: data.error_message || 'Failed to fetch balance' };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Format OTP SMS message in Bengali
 * @param {string|number} otp
 * @returns {string}
 */
function formatOtpMessage(otp) {
  return `Dipu Academy: আপনার ভেরিফিকেশন কোড হলো ${otp}। এটি ৩ মিনিটের জন্য বৈধ। কাউকে শেয়ার করবেন না।`;
}

module.exports = {
  sendSMS,
  sendBulkSMS,
  getBalance,
  formatPhoneNumber,
  formatOtpMessage,
};
