// Handle register
function handleRegister(event) {
    event.preventDefault();

    const nameUser = document.getElementById("nameUser").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const rePassword = document.getElementById("Re_password").value.trim();
    const errorMessage = document.getElementById("errorMessage");

    // Ẩn lỗi cũ
    errorMessage.style.display = "none";
    if (!nameUser) {
        errorMessage.innerText = "Vui lòng nhập họ và tên!";
        errorMessage.style.display = "block";
        return;
    }
    // Kiểm tra mật khẩu khớp nhau
    if (password !== rePassword) {
        errorMessage.innerText = "Mật khẩu nhập lại không khớp!";
        errorMessage.style.display = "block";
        return;
    }

    // Kiểm tra độ dài mật khẩu
    if (password.length < 6) {
        errorMessage.innerText = "Mật khẩu phải có ít nhất 6 ký tự!";
        errorMessage.style.display = "block";
        return;
    }

    // Kiểm tra email đơn giản
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorMessage.innerText = "Email không hợp lệ!";
        errorMessage.style.display = "block";
        return;
    }

    // Lưu user vào localStorage (demo)
    const user = {
        email: email,
        password: password,
        nameUser: nameUser
    };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Đăng ký thành công! Chuyển sang trang đăng nhập.");

    // Chuyển sang trang đăng nhập
    window.location.href = "../Login/login.html";
}

// Handle chuyển sang đăng nhập
function handleSignup(event) {
    event.preventDefault();
    window.location.href = "../Login/login.html";
}
