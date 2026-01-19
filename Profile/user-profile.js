const storedUser = JSON.parse(localStorage.getItem("currentUser"));


let profile = {
    name: storedUser?.name || "",
    email: storedUser?.email || "",
    phone: storedUser?.phone || "",
    avatar: storedUser?.avatar || ""
};


let isEditing = false;

// Elements
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");

const editBtn = document.getElementById("editBtn");
const editActions = document.getElementById("editActions");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");

const avatarDiv = document.getElementById("avatar");
const uploadBtn = document.getElementById("uploadBtn");
const fileInput = document.getElementById("fileInput");

const backHomeBtn = document.getElementById("backHomeBtn");

backHomeBtn.onclick = () => {
    if (isEditing) {
        if (!confirm("Bạn chưa lưu thay đổi. Vẫn muốn rời trang?")) return;
    }
    window.location.href = "../HomePage/index.html";
};

// Init
function render() {
    nameInput.value = profile.name;
    emailInput.value = profile.email;
    phoneInput.value = profile.phone;

    if (profile.avatar) {
        avatarDiv.innerHTML = `<img src="${profile.avatar}" />`;
    }
}
render();

// Edit
editBtn.onclick = () => {
    isEditing = true;
    toggleEdit(true);
};

cancelBtn.onclick = () => {
    toggleEdit(false);
    render();
};

saveBtn.onclick = () => {
    if (!validate()) return;

    profile.name = nameInput.value;
    profile.email = emailInput.value;
    profile.phone = phoneInput.value;

    // 🔥 LƯU NGƯỢC LẠI
    localStorage.setItem("currentUser", JSON.stringify(profile));

    alert("Cập nhật thành công!");
    toggleEdit(false);
};


function toggleEdit(edit) {
    isEditing = edit;
    nameInput.disabled = !edit;
    emailInput.disabled = !edit;
    phoneInput.disabled = !edit;

    editBtn.style.display = edit ? "none" : "inline-block";
    editActions.style.display = edit ? "flex" : "none";
    uploadBtn.style.display = edit ? "block" : "none";
}

// Validate
function validate() {
    let ok = true;

    if (!nameInput.value.trim()) {
        setError("name", "Tên không được để trống");
        ok = false;
    } else setError("name", "");

    if (!emailInput.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        setError("email", "Email không hợp lệ");
        ok = false;
    } else setError("email", "");

    if (!phoneInput.value.match(/^[0-9]{10,11}$/)) {
        setError("phone", "Số điện thoại không hợp lệ");
        ok = false;
    } else setError("phone", "");

    return ok;
}

function setError(field, msg) {
    document.getElementById(`error-${field}`).innerText = msg;
}

// Avatar upload
uploadBtn.onclick = () => fileInput.click();
fileInput.onchange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        profile.avatar = reader.result;
        render();
    };
    reader.readAsDataURL(file);
};
