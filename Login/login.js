import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/* ================= LOGIN ================= */
async function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const remember = document.getElementById("remember")?.checked;
  const errorMessage = document.getElementById("errorMessage");

  errorMessage.style.display = "none";

  if (!email || !password) {
    errorMessage.textContent = "Vui lòng nhập đầy đủ email và mật khẩu";
    errorMessage.style.display = "block";
    return;
  }

  try {
    // ✅ Ghi nhớ đăng nhập (Firebase tự xử lý session)
    await setPersistence(
      auth,
      remember ? browserLocalPersistence : browserSessionPersistence
    );

    // ✅ Đăng nhập
    await signInWithEmailAndPassword(auth, email, password);

    // ❌ KHÔNG LƯU USER VÀO localStorage
    // ❌ KHÔNG XỬ LÝ USER INFO Ở ĐÂY

    // 👉 Chuyển trang
    window.location.href = "../HomePage/index.html";

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    errorMessage.textContent = "Email hoặc mật khẩu không đúng!";
    errorMessage.style.display = "block";
  }
}

/* ================= FORGOT PASSWORD ================= */
async function handleForgotPassword(event) {
  event.preventDefault();

  const email = prompt("Nhập email đã đăng ký:");
  if (!email) return;

  try {
    await sendPasswordResetEmail(auth, email);
    alert("📩 Đã gửi email đặt lại mật khẩu!");
  } catch (err) {
    alert("❌ Email không tồn tại hoặc không hợp lệ!");
  }
}

/* ================= REGISTER REDIRECT ================= */
function handleRegister(event) {
  event.preventDefault();
  window.location.href = "../Register/register.html";
}

/* ================= EXPORT ================= */
window.handleLogin = handleLogin;
window.handleForgotPassword = handleForgotPassword;
window.handleRegister = handleRegister;
