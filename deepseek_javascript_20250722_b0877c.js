// Variables globales
let names = [];
let isSpinning = false;
let spinSound = document.getElementById("spin-sound");
let winSound = document.getElementById("win-sound");

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
    loadNames();
    setupEventListeners();
    drawWheel();
    checkCookieConsent();
});

// Cargar nombres guardados
function loadNames() {
    const savedNames = localStorage.getItem("wheelNames");
    if (savedNames) {
        names = JSON.parse(savedNames);
        document.getElementById("names-input").value = names.join("\n");
    }
}

// Configurar event listeners
function setupEventListeners() {
    document.getElementById("add-names").addEventListener("click", addNames);
    document.getElementById("upload-csv").addEventListener("click", triggerCSVUpload);
    document.getElementById("csv-file").addEventListener("change", handleCSVUpload);
    document.getElementById("spin-btn").addEventListener("click", spinWheel);
    document.getElementById("reset-btn").addEventListener("click", resetWheel);
    document.getElementById("accept-cookies").addEventListener("click", acceptCookies);
    document.getElementById("reject-cookies").addEventListener("click", rejectCookies);
}

// Añadir nombres desde el textarea
function addNames() {
    const input = document.getElementById("names-input").value;
    names = input.split("\n").filter(name => name.trim() !== "");
    localStorage.setItem("wheelNames", JSON.stringify(names));
    drawWheel();
}

// Girar la ruleta
function spinWheel() {
    if (names.length === 0 || isSpinning) return;

    isSpinning = true;
    spinSound.play();

    const wheel = document.getElementById("wheel");
    const spinDuration = 3000 + Math.random() * 2000;
    const rotations = 5 + Math.random() * 5;

    wheel.style.transition = `transform ${spinDuration}ms cubic-bezier(0.17, 0.67, 0.21, 0.99)`;
    wheel.style.transform = `rotate(${rotations * 360}deg)`;

    setTimeout(() => {
        isSpinning = false;
        announceWinner();
    }, spinDuration);
}

// Anunciar ganador
function announceWinner() {
    winSound.play();
    const winnerIndex = Math.floor(Math.random() * names.length);
    const winner = names[winnerIndex];
    alert(`¡El ganador es: ${winner}!`);
}

// Consentimiento de cookies
function checkCookieConsent() {
    if (!localStorage.getItem("cookiesAccepted")) {
        document.getElementById("cookie-banner").style.display = "flex";
    }
}

function acceptCookies() {
    localStorage.setItem("cookiesAccepted", "true");
    document.getElementById("cookie-banner").style.display = "none";
    // Cargar AdSense tras aceptar
    (adsbygoogle = window.adsbygoogle || []).push({});
}

function rejectCookies() {
    localStorage.setItem("cookiesAccepted", "false");
    document.getElementById("cookie-banner").style.display = "none";
}