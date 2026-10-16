# 🚀 Dipu Academy — সম্পূর্ণ VPS ডেপ্লয়মেন্ট গাইড (Turnkey Production Guide)

এই গাইডের সাহায্যে যেকোনো উবুন্টু VPS সার্ভারে (DigitalOcean, Hetzner, Vultr, Linode, AWS, বা যেকোনো প্রোভাইডার) **Dipu Academy** খুব সহজে লাইভ করতে পারবেন।

---

## 📋 প্রাথমিক প্রস্তুতি (Prerequisites)

1. **একটি VPS সার্ভার:** 
   - OS: **Ubuntu 22.04 LTS** বা **24.04 LTS** (নূন্যতম 1GB বা 2GB RAM সুপারিশকৃত)।
2. **একটি ডোমেইন (যেমন: `dipuacademy.com`):**
   - আপনার ডোমেইন কন্ট্রোল প্যানেলে (Namecheap/Cloudflare/GoDaddy) গিয়ে DNS রেকর্ড সেট করুন:
     - **A Record:** `@` ➔ `আপনার_VPS_এর_IP`
     - **A Record:** `www` ➔ `আপনার_VPS_এর_IP`

---

## 🛠️ ধাপ ১: VPS সার্ভারে প্রবেশ করুন (SSH Login)

আপনার কম্পিউটার থেকে টার্মিনাল বা PowerShell ওপেন করে লিখুন:

```bash
ssh root@আপনার_VPS_এর_IP
```
*(পাসওয়ার্ড চাইলে আপনার VPS এর রুট পাসওয়ার্ড দিন)*

---

## 🛠️ ধাপ ২: গিটহাব থেকে প্রজেক্ট ক্লোন করুন

সার্ভারে প্রবেশ করে সরাসরি গিটহাব থেকে কোড নামিয়ে ফোল্ডারে প্রবেশ করুন:

```bash
cd /var/www || cd ~
git clone https://github.com/ratim2288-max/dipuacademy.git
cd dipuacademy
```

---

## 🛠️ ধাপ ৩: প্রোডাকশন `.env` ফাইল তৈরি করুন

প্রজেক্টের ভেতর `.env` ফাইল তৈরি করে আপনার আসল ক্রেডেনশিয়াল দিন:

```bash
nano .env
```

নিচের কনফিগারেশনটি পেস্ট করুন (আপনার আসল তথ্য দিয়ে আপডেট করুন):

```ini
PORT=5000
NODE_ENV=production
APP_URL=https://dipuacademy.com

# সিকিউরিটি কী (যেকোনো জটিল স্ট্রিং)
JWT_SECRET=super_secret_production_jwt_key_dipu_2026
SESSION_SECRET=dipu_edu_session_concurrency_secret_key

# MongoDB Atlas লাইভ ডাটাবেজ
MONGODB_URI=mongodb+srv://ratim01615_db_user:BVHtUStuBXZG9P9J@cluster0.ljh7ywj.mongodb.net/dipu_edu?retryWrites=true&w=majority&appName=Cluster0

# BulkSMSBD ওটিপি সার্ভিস (কাল এপিআই কি পেলে বসাবেন)
SMS_GATEWAY_URL=http://bulksmsbd.net/api/smsapi
SMS_API_KEY=আপনার_BulkSMSBD_API_KEY
SMS_SENDER_ID=আপনার_SENDER_ID

# Google Gemini AI (ঐচ্ছিক)
GEMINI_API_KEY=আপনার_GEMINI_KEY

# বিকাশ মার্চেন্ট গেটওয়ে (লাইভ করতে চাইলে)
BKASH_APP_KEY=your_live_bkash_key
BKASH_APP_SECRET=your_live_bkash_secret
BKASH_USERNAME=your_live_bkash_username
BKASH_PASSWORD=your_live_bkash_password
BKASH_BASE_URL=https://tokenized.pay.bka.sh/v1.2.0-beta
```

*(সংরক্ষণ করে বের হতে `Ctrl + O`, তারপর `Enter`, তারপর `Ctrl + X` চাপুন)*

---

## 🛠️ ধাপ ৪: ১-ক্লিক অটোমেটেড সেটআপ স্ক্রিপ্ট রান করুন

সব প্যাকেজ (Node.js 20, Nginx, PM2, Certbot, Firewall) নিজে নিজে ইনস্টল করে অ্যাপ চালু করতে স্ক্রিপ্টটি চালান:

```bash
chmod +x deploy/setup-vps.sh deploy/update.sh
bash deploy/setup-vps.sh
```

> **এটি স্বয়ংক্রিয়ভাবে করবে:**
> 1. উবুন্টু প্যাকেজ আপডেট করবে।
> 2. Node.js 20 LTS এবং গ্লোবাল PM2 ইনস্টল করবে।
> 3. Nginx ওয়েব সার্ভার ও UFW ফায়ারওয়াল কনফিগার করবে।
> 4. `npm install` এবং `npm run build:ui` রান করবে।
> 5. PM2 ক্লাস্টার মোডে অ্যাপটি ব্যাকগ্রাউন্ডে চালু রাখবে এবং VPS রিবুট হলেও স্বয়ংক্রিয়ভাবে রিস্টার্ট হওয়ার ব্যবস্থা করবে।

---

## 🛠️ ধাপ ৫: ডোমেইনের সাথে Nginx ও ফ্রি SSL (HTTPS) যুক্ত করুন

### ১. Nginx কনফিগারেশন ফাইল কপি করুন:
```bash
sudo cp deploy/nginx/dipuacademy.conf /etc/nginx/sites-available/dipuacademy.conf
```

### ২. আপনার ডোমেইন বসান:
```bash
sudo nano /etc/nginx/sites-available/dipuacademy.conf
```
ফাইলের ভেতর `server_name yourdomain.com www.yourdomain.com;` এর জায়গায় আপনার আসল ডোমেইন দিন:
```nginx
server_name dipuacademy.com www.dipuacademy.com;
```
*(সংরক্ষণ করুন `Ctrl + O`, `Enter`, `Ctrl + X`)*

### ৩. Nginx সাইট সক্রিয় ও টেস্ট করুন:
```bash
sudo ln -s /etc/nginx/sites-available/dipuacademy.conf /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

### ৪. ফ্রি Let's Encrypt SSL সার্টিফিকেট সক্রিয় করুন (১ কমান্ডে):
```bash
sudo certbot --nginx -d dipuacademy.com -d www.dipuacademy.com
```
*(আপনার ইমেইল দিন এবং শর্তে রাজি হতে `Y` চাপুন। Certbot নিজে নিজেই সম্পূর্ণ HTTPS ও অটো-রিনিউয়াল চালু করে দেবে!)*

এখন আপনার ওয়েবসাইট সম্পূর্ণ **https://dipuacademy.com** এ লাইভ হয়ে যাবে! 🎉

---

## 🛠️ ধাপ ৬: পেমেন্ট গেটওয়ে (bKash/Nagad) ওয়েবহুক কানেক্ট

আপনার বিকাশ/নগদ মার্চেন্ট পোর্টালে এই কলব্যাক URL দিন:
- **bKash Webhook Callback:** `https://dipuacademy.com/api/payment/bkash/callback`
- **Merchant Webhook:** `https://dipuacademy.com/api/payment/webhook`

---

## 🔄 ভবিষ্যতে ওয়েবসাইট আপডেট করার নিয়ম (1-Click Update)

পরবর্তীতে আপনি যখনই আপনার কম্পিউটার থেকে গিটহাবে নতুন কোড পুশ করবেন, সার্ভারে শুধু ১টি কমান্ড দিলেই সম্পূর্ণ ওয়েবসাইট অটো-আপডেট হয়ে যাবে:

```bash
cd /var/www/dipuacademy || cd ~/dipuacademy
bash deploy/update.sh
```
*(এটি অটোমেটিকভাবে `git pull` করবে, নতুন বান্ডেল তৈরি করবে এবং জিরো-ডাউনটাইমে রিলোড করবে!)*

---

## 📊 প্রয়োজনীয় কমান্ড (Helpful Commands)

| কাজ | কমান্ড |
| :--- | :--- |
| অ্যাপের স্ট্যাটাস দেখা | `pm2 status` |
| লাইভ এরর ও লগ দেখা | `pm2 logs` |
| অ্যাপ রিস্টার্ট করা | `pm2 restart dipu-edu-api` |
| Nginx রিস্টার্ট করা | `sudo systemctl restart nginx` |
| সার্ভারের মেমরি ও CPU মনিটর | `pm2 monit` |
