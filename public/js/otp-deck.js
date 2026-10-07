// ==============================================================================
// OTP Verification DECK — Interactive Engine
// ==============================================================================

document.addEventListener("DOMContentLoaded", () => {
  const phoneStepView = document.getElementById("phoneStepView");
  const otpVerifyStepView = document.getElementById("otpVerifyStepView");
  const otpSuccessStepView = document.getElementById("otpSuccessStepView");

  const deckPhoneInput = document.getElementById("deckPhoneInput");
  const deckSendOtpBtn = document.getElementById("deckSendOtpBtn");
  const hiddenOtpInput = document.getElementById("hiddenOtpInput");
  const otpSlotBoxes = document.querySelectorAll(".otp-slot-box");
  const otpCardTitle = document.getElementById("otpCardTitle");
  const otpCardSubtitle = document.getElementById("otpCardSubtitle");
  const deckResendBtn = document.getElementById("deckResendBtn");
  const deckTimer = document.getElementById("deckTimer");
  const successStudentName = document.getElementById("successStudentName");

  let currentOtp = "";
  let timerInterval = null;

  // 1. Send OTP Step
  if (deckSendOtpBtn) {
    deckSendOtpBtn.addEventListener("click", async () => {
      const phone = deckPhoneInput.value.trim();
      if (!/^01[3-9]\d{8}$/.test(phone)) {
        alert("Please enter a valid 11-digit Bangladeshi mobile number (e.g., 01712345678)");
        return;
      }

      deckSendOtpBtn.disabled = true;
      deckSendOtpBtn.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i> Sending Code...`;

      try {
        const res = await fetch("/api/auth/send-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone }),
        });
        const data = await res.json();
      } catch (err) {
        // Fallback simulation mode
      }

      // Transition to OTP verification stage
      phoneStepView.classList.add("hidden");
      otpVerifyStepView.classList.remove("hidden");
      hiddenOtpInput.focus();
      startCountdown();

      // Default pre-fill in dev: 123456
      setTimeout(() => {
        simulateAutoFill("123456");
      }, 600);
    });
  }

  // 2. Interactive OTP Slots Input Handling
  if (hiddenOtpInput) {
    hiddenOtpInput.addEventListener("input", (e) => {
      const val = e.target.value.replace(/\D/g, "").slice(0, 6);
      updateSlotDisplay(val);
      if (val.length === 6) {
        verifyOtp(val);
      }
    });

    hiddenOtpInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && hiddenOtpInput.value.length === 6) {
        verifyOtp(hiddenOtpInput.value);
      }
    });

    // Focus on click
    otpSlotBoxes.forEach((box) => {
      box.addEventListener("click", () => hiddenOtpInput.focus());
    });
  }

  function updateSlotDisplay(val) {
    currentOtp = val;
    otpSlotBoxes.forEach((box, i) => {
      const char = val[i] || "";
      box.querySelector(".slot-text").textContent = char;
      box.classList.toggle("active", char !== "");
      box.classList.toggle("focused", i === val.length);
    });
  }

  function simulateAutoFill(code) {
    hiddenOtpInput.value = code;
    updateSlotDisplay(code);
    verifyOtp(code);
  }

  // 3. Verify OTP Function
  async function verifyOtp(code) {
    otpCardTitle.textContent = "Checking your code";
    otpCardSubtitle.textContent = "One moment — we're confirming it.";

    try {
      const phone = deckPhoneInput.value.trim() || "01712345678";
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp: code, name: "Tanvir Hasan" }),
      });
      const data = await res.json();

      setTimeout(() => {
        otpVerifyStepView.classList.add("hidden");
        otpSuccessStepView.classList.remove("hidden");
        if (successStudentName) {
          successStudentName.textContent = data.user?.name || "Tanvir Hasan";
        }
        initForensicWatermark(phone, data.user?.id || "9482");
      }, 1200);

    } catch (err) {
      setTimeout(() => {
        otpVerifyStepView.classList.add("hidden");
        otpSuccessStepView.classList.remove("hidden");
        initForensicWatermark(deckPhoneInput.value || "01712345678", "9482");
      }, 1200);
    }
  }

  // 4. Timer Handling
  function startCountdown() {
    let timeLeft = 179;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      const mins = String(Math.floor(timeLeft / 60)).padStart(2, "0");
      const secs = String(timeLeft % 60).padStart(2, "0");
      if (deckTimer) deckTimer.textContent = `${mins}:${secs}`;
      timeLeft--;
      if (timeLeft < 0) {
        clearInterval(timerInterval);
        if (deckTimer) deckTimer.textContent = "00:00";
      }
    }, 1000);
  }

  if (deckResendBtn) {
    deckResendBtn.addEventListener("click", () => {
      startCountdown();
      alert("New 6-digit OTP code dispatched to your phone!");
      simulateAutoFill("123456");
    });
  }

  // 5. Watermark Initialization
  function initForensicWatermark(phone = "01712345678", userId = "9482") {
    const canvas = document.getElementById("forensicWatermarkCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    let watermarkX = 100;
    let watermarkY = 100;

    function shiftWatermark() {
      watermarkX = Math.random() * (canvas.width - 250) + 50;
      watermarkY = Math.random() * (canvas.height - 100) + 50;
    }
    setInterval(shiftWatermark, 4000);

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(watermarkX, watermarkY);
      ctx.rotate(-0.25);
      ctx.font = "bold 14px 'JetBrains Mono', monospace";
      ctx.fillStyle = "rgba(167, 139, 250, 0.25)";
      ctx.fillText(`${phone} | ID: ${userId}`, 0, 0);
      ctx.restore();
      requestAnimationFrame(draw);
    }
    draw();
  }

  initForensicWatermark();
});
