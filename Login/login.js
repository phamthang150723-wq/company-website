import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

async function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const remember = document.getElementById("remember").checked;
  const errorMessage = document.getElementById("errorMessage");

  errorMessage.style.display = "none";

  try {
    await setPersistence(
      auth,
      remember ? browserLocalPersistence : browserSessionPersistence
    );

    const userCred = await signInWithEmailAndPassword(auth, email, password);

    localStorage.setItem("isLogin", "true");
    localStorage.setItem("currentUser", JSON.stringify({
      uid: userCred.user.uid,
      email: userCred.user.email,
      name: userCred.user.displayName
    }));

    window.location.href = "../HomePage/index.html";
  } catch (err) {
    errorMessage.textContent = "Email hoặc mật khẩu không đúng!";
    errorMessage.style.display = "block";
  }
}

async function handleForgotPassword(event) {
  event.preventDefault();

  const email = prompt("Nhập email đã đăng ký:");
  if (!email) return;

  try {
    await sendPasswordResetEmail(auth, email);
    alert("📩 Đã gửi email đặt lại mật khẩu!");
  } catch {
    alert("Email không tồn tại!");
  }
}

function handleRegister(event) {
  event.preventDefault();
  window.location.href = "../Register/register.html";
}

window.handleLogin = handleLogin;
window.handleForgotPassword = handleForgotPassword;
window.handleRegister = handleRegister;
