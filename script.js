const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const fireworks = [];
function startFireworks() {
    setInterval(() => {
        fireworks.push(new Firework());
    }, 300);
}

class Firework {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 2;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.vx = Math.random() * 2 - 1;
        this.vy = Math.random() * 2 - 1;
        this.alpha = 1;
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
        this.alpha -= 0.01;
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireworks.forEach((fw, index) => {
        if (fw.alpha <= 0) fireworks.splice(index, 1);
        fw.update();
        fw.draw();
    });
    requestAnimationFrame(animate);
}

animate();
