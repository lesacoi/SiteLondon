function showDescription(id) {
  const descriptionDiv = document.getElementById(id);
  descriptionDiv.style.display = "block";
}
function hideDescription(id) {
  const descriptionDiv = document.getElementById(id);
  descriptionDiv.style.display = "none";
}

const audio = document.getElementById("audioPlayer");
const playPauseBtn = document.getElementById("playPauseBtn");

playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = "⏸️";
  } else {
    audio.pause();
    playPauseBtn.textContent = "▶️";
  }
});

// Remettre le bouton en "play" quand l'audio est fini
audio.addEventListener("ended", () => {
  playPauseBtn.textContent = "▶️";
});
