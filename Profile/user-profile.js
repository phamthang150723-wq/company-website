import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

async function uploadToCloudinary(file) {
    const CLOUD_NAME = "drkh7t7ds";
    const UPLOAD_PRESET = "mtscompany";

    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(url, {
        method: "POST",
        body: formData
    });

    if (!res.ok) {
        throw new Error("Upload thất bại");
    }

    const data = await res.json();
    return data.secure_url; // ✅ URL ảnh
}


/* ================= FIREBASE ================= */
const firebaseConfig = {
    apiKey: "AIzaSyBr_eqEJhS1te69KakL2Nc83cJamBRpUps",
    authDomain: "mtscompany-4ee95.firebaseapp.com",
    projectId: "mtscompany-4ee95",
};

import { auth, db } from "../Login/firebase.js";

/* ================= ELEMENTS ================= */
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const avatarDiv = document.getElementById("avatar");
const uploadBtn = document.getElementById("uploadBtn");
const fileInput = document.getElementById("fileInput");


const editBtn = document.getElementById("editBtn");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");
const editActions = document.getElementById("editActions");
const backHomeBtn = document.getElementById("backHomeBtn");

/* ================= STATE ================= */
let uid = null;
let profile = {};

/* ================= AUTH CHECK ================= */
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        alert("Vui lòng đăng nhập");
        window.location.href = "../Login/login.html";
        return;
    }

    uid = user.uid;
    await loadUser(user);
});

/* ================= LOAD USER ================= */
async function loadUser(user) {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
        const avatarURL = `https://api.dicebear.com/7.x/initials/svg?seed=${user.displayName || user.email}`;

        profile = {
            name: user.displayName || "",
            email: user.email,
            phone: "",
            avatar: avatarURL
        };

        await setDoc(ref, profile);
    } else {
        profile = snap.data();
    }

    render();
}

/* ================= RENDER ================= */
function render() {
    nameInput.value = profile.name || "";
    emailInput.value = profile.email || "";
    phoneInput.value = profile.phone || "";

    avatarDiv.innerHTML = `<img src="${profile.avatar}" />`;
}

/* ================= EDIT ================= */
editBtn.onclick = () => toggleEdit(true);

cancelBtn.onclick = () => {
    toggleEdit(false);
    render();
};

saveBtn.onclick = async () => {
    if (!validate()) return;

    profile.name = nameInput.value.trim();
    profile.phone = phoneInput.value.trim();
    

    await updateDoc(doc(db, "users", uid),{
        name: profile.name,
        phone: profile.phone,
        avatar: profile.avatar
    });

    alert("Cập nhật thành công!");
    toggleEdit(false);
};
uploadBtn.onclick = () => fileInput.click();

fileInput.onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate
    if (!file.type.startsWith("image/")) {
        alert("Chỉ được upload ảnh");
        return;
    }

    if (file.size > 2 * 1024 * 1024) {
        alert("Ảnh tối đa 2MB");
        return;
    }

    avatarDiv.innerHTML = "⏳ Đang upload...";

    try {
        const imageURL = await uploadToCloudinary(file);

        profile.avatar = imageURL;
        avatarDiv.innerHTML = `<img src="${imageURL}" />`;

    } catch (err) {
        alert("Upload ảnh thất bại");
        console.error(err);
    }
};

/* ================= UI ================= */
function toggleEdit(edit) {
    nameInput.disabled = !edit;
    phoneInput.disabled = !edit;

    // 🔑 HIỆN / ẨN NÚT CAMERA
    uploadBtn.style.display = edit ? "block" : "none";

    editBtn.style.display = edit ? "none" : "inline-block";
    editActions.style.display = edit ? "flex" : "none";
}


/* ================= VALIDATE ================= */
function validate() {
    let ok = true;

    if (!nameInput.value.trim()) {
        setError("name", "Tên không được để trống");
        ok = false;
    } else setError("name", "");

    if (!phoneInput.value.match(/^[0-9]{10,11}$/)) {
        setError("phone", "Số điện thoại không hợp lệ");
        ok = false;
    } else setError("phone", "");

    return ok;
}

function setError(field, msg) {
    document.getElementById(`error-${field}`).innerText = msg;
}

/* ================= NAV ================= */
backHomeBtn.onclick = () => {
    if (confirm("Rời trang?")) {
        window.location.href = "../HomePage/index.html";
    }
};
