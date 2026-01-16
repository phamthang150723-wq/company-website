// Handle login form submission
function handleLogin(event) {
    event.preventDefault();

    const emailInput = document.getElementById('email').value.trim();
    const passwordInput = document.getElementById('password').value.trim();
    const remember = document.getElementById('remember').checked;
    const errorMessage = document.getElementById("errorMessage");

    errorMessage.style.display = "none";

    // 🔎 LẤY USER ĐÃ ĐĂNG KÝ
    const savedUser = JSON.parse(localStorage.getItem("user"));

    // ❌ Chưa có tài khoản
    if (!savedUser) {
        errorMessage.innerText = "Chưa có tài khoản, vui lòng đăng ký!";
        errorMessage.style.display = "block";
        return;
    }

    // ❌ Sai email hoặc mật khẩu
    if (
        emailInput !== savedUser.email ||
        passwordInput !== savedUser.password
    ) {
        errorMessage.innerText = "Email hoặc mật khẩu không đúng!";
        errorMessage.style.display = "block";
        return;
    }

    // ✅ ĐĂNG NHẬP THÀNH CÔNG
    console.log('Đăng nhập với:', { emailInput, remember });

    // ✅ ĐĂNG NHẬP THÀNH CÔNG
    if (remember) {
        localStorage.setItem('isLogin', 'true');
    } else {
        sessionStorage.setItem('isLogin', 'true');
    }

    localStorage.setItem("currentUser", JSON.stringify({
        email: savedUser.email,
        name: savedUser.nameUser
    }));

    alert('Đăng nhập thành công! Đang chuyển hướng...');
    window.location.href = '../HomePage/index.html';

}


// Handle forgot password
function handleForgotPassword(event) {
    event.preventDefault();
    const email = prompt('Nhập email của bạn để khôi phục mật khẩu:');
    if (email) {
        alert('Liên kết khôi phục mật khẩu đã được gửi đến ' + email);
    }
}


// Handle signup (chuyển sang trang đăng ký)
function handleRegister(event) {
    event.preventDefault();
    window.location.href = '../Register/register.html';
}


// Handle social login
function handleSocialLogin(provider) {
    alert('Đăng nhập với ' + provider + ' sẽ được tích hợp sau.');
}


// Submit form khi nhấn Enter ở ô mật khẩu
document.addEventListener('DOMContentLoaded', function () {
    const passwordInput = document.getElementById('password');
    const loginForm = document.getElementById('loginForm');

    if (passwordInput && loginForm) {
        passwordInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                loginForm.dispatchEvent(new Event('submit'));
            }
        });
    }
});

