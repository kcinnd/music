document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('musicCanvas');
    const ctx = canvas.getContext('2d');

    // Resize the canvas to fill browser window dynamically
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();

    const lightBeamColors = [
        ['rgba(255, 7, 58, 1)', 'rgba(255, 7, 58, 0)'],
        ['rgba(189, 0, 255, 1)', 'rgba(189, 0, 255, 0)'],
        ['rgba(0, 145, 255, 1)', 'rgba(0, 145, 255, 0)'],
        ['rgba(0, 255, 25, 1)', 'rgba(0, 255, 25, 0)'],
        ['rgba(255, 0, 110, 1)', 'rgba(255, 0, 110, 0)'],
        ['rgba(255, 255, 0, 1)', 'rgba(255, 255, 0, 0)'],
        ['rgba(0, 255, 255, 1)', 'rgba(0, 255, 255, 0)'],
        ['rgba(255, 165, 0, 1)', 'rgba(255, 165, 0, 0)'],
        ['rgba(204, 51, 255, 1)', 'rgba(204, 51, 255, 0)'],
        ['rgba(191, 255, 0, 1)', 'rgba(191, 255, 0, 0)'],
        ['rgba(64, 224, 208, 1)', 'rgba(64, 224, 208, 0)'],
        ['rgba(255, 0, 255, 1)', 'rgba(255, 0, 255, 0)'],
        ['rgba(255, 215, 0, 1)', 'rgba(255, 215, 0, 0)'],
        ['rgba(148, 0, 211, 1)', 'rgba(148, 0, 211, 0)'],
        ['rgba(135, 206, 235, 1)', 'rgba(135, 206, 235, 0)'],
        ['rgba(255, 111, 97, 1)', 'rgba(255, 111, 97, 0)'],
        ['rgba(75, 0, 130, 1)', 'rgba(75, 0, 130, 0)'],
        ['rgba(252, 142, 172, 1)', 'rgba(252, 142, 172, 0)'],
        ['rgba(0, 255, 195, 1)', 'rgba(0, 255, 195, 0)']
    ];

    let notes = [];
    const noteRadius = 10; // Size of the music notes
    const noteCount = 19; // Total number of music notes to hide

    function generateNotes() {
        for (let i = 0; i < noteCount; i++) {
            let note = {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                revealed: false
            };
            // Ensure notes are not clustered together
            if (notes.some(n => Math.hypot(note.x - n.x, note.y - n.y) < noteRadius * 3)) {
                i--; // Regenerate this note
            } else {
                notes.push(note);
            }
        }
    }

    generateNotes();

    function drawLight(x, y, color) {
        const gradient = ctx.createRadialGradient(x, y, 1, x, y, 100);
        gradient.addColorStop(0, color[0]);
        gradient.addColorStop(1, color[1]);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, 100, 0, 2 * Math.PI);
        ctx.fill();
    }

    function revealNote(note) {
        // Placeholder for drawing a music note
        // This can be replaced with an image or more complex drawing
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(note.x, note.y, noteRadius, 0, 2 * Math.PI);
        ctx.fill();
        note.revealed = true;
    }

    canvas.addEventListener('click', function(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const color = lightBeamColors[Math.floor(Math.random() * lightBeamColors.length)];
        drawLight(x, y, color);

        notes.forEach(note => {
            if (!note.revealed && Math.hypot(x - note.x, y - note.y) < noteRadius * 2) {
                revealNote(note);
            }
        });
    });
});
