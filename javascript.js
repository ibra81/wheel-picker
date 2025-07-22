// Configuración inicial
const wheel = document.getElementById('wheel');
const spinBtn = document.getElementById('spin-btn');
const namesInput = document.getElementById('names-input');
const themeBtn = document.getElementById('theme-btn');
const addBtn = document.getElementById('add-btn');
const resetBtn = document.getElementById('reset-btn');

let segments = ["Premio 1", "Premio 2", "Premio 3", "Premio 4", "Premio 5"];
let isSpinning = false;

// Inicialización
function initWheel() {
    renderWheel();
}

// Renderizar ruleta
function renderWheel() {
    wheel.innerHTML = '';
    const segmentAngle = 360 / segments.length;
    
    segments.forEach((segment, i) => {
        const segmentEl = document.createElement('div');
        segmentEl.className = 'wheel-segment';
        segmentEl.style.transform = `rotate(${segmentAngle * i}deg)`;
        segmentEl.style.backgroundColor = `hsl(${(i * 360 / segments.length)}, 70%, 60%)`;
        
        const text = document.createElement('span');
        text.textContent = segment;
        text.style.transform = `rotate(${segmentAngle / 2}deg) translateX(120px)`;
        
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

// Event listeners
spinBtn.addEventListener('click', spinWheel);
themeBtn.addEventListener('click', toggleTheme);
addBtn.addEventListener('click', addSegments);
resetBtn.addEventListener('click', resetWheel);

// Iniciar
document.addEventListener('DOMContentLoaded', initWheel);
