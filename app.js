// Variables globales
const wheel = document.getElementById('wheel');
const spinBtn = document.getElementById('spin-btn');
const namesInput = document.getElementById('names-input');
const addBtn = document.getElementById('add-names');
let segments = [];  // Almacenará los nombres
let isSpinning = false;

// Función para cargar nombres desde el textarea
function loadNames() {
    const text = namesInput.value.trim();
    if (!text) {
        alert("¡Ingresa al menos un nombre!");
        return;
    }
    
    // Dividir por saltos de línea y filtrar vacíos
    segments = text.split('\n').filter(name => name.trim() !== '');
    renderWheel();
    alert(`¡${segments.length} nombres cargados!`);
}

// Renderizar ruleta con nombres
function renderWheel() {
    wheel.innerHTML = '';
    if (segments.length === 0) return;

    const segmentAngle = 360 / segments.length;
    
    segments.forEach((name, i) => {
        const segmentEl = document.createElement('div');
        segmentEl.className = 'wheel-segment';
        segmentEl.style.transform = `rotate(${segmentAngle * i}deg)`;
        segmentEl.style.backgroundColor = `hsl(${(i * 360 / segments.length)}, 70%, 60%)`;
        
        const text = document.createElement('span');
        text.textContent = name;
        text.style.transform = `rotate(${segmentAngle / 2}deg) translateX(100px) rotate(90deg)`; // Texto vertical
        
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

// Event listeners
addBtn.addEventListener('click', loadNames);
spinBtn.addEventListener('click', spinWheel);

// Inicialización (opcional: carga nombres por defecto)
document.addEventListener('DOMContentLoaded', () => {
    namesInput.value = "Ejemplo 1\nEjemplo 2\nEjemplo 3"; // Nombres de prueba
    loadNames();
});
