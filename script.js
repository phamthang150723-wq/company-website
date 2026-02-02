
(function(){
  emailjs.init("u0YRt8JQCtGybfAzD");
})();

document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  emailjs.sendForm(
    "service_ohfzxdc",
    "template_rr4amjn",
    this
  ).then(
    function() {
      alert("Cảm ơn bạn! Tin nhắn đã được gửi.");
      e.target.reset();
    },
    function(error) {
      alert("Gửi thất bại, vui lòng thử lại.");
      console.error(error);
    }
  );
});


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
