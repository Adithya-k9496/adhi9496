document.addEventListener("DOMContentLoaded", () => {
    const curtain = document.getElementById("intro-curtain");
    const enterBtn = document.getElementById("enter-site");
    const enterText = document.querySelector(".enter-text");

    const startSite = () => {
        if (curtain) {
            curtain.classList.add("lift-curtain");
            setTimeout(() => {
                curtain.style.display = "none";
            }, 800);
        }
    };

    if (enterBtn) enterBtn.addEventListener("click", startSite);
    if (enterText) enterText.addEventListener("click", startSite);

    const messageForm = document.getElementById("messageForm");

    if (messageForm) {
        messageForm.addEventListener("submit", async function(event) {
            event.preventDefault();

            let nameInput = document.getElementById("messenger_name");
            let emailInput = document.getElementById("messenger_email");
            let messageInput = document.getElementById("new_message");
            let popupMessage = document.querySelector("#popup h3");

            if (!nameInput.value.trim() || !emailInput.value.trim()) {
                alert("Please provide both your name and email.");
                return; 
            }

            let formData = new FormData(messageForm);

            try {
                let response = await fetch(messageForm.action, {
                    method: "POST",
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    popupMessage.textContent = "✅ Thanks for your message!";
                    showPopup(true);
                    messageForm.reset();
                } else {
                    popupMessage.textContent = "❌ Oops! Something went wrong.";
                    showPopup(true);
                }
            } catch (error) {
                popupMessage.textContent = "⚠️ Network error. Please try again.";
                showPopup(true);
                console.error("Form submission error:", error);
            }
        });
    }
});

function showPopup(bool) {
    const popup = document.getElementById("popup");
    if (popup) {
        popup.style.display = bool ? "flex" : "none";
    }
}
