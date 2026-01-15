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