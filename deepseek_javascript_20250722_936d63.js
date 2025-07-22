// Configuración inicial
const wheel = document.getElementById('wheel');
const spinBtn = document.getElementById('spin-btn');
const namesInput = document.getElementById('names-input');
const themeToggle = document.getElementById('theme-toggle');
let segments = [];
let isSpinning = false;

// Inicialización
function initWheel() {
    // Ejemplo con 8 segmentos (personalizable)
    segments = ['Premio 1', 'Premio 2', 'Premio 3', 'Premio 4', 'Premio 5', 'Premio 6', 'Premio 7', 'Premio 8'];
    renderWheel();
}

// Renderizado dinámico
function renderWheel() {
    wheel.innerHTML = '';
    const segmentAngle = 360 / segments.length;
    
    segments.forEach((segment, index) => {
        const segmentEl = document.createElement('div');
        segmentEl.className = 'wheel-segment';
        segmentEl.style.transform = `rotate(${segmentAngle * index}deg)`;
        segmentEl.style.backgroundColor = `hsl(${(index * 360 / segments.length)}, 70%, 60%)`;
        
        const text = document.createElement('span');
        text.textContent = segment;
        text.style.transform = `rotate(${segmentAngle / 2}deg) translateX(100px)`;
        
        segmentEl.appendChild(text);
        wheel.appendChild(segmentEl);
    });
}

// Animación con GSAP
function spinWheel() {
    if (isSpinning) return;
    
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

// Control de tema oscuro/claro
themeToggle.addEventListener('click', () => {
    document.documentElement.setAttribute('data-theme', 
        document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light'
    );
});

// Event listeners
spinBtn.addEventListener('click', spinWheel);
window.addEventListener('DOMContentLoaded', initWheel);