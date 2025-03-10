document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('heart-neurons');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Heart shape parameters
    const heartNodes = [];
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = Math.min(canvas.width, canvas.height) / 4;

    // Generate heart-shaped neuron positions
    for (let t = 0; t < Math.PI * 2; t += 0.2) {
        const x = centerX + scale * 16 * Math.pow(Math.sin(t), 3);
        const y = centerY - scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        heartNodes.push({ x, y, baseX: x, baseY: y, radius: 5, pulse: Math.random() });
    }

    // Node class
    class Neuron {
        constructor(node) {
            this.x = node.x;
            this.y = node.y;
            this.baseX = node.baseX;
            this.baseY = node.baseY;
            this.radius = node.radius;
            this.pulse = node.pulse;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#71BBB2'; /* Light teal */
            ctx.fill();
            ctx.closePath();
        }

        update() {
            const pulseFactor = Math.sin(Date.now() * 0.002 + this.pulse) * 5;
            this.radius = 5 + pulseFactor;
            this.x = this.baseX + Math.sin(Date.now() * 0.001) * 2;
            this.y = this.baseY + Math.cos(Date.now() * 0.001) * 2;
        }
    }

    const neurons = heartNodes.map(node => new Neuron(node));

    // Connect neurons with lines
    function connectNeurons() {
        for (let i = 0; i < neurons.length; i++) {
            for (let j = i + 1; j < neurons.length; j++) {
                const dx = neurons[i].x - neurons[j].x;
                const dy = neurons[i].y - neurons[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(neurons[i].x, neurons[i].y);
                    ctx.lineTo(neurons[j].x, neurons[j].y);
                    ctx.strokeStyle = `rgba(113, 187, 178, ${1 - distance / 100})`; /* #71BBB2 with opacity */
                    ctx.lineWidth = 1;
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        }
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        neurons.forEach(neuron => {
            neuron.update();
            neuron.draw();
        });
        connectNeurons();
        requestAnimationFrame(animate);
    }

    animate();

    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const newScale = Math.min(canvas.width, canvas.height) / 4;
        neurons.forEach(neuron => {
            neuron.baseX = centerX + (neuron.baseX - centerX) * (newScale / scale);
            neuron.baseY = centerY + (neuron.baseY - centerY) * (newScale / scale);
        });
        scale = newScale;
    });
});