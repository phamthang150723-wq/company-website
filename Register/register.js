import { auth, db } from "../Login/firebase.js";
import {
  createUserWithEmailAndPassword,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const form = document.getElementById("registerForm");
const errorMessage = document.getElementById("errorMessage");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nameUser = document.getElementById("nameUser").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const rePassword = document.getElementById("Re_password").value.trim();

  errorMessage.style.display = "none";

  if (!nameUser || password !== rePassword || password.length < 6) {
    errorMessage.textContent = "Thông tin không hợp lệ!";
    errorMessage.style.display = "block";
    return;
  }

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(userCred.user, {
      displayName: nameUser
    });

    await setDoc(doc(db, "users", userCred.user.uid), {
      uid: userCred.user.uid,
      email,
      name: nameUser,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${nameUser}`,
      role: "user",
      createdAt: serverTimestamp()
    });

    alert("✅ Đăng ký thành công!");
    window.location.href = "../Login/login.html";

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    errorMessage.textContent = err.code || "Đăng ký thất bại";
    errorMessage.style.display = "block";
  }
});
document.getElementById("loginLink").addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "../Login/login.html";
});


