document.addEventListener("DOMContentLoaded", () => {
    const curtain = document.getElementById("intro-curtain");
    const enterBtn = document.getElementById("enter-site");
    const enterText = document.querySelector(".enter-text");

    const startSite = () => {
        curtain.classList.add("lift-curtain");
        setTimeout(() => {
            curtain.style.display = "none";
        }, 800);
    };

    if (enterBtn) enterBtn.addEventListener("click", startSite);
    if (enterText) enterText.addEventListener("click", startSite);
});

document.getElementById("messageForm").addEventListener("submit", async function(event) {
        event.preventDefault();

    let form = event.target;
    let formData = new FormData(form);
    let popupMessage = document.querySelector("#popup h3");

    try {
        let response = await fetch(form.action, {
            method: "POST",
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            popupMessage.textContent = "✅ Thanks for your message!";
            showPopup(true);
            form.reset();
        } else {
            popupMessage.textContent = "❌ Oops! Something went wrong. Please try again.";
            showPopup(true);
        }
    } catch (error) {
        popupMessage.textContent = "⚠️ Network error. Please try again.";
        showPopup(true);
        console.error("Form submission error:", error);
    }
});

function showPopup(bool) {
    document.getElementById("popup").style.display = bool ? "flex" : "none";
}
