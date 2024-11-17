// Audio Playback and Controls
const audioElement = new Audio();
let currentAudioId = null;

const playButtons = document.querySelectorAll('.audio');
playButtons.forEach(button => {
    button.addEventListener('click', () => {
        const audioId = button.id;
        playPauseSong(audioId);
    });
});

function playPauseSong(id) {
    let songFile = "";
    switch (id) {
        case '1': songFile = 'Bol Do Na Zara.mp3'; break;
        case '2': songFile = 'Ghungroo.mp3'; break;
        case '3': songFile = 'Main Rang Sharbaton Ka.mp3'; break;
        case '4': songFile = 'Barsaat.mp3'; break;
        case '5': songFile = 'Paniyon Sa.mp3'; break;
    }

    if (currentAudioId === id && !audioElement.paused) {
        audioElement.pause();
        document.getElementById(id).classList.replace('fa-circle-pause', 'fa-circle-play');
        return;
    }

    audioElement.src = songFile;
    audioElement.play();
    currentAudioId = id;
    document.getElementById(id).classList.replace('fa-circle-play', 'fa-circle-pause');
    updateUIForSong(songFile);
}

function updateUIForSong(songFile) {
    document.getElementById('songName').textContent = songFile.split('.')[0];
    document.getElementById('gif').style.opacity = 1;
}

// Handle Seek Bar
const rangeInput = document.getElementById('range');
audioElement.addEventListener('timeupdate', () => {
    const progress = (audioElement.currentTime / audioElement.duration) * 100;
    rangeInput.value = progress;
});

rangeInput.addEventListener('input', () => {
    const seekTime = (rangeInput.value / 100) * audioElement.duration;
    audioElement.currentTime = seekTime;
});

// Music Visualizer (Wave Animation)
const canvas = document.getElementById("visualizer");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let width = canvas.width;
let height = canvas.height;
let waveHeight = 30;
let waveSpeed = 0.05;
let waveFrequency = 0.02;

function drawWave() {
    ctx.clearRect(0, 0, width, height);

    ctx.beginPath();
    ctx.moveTo(0, height / 2);

    for (let i = 0; i < width; i++) {
        let y = Math.sin(i * waveFrequency + waveSpeed) * waveHeight + height / 2;
        ctx.lineTo(i, y);
    }

    ctx.strokeStyle = "#00ff00"; // Green wave color
    ctx.lineWidth = 2;
    ctx.stroke();

    waveSpeed += 0.05;
    requestAnimationFrame(drawWave);
}

drawWave();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    width = canvas.width;
    height = canvas.height;
});
