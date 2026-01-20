import { auth, db } from "../Login/firebase.js";
import {
  onAuthStateChanged,
  signOut,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "../Login/login.html";
    return;
  }

  const snap = await getDoc(doc(db, "users", user.uid));
  if (snap.exists()) {
    const data = snap.data();
    document.getElementById("user-name").textContent = data.displayName;
    document.getElementById("userEmail").textContent = data.email;
  }
});



// ================= USER DROPDOWN =================
const userIcon = document.querySelector(".user-icon");
const userDropdown = document.getElementById("userDropdown");

if (userIcon && userDropdown) {
  userIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    userDropdown.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (!userDropdown.contains(e.target)) {
      userDropdown.classList.remove("active");
    }
  });
}

// ================= ĐĂNG XUẤT =================
document.querySelectorAll(".dropdown-menu a, .dropdown-menu button")
  .forEach(item => {
    item.addEventListener("click", async function (e) {
      const text = this.textContent.trim();

      if (text === "Đăng xuất") {
        e.preventDefault();
        if (confirm("Bạn có chắc chắn muốn đăng xuất?")) {
          await signOut(auth);
          localStorage.clear();
          window.location.href = "../Login/login.html";
        }
      }

      if (text === "Thông tin cá nhân") {
        e.preventDefault();
        window.location.href = "../Profile/user-profile.html";
      }
    });
  });

// ================= CHANGE PASSWORD =================
const changePasswordLink = document.querySelector('.dropdown-menu a[href="#"]');
const modal = document.getElementById("changePasswordModal");

const oldPasswordInput = document.getElementById("oldPassword");
const newPasswordInput = document.getElementById("newPassword");
const confirmPasswordInput = document.getElementById("confirmPassword");

const savePasswordBtn = document.getElementById("savePassword");
const cancelBtn = document.getElementById("cancelChange");

function showModal() {
  modal.classList.add("active");
}

function hideModal() {
  modal.classList.remove("active");
  clearForm();
}

function clearForm() {
  oldPasswordInput.value = "";
  newPasswordInput.value = "";
  confirmPasswordInput.value = "";
  document.querySelectorAll(".error").forEach(e => e.textContent = "");
}

// Mở modal
changePasswordLink?.addEventListener("click", (e) => {
  e.preventDefault();
  showModal();
});

// Huỷ
cancelBtn?.addEventListener("click", hideModal);

// Lưu mật khẩu mới
savePasswordBtn?.addEventListener("click", async () => {
  const oldPass = oldPasswordInput.value.trim();
  const newPass = newPasswordInput.value.trim();
  const confirmPass = confirmPasswordInput.value.trim();

  let ok = true;

  if (newPass.length < 6) {
    document.getElementById("error-new").textContent = "Mật khẩu tối thiểu 6 ký tự";
    ok = false;
  }

  if (newPass !== confirmPass) {
    document.getElementById("error-confirm").textContent = "Mật khẩu không khớp";
    ok = false;
  }

  if (!ok) return;

  try {
    const user = auth.currentUser;

    const credential = EmailAuthProvider.credential(
      user.email,
      oldPass
    );

    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPass);

    alert("✅ Đổi mật khẩu thành công!");
    hideModal();
  } catch (err) {
    document.getElementById("error-old").textContent = "Mật khẩu cũ không đúng";
  }
});

// ================= MENU MOBILE =================
function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("active");
}

function closeMenu() {
  document.getElementById("navMenu").classList.remove("active");
}

window.toggleMenu = toggleMenu;
window.closeMenu = closeMenu;

// ================= CONTACT FORM =================
function handleSubmit(event) {
  event.preventDefault();
  alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.");
  event.target.reset();
}

window.handleSubmit = handleSubmit;

// ================= SMOOTH SCROLL =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});
