
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'on' : 'off');
}

// Activar dark mode si estaba guardado en localStorage
if (localStorage.getItem('darkMode') === 'on') {
    document.body.classList.add('dark-mode');
}
const canvas = document.getElementById('fireworks-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createFirework(x, y) {
    for (let i = 0; i < 100; i++) {
        particles.push({
            x, y,
            angle: Math.random() * 2 * Math.PI,
            speed: Math.random() * 4 + 2,
            radius: Math.random() * 2 + 1,
            life: 100,
            color: `hsl(${Math.floor(Math.random() * 360)}, 100%, 60%)`
        });
    }
}

function updateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed + 0.5;
        p.life -= 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.fill();
    });
    particles = particles.filter(p => p.life > 0);

    if (particles.length > 0) {
        requestAnimationFrame(updateParticles);
    } else {
        animationRunning = false;
    }
}

let animationRunning = false;

function startFireworks() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.5;
    createFirework(x, y);
    if (!animationRunning) {
        animationRunning = true;
        updateParticles();
    }
}

// Ajuste de tamaño en redimensionar
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});