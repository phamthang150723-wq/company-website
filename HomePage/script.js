document.addEventListener("DOMContentLoaded", () => {

    const isLogin =
        localStorage.getItem('isLogin') === 'true' ||
        sessionStorage.getItem('isLogin') === 'true';

    if (!isLogin) {
        window.location.href = '../Login/login.html';
        return;
    }

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
        const emailEl = document.getElementById("userEmail");
        const nameEl = document.getElementById("user-name");

        if (emailEl) emailEl.textContent = currentUser.email;
        if (nameEl) nameEl.textContent = currentUser.name;
    }

});

// Toggle mobile menu
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}

// Close menu when clicking a link
function closeMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.remove('active');
}

// Handle form submission
function handleSubmit(event) {
    event.preventDefault();
    alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.');
    event.target.reset();
}

// Smooth scroll for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
const userIcon = document.querySelector('.user-icon');
const userDropdown = document.getElementById('userDropdown');

if (userIcon && userDropdown) {
    userIcon.addEventListener('click', function () {
        userDropdown.classList.toggle('active');
    });

    document.addEventListener('click', function (event) {
        if (!userIcon.contains(event.target) && !userDropdown.contains(event.target)) {
            userDropdown.classList.remove('active');
        }
    });
}


// Handle user menu actions
document.querySelectorAll('.dropdown-menu a, .dropdown-menu button').forEach(item => {
    item.addEventListener('click', function (e) {
        const text = this.textContent.trim();

        if (text === 'Đăng xuất') {
            e.preventDefault();
            if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {

                localStorage.removeItem("isLogin");
                sessionStorage.removeItem("isLogin");
                localStorage.removeItem("currentUser");

                window.location.href = '../Login/login.html';
            }
        }
        else if (text === 'Thông tin cá nhân') {
            e.preventDefault();
            alert('Trang thông tin cá nhân đang được phát triển.');
            userDropdown.classList.remove('active');
        } else if (text === 'Cài đặt') {
            e.preventDefault();
            alert('Trang cài đặt đang được phát triển.');
            userDropdown.classList.remove('active');
        }
    });
});