
const playButtons = document.querySelectorAll(".play-btn");

let currentAudio = null;
let currentButton = null;

playButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const songPlayer = button.closest(".song-player");
        const audioPath = songPlayer.dataset.audio;

        if (!audioPath) {
            console.log("No audio snippet assigned yet!");
            return;
        }

        if (currentAudio && currentButton === button) {
            if (currentAudio.paused) {
                currentAudio.play();
                button.textContent = "⏸";
            } else {
                currentAudio.pause();
                button.textContent = "▶";
            }
            return;
        }

        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            currentButton.textContent = "▶";
        }

        currentAudio = new Audio(audioPath);
        currentButton = button;

        currentAudio.play().then(() => {
            button.textContent = "⏸";
        }).catch((error) => {
            console.error("Could not play audio:", error);
        });

        currentAudio.addEventListener("ended", () => {
            button.textContent = "▶";
            currentAudio = null;
            currentButton = null;
        });
    });
});
