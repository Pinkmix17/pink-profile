
/* ==================================================
   MUSIC PLAYER - Pink's Profile
   ================================================== */

// Find all music play buttons
const playButtons = document.querySelectorAll(".play-btn");

// Track the currently playing song
let currentAudio = null;
let currentButton = null;

// Add a click event to each play button
playButtons.forEach((button) => {
    button.addEventListener("click", async () => {

        // Find the song's audio file
        const songPlayer = button.closest(".song-player");
        const audioPath = songPlayer.dataset.audio;

        // Check if an audio file is assigned
        if (!audioPath) {
            console.log("No audio file assigned to this song.");
            return;
        }

        // If the same song is clicked, pause or resume it
        if (currentAudio && currentButton === button) {

            if (currentAudio.paused) {
                try {
                    await currentAudio.play();
                    button.textContent = "⏸";
                } catch (error) {
                    console.error("Could not play audio:", error);
                }
            } else {
                currentAudio.pause();
                button.textContent = "▶";
            }

            return;
        }

        // Stop any previously playing song
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            currentButton.textContent = "▶";
        }

        // Create audio for the new song
        const audio = new Audio(audioPath);

        currentAudio = audio;
        currentButton = button;

        // Reset the button when the song ends
        audio.addEventListener("ended", () => {
            button.textContent = "▶";

            if (currentAudio === audio) {
                currentAudio = null;
                currentButton = null;
            }
        });

        // Handle errors loading the audio
        audio.addEventListener("error", () => {
            console.error("Could not load audio:", audioPath);

            if (currentAudio === audio) {
                button.textContent = "▶";
                currentAudio = null;
                currentButton = null;
            }
        });

        // Play the selected song
        try {
            await audio.play();

            if (currentAudio === audio) {
                button.textContent = "⏸";
            }
        } catch (error) {
            console.error("Could not play audio:", error);

            if (currentAudio === audio) {
                button.textContent = "▶";
                currentAudio = null;
                currentButton = null;
            }
        }
    });
});

