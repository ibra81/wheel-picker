// app.js
const wheel = document.getElementById('wheel');
const spinBtn = document.getElementById('spin-btn');
const namesInput = document.getElementById('names-input');
const addBtn = document.getElementById('add-names');
let segments = [];
let isSpinning = false;

function loadNames() {
    const text = namesInput.value.trim();
    if (!text) {
        alert("Por favor ingresa al menos un nombre");
        return;
    }
    
    segments = text.split('\n').filter(name => name.trim() !== '');
    renderWheel();
}

function renderWheel() {
    wheel.innerHTML = '';
    if (segments.length === 0) return;

    const segmentAngle = 360 / segments.length;
    
    segments.forEach((name, i) => {
        const segmentEl = document.createElement('div');
        segmentEl.className = `segment segment-${i % 10}`;
        segmentEl.style.transform = `rotate(${segmentAngle * i}deg)`;
        
        const textEl = document.createElement('div');
        textEl.className = 'segment-text';
        textEl.textContent = name;
        segmentEl.appendChild(textEl);
        
        wheel.appendChild(segmentEl);
    });
}

function spinWheel() {
    if (isSpinning || segments.length === 0) return;
    
    isSpinning = true;
    
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

function announceWinner(finalAngle) {
    const segmentAngle = 360 / segments.length;
    const winnerIndex = Math.floor((360 - (finalAngle % 360)) / segmentAngle) % segments.length;
    const winner = segments[winnerIndex];
    
    alert(`¡El ganador es: ${winner}!`);
}

addBtn.addEventListener('click', loadNames);
spinBtn.addEventListener('click', spinWheel);

// Inicialización con ejemplos
namesInput.value = "Ana\nCarlos\nMaría\nLuis\nSofía\nPedro\nLaura\nDiego\nElena\nJavier";
loadNames();
