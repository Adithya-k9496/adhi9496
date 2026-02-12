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

    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const body = document.body;

    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
        if (darkModeToggle) darkModeToggle.textContent = "☀️ Light Mode";
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", () => {
            body.classList.toggle("dark-mode");
            
            if (body.classList.contains("dark-mode")) {
                localStorage.setItem("theme", "dark");
                darkModeToggle.textContent = "☀️ Light Mode";
            } else {
                localStorage.setItem("theme", "light");
                darkModeToggle.textContent = "🌙 Dark Mode";
            }
        });
    }

    const messageForm = document.getElementById("messageForm");

    if (messageForm) {
        messageForm.addEventListener("submit", async function(event) {
            event.preventDefault();

            let nameInput = document.getElementById("messenger_name");
            let emailInput = document.getElementById("messenger_email");
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
