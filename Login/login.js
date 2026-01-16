// Handle login form submission
        function handleLogin(event) {
            event.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;
            
            if (email && password) {
                console.log('Đăng nhập với:', { email, password, remember });

                // 🔑 LƯU TRẠNG THÁI ĐĂNG NHẬP
                if (remember) {
                    localStorage.setItem('isLogin', 'true');
                } else {
                    sessionStorage.setItem('isLogin', 'true');
                }

                alert('Đăng nhập thành công! Đang chuyển hướng...');
                window.location.href = '../HomePage/index.html';
            } else {
                const errorMessage = document.getElementById('errorMessage');
                errorMessage.classList.add('show');

                setTimeout(() => {
                    errorMessage.classList.remove('show');
                }, 3000);
            }
        }


        // Handle forgot password
        function handleForgotPassword(event) {
            event.preventDefault();
            const email = prompt('Nhập email của bạn để khôi phục mật khẩu:');
            if (email) {
                alert('Liên kết khôi phục mật khẩu đã được gửi đến ' + email);
            }
        }

        // Handle signup
        function handleRegister(event) {
            event.preventDefault();
            // alert('Chức năng đăng ký sẽ được phát triển. Vui lòng liên hệ admin để tạo tài khoản.');
            // Redirect to signup page (uncomment to use)
            window.location.href = '../Register/register.html';
        }

        // Handle social login
        function handleSocialLogin(provider) {
            alert('Đăng nhập với ' + provider + ' sẽ được tích hợp sau.');
            // Implement OAuth flow here
        }

        // Show password toggle (optional enhancement)
        document.addEventListener('DOMContentLoaded', function() {
            const passwordInput = document.getElementById('password');
            
            // Add show/hide password functionality
            passwordInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    document.getElementById('loginForm').dispatchEvent(new Event('submit'));
                }
            });
        });