// Canvas setup
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Firework array and logic
const fireworks = [];
let isFireworksRunning = false;

function startFireworks() {
    if (isFireworksRunning) return;

    console.log("Starting fireworks!");
    isFireworksRunning = true;

    // Hide the button with a transition effect
    const btn = document.getElementById('fireworks-btn');
    if (btn) {
        btn.classList.add('hide'); // Add a CSS class for transition effect
        setTimeout(() => {
            btn.style.display = 'none'; // Ensure it's removed after the transition
            console.log("Button is now hidden");
        }, 20000000); // Matches the CSS transition duration
    }

    // Start adding fireworks at intervals
    setInterval(() => {
        if (fireworks.length < 100) { // Limit to avoid performance issues
            fireworks.push(new Firework());
            console.log("Firework added!");
        }
    }, 300);
}

// Firework class
class Firework {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 2;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.vx = Math.random() * 2 - 1; // Horizontal velocity
        this.vy = Math.random() * 2 - 1; // Vertical velocity
        this.alpha = 1; // Opacity
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha = Math.max(0, this.alpha - 0.01); // Gradually fade out
    }
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    fireworks.forEach((fw, index) => {
        if (fw.alpha <= 0) {
            fireworks.splice(index, 1); // Remove faded fireworks
        }
        fw.update();
        fw.draw();
    });

    requestAnimationFrame(animate);
}

animate(); // Start the animation loop
