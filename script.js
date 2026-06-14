document.addEventListener("DOMContentLoaded", () => {
    const curtain = document.getElementById("intro-curtain");
    const enterBtn = document.getElementById("enter-site");
    const enterText = document.querySelector(".enter-text");
    const curtainContent = document.querySelector(".curtain-content");

    const startSite = () => {
        if (curtain) {
            // Fade out the curtain content first for a smooth transition
            if (curtainContent) {
                curtainContent.style.opacity = "0";
                curtainContent.style.transform = "scale(0.95)";
                curtainContent.style.transition = "all 0.4s ease-out";
            }
            
            // Wait for the fade-out, then lift the curtain
            setTimeout(() => {
                curtain.classList.add("lift-curtain");
                setTimeout(() => {
                    curtain.style.display = "none";
                }, 800);
            }, 300);
        }
    };

    if (enterBtn) enterBtn.addEventListener("click", startSite);
    if (enterText) enterText.addEventListener("click", startSite);

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const body = document.body;

    // Load theme from localStorage
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

    // Contact Form Submission
    const messageForm = document.getElementById("messageForm");

    if (messageForm) {
        messageForm.addEventListener("submit", async function(event) {
            event.preventDefault();

            let nameInput = document.getElementById("messenger_name");
            let emailInput = document.getElementById("messenger_email");
            let popupMessage = document.querySelector("#popup h3");
            let popupIcon = document.querySelector(".popup-content img");

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
                    popupMessage.textContent = "Thank you! Your message has been sent.";
                    if (popupIcon) {
                        popupIcon.src = "html_finalprojimages/checkmark--outline.svg";
                        popupIcon.style.filter = "none";
                    }
                    showPopup(true);
                    messageForm.reset();
                } else {
                    popupMessage.textContent = "Oops! Something went wrong.";
                    if (popupIcon) {
                        // Keep checkmark but we can gray it out or style it
                        popupIcon.src = "html_finalprojimages/checkmark--outline.svg";
                    }
                    showPopup(true);
                }
            } catch (error) {
                popupMessage.textContent = "Network error. Please try again later.";
                showPopup(true);
                console.error("Form submission error:", error);
            }
        });
    }
    // Certificates Show More / Less Toggle
    const certsGrid = document.getElementById("certs-grid");
    const showMoreBtn = document.getElementById("show-more-certs-btn");

    if (showMoreBtn && certsGrid) {
        showMoreBtn.addEventListener("click", () => {
            certsGrid.classList.toggle("expanded");
            if (certsGrid.classList.contains("expanded")) {
                showMoreBtn.textContent = "Show Less";
            } else {
                showMoreBtn.textContent = "Show All Certifications (+22)";
                // Smooth scroll back to certifications header when collapsing
                const certsSection = document.getElementById("certificates");
                if (certsSection) {
                    certsSection.scrollIntoView({ behavior: "smooth" });
                }
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
