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

/* ================= FIREBASE ================= */
const firebaseConfig = {
    apiKey: "AIzaSyBr_eqEJhS1te69KakL2Nc83cJamBRpUps",
    authDomain: "mtscompany-4ee95.firebaseapp.com",
    projectId: "mtscompany-4ee95",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

/* ================= ELEMENTS ================= */
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const avatarDiv = document.getElementById("avatar");

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
    profile.avatar = `https://api.dicebear.com/7.x/initials/svg?seed=${profile.name}`;

    await updateDoc(doc(db, "users", uid), profile);

    alert("Cập nhật thành công!");
    toggleEdit(false);
};

/* ================= UI ================= */
function toggleEdit(edit) {
    nameInput.disabled = !edit;
    phoneInput.disabled = !edit;

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
