/* ==========================================
   PINK'S PROFILE - JAVASCRIPT ♡
   ========================================== */
// ==========================================
// CLICK SPARKLES ♡
// ==========================================

// Different sparkles that can appear
const sparkleShapes = ["♡", "✧", "✦", "⋆", "♥"];

// Colors that match Pink's Profile
const sparkleColors = [
    "#E8A0AE", // Pink
    "#F5D9A8", // Soft gold
    "#88D8C0", // Aqua
    "#D9B8E8", // Lavender
    "#FFFFFF"  // White
];

// Create sparkles whenever someone clicks
document.addEventListener("click", (event) => {

    // Don't animate if reduced motion is preferred
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    // Create 7 little sparkles
    for (let i = 0; i < 7; i++) {

        const sparkle = document.createElement("span");

        // Choose a random shape and color
        sparkle.textContent = sparkleShapes[
            Math.floor(Math.random() * sparkleShapes.length)
        ];

        sparkle.style.color = sparkleColors[
            Math.floor(Math.random() * sparkleColors.length)
        ];

        // Position the sparkle where the click happened
        sparkle.style.position = "fixed";
        sparkle.style.left = event.clientX + "px";
        sparkle.style.top = event.clientY + "px";

        // Keep sparkles above everything
        sparkle.style.pointerEvents = "none";
        sparkle.style.zIndex = "9999";

        // Random sizes
        sparkle.style.fontSize = (12 + Math.random() * 12) + "px";

        // Animate outward from the click
        const x = (Math.random() - 0.5) * 100;
        const y = (Math.random() - 0.5) * 100;

        document.body.appendChild(sparkle);

        sparkle.animate([
            {
                transform: "translate(-50%, -50%) scale(1)",
                opacity: 1
            },
            {
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 700,
            easing: "ease-out"
        }).onfinish = () => {
            sparkle.remove();
        };
    }
});
/* ==========================================
   SEND LOVE BUTTON ♡
   ========================================== */
/* ==========================================
   SEND LOVE BUTTON - LIFETIME COUNTER ♡
   ========================================== */

// Supabase project information
const supabaseURL = "https://jtamwdfsltidmjvqqegr.supabase.co";

// Paste your PUBLIC publishable key here
const supabaseKey = "sb_publishable_KlJXCl2nRruHn-OEOqpacQ_lEAtwwVj";

// Footer elements
const loveButton = document.getElementById("send-love");
const loveMessage = document.getElementById("love-message");
const loveTotal = document.getElementById("love-total");

// Display the lifetime total
function showLoveTotal(total) {
    loveTotal.textContent =
        `${Number(total).toLocaleString()} little hearts sent! ♡`;
}

// Load the lifetime total when the page opens
async function loadLoveTotal() {
    try {
        const response = await fetch(
            `${supabaseURL}/rest/v1/love_counter?id=eq.1&select=total_loves`,
            {
                headers: {
                    "apikey": supabaseKey
                }
            }
        );

        if (!response.ok) {
            throw new Error("Could not load hearts");
        }

        const data = await response.json();

        if (data.length > 0) {
            showLoveTotal(data[0].total_loves);
        }

    } catch (error) {
        console.error("Love counter error:", error);
        loveTotal.textContent = "♡";
    }
}

// Send a heart to Supabase
async function sendLove() {
    loveButton.disabled = true;
    loveMessage.textContent = "sending love... ♡";

    try {
        const response = await fetch(
            `${supabaseURL}/functions/v1/send-love`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "apikey": supabaseKey
                },
                body: JSON.stringify({})
            }
        );

        if (!response.ok) {
            throw new Error("Could not send love");
        }

        const data = await response.json();

        // Update the shared lifetime total
        showLoveTotal(data.total_loves);

        if (data.accepted) {
            loveButton.textContent = "♥ send more love";
            loveMessage.textContent = "love sent! ♡";
        } else {
            loveMessage.textContent =
                "you already sent love! try again in 30 seconds ♡";
        }

    } catch (error) {
        console.error("Send love error:", error);
        loveMessage.textContent =
            "oops! couldn't send love right now ♡";
    } finally {
        loveButton.disabled = false;
    }
}

// Start the counter and connect the button
if (loveButton && loveMessage && loveTotal) {
    loadLoveTotal();
    loveButton.addEventListener("click", sendLove);
}
