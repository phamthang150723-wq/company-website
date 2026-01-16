const chatToggle = document.getElementById("chatToggle");
const chatWindow = document.getElementById("chatWindow");
const chatClose = document.getElementById("chatClose");
const chatInput = document.getElementById("chatInput");
const chatSend = document.getElementById("chatSend");
const chatMessages = document.getElementById("chatMessages");

// Toggle chat
chatToggle.onclick = () => chatWindow.classList.toggle("active");
chatClose.onclick = () => chatWindow.classList.remove("active");

// Gửi tin nhắn
function sendMessage(text, sender) {
    const div = document.createElement("div");
    div.className = `message ${sender}`;
    div.textContent = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Click gửi
chatSend.onclick = () => {
    if (!chatInput.value.trim()) return;

    sendMessage(chatInput.value, "user");
    chatInput.value = "";

    setTimeout(() => {
        sendMessage("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm.", "bot");
    }, 1000);
};

// Enter để gửi
chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") chatSend.click();
});

// Tin nhắn chào
sendMessage("Xin chào! Tôi có thể giúp gì cho bạn?", "bot");
