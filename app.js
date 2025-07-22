// Variables
const wheel = document.getElementById('wheel');
const spinBtn = document.getElementById('spin-btn');
const namesInput = document.getElementById('names-input');
const addBtn = document.getElementById('add-names');
const themeBtn = document.getElementById('theme-btn');
let segments = [];
let isSpinning = false;

// Cargar nombres
function loadNames() {
    const text = namesInput.value.trim();
    if (!text) {
        alert("Por favor ingresa al menos un nombre");
        return;
    }
    
    segments = text.split('\n').filter(name => name.trim() !== '');
    renderWheel();
}

// Renderizar ruleta
function renderWheel() {
    wheel.innerHTML = '';
    if (segments.length === 0) return;

    const segmentAngle = 360 / segments.length;
    
    segments.forEach((name, i) => {
        const segmentEl = document.createElement('div');
        segmentEl.className = `wheel-segment segment-${i % 8}`;
        segmentEl.style.transform = `rotate(${segmentAngle * i}deg)`;
        
        const text = document.createElement('span');
        text.textContent = name;
        segmentEl.appendChild(text);
        wheel.appendChild(segmentEl);
    });
}

// Girar ruleta
function spinWheel() {
    if (isSpinning || segments.length === 0) return;
    
    isSpinning = true;
    document.getElementById('spin-sound').play();
    
    const rotations = 5 + Math.floor(Math.random() * 5);
    const targetAngle = rotations * 360 + Math.floor(Math.random() * 360);
    
    gsap.to(wheel, {
        rotation: targetAngle,
        duration: 4,
        ease: "back.out(0.2)",
        onComplete: () => {
            isSpinning = false;
            announceWinner(targetAngle % 360);
        }
    });
}

// Anunciar ganador
function announceWinner(finalAngle) {
    const segmentAngle = 360 / segments.length;
    const winnerIndex = Math.floor((360 - (finalAngle % 360)) / segmentAngle) % segments.length;
    const winner = segments[winnerIndex];
    
    document.getElementById('win-sound').play();
    alert(`¡El ganador es: ${winner}!`);
}

// Cambiar tema
function toggleTheme() {
    document.documentElement.setAttribute('data-theme', 
        document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light'
    );
}

// Eventos
addBtn.addEventListener('click', loadNames);
spinBtn.addEventListener('click', spinWheel);
themeBtn.addEventListener('click', toggleTheme);

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    namesInput.value = "Ana\nCarlos\nMaría\nLuis\nSofía\nJavier";
    loadNames();
});
