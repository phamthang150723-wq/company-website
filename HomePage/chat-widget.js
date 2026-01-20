const chatToggle = document.getElementById("chatToggle");
const chatWindow = document.getElementById("chatWindow");
const chatClose = document.getElementById("chatClose");
const chatInput = document.getElementById("chatInput");
const chatSend = document.getElementById("chatSend");
const chatMessages = document.getElementById("chatMessages");

let isSending = false;
let hasGreeted = false; // 🔥 CHÌA KHOÁ

// Reset input tránh autofill
document.addEventListener("DOMContentLoaded", () => {
    chatInput.value = "";
});

// Toggle chat
chatToggle.addEventListener("click", () => {
    const isOpening = !chatWindow.classList.contains("active");
    chatWindow.classList.toggle("active");

    if (isOpening && !hasGreeted) {
        hasGreeted = true;

        // 🔥 ĐỢI BROWSER RENDER XONG
        requestAnimationFrame(() => {
            setTimeout(() => {
                sendMessage("Xin chào! Tôi có thể giúp gì cho bạn?", "bot");
            }, 120);
        });
    }

    setTimeout(() => {
        chatInput.value = "";
        chatInput.focus();
    }, 50);
});

chatClose.addEventListener("click", () => {
    chatWindow.classList.remove("active");
});

// Gửi message
function sendMessage(text, sender) {
    const div = document.createElement("div");
    div.className = `message ${sender}`;

    const content = document.createElement("div");
    content.textContent = text;

    const time = document.createElement("div");
    time.className = "message-time";
    time.textContent = new Date().toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit"
    });

    div.appendChild(content);
    div.appendChild(time);

    chatMessages.appendChild(div);

    // 🔥 SCROLL SAU KHI DOM UPDATE
    requestAnimationFrame(() => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    });
}

// Handle send
function handleSend() {
    if (isSending) return;

    const text = chatInput.value.trim();
    if (!text) return;

    isSending = true;
    sendMessage(text, "user");
    chatInput.value = "";

    setTimeout(() => {
        sendMessage("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm.", "bot");
        isSending = false;
    }, 900);
}

chatSend.addEventListener("click", handleSend);

chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        handleSend();
    }
});

