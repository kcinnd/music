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

                          const noteImages = [
        "https://i.imgur.com/CJ09TQq.png",
        "https://i.imgur.com/b5fsfMv.png",
        "https://i.imgur.com/iAKvZfs.png",
        "https://i.imgur.com/qBMF0fz.png",
        "https://i.imgur.com/OGFu1Le.png",
        "https://i.imgur.com/iEUHvIc.png",
        "https://i.imgur.com/14w5V4V.png",
        "https://i.imgur.com/U0aP5pi.png",
        "https://i.imgur.com/ZbZ7sqd.png",
        "https://i.imgur.com/Y6GtKc3.png",
        "https://i.imgur.com/vxsTh2E.png",
        "https://i.imgur.com/nttMAYw.png",
        "https://i.imgur.com/lkUVei7.png",
        "https://i.imgur.com/MENQtiW.png",
        "https://i.imgur.com/GXPMynI.png",
        "https://i.imgur.com/Mlj0CoI.png",
        "https://i.imgur.com/NmYfUe8.png",
        "https://i.imgur.com/Mz5cEJR.png",
        "https://i.imgur.com/IVHM0uZ.png"
    ].map(src => {
        const img = new Image();
        img.src = src;
        return img;
    });

    let notes = generateNotes();

    function generateNotes() {
        const notes = [];
        for (let i = 0; i < noteImages.length; i++) {
            let note = {
                img: noteImages[i],
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                revealed: false
            };
            notes.push(note);
        }
        return notes;
    }

    function drawLight(x, y, color) {
        const gradient = ctx.createRadialGradient(x, y, 1, x, y, 50);
        gradient.addColorStop(0, color[0]);
        gradient.addColorStop(1, color[1]);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, 50, 0, 2 * Math.PI);
        ctx.fill();
    }

    function drawNoteImage(note, x, y) {
        if (!note.img.complete) {
            note.img.onload = function() {
                ctx.drawImage(note.img, x - note.img.width / 2, y - note.img.height / 2);
            }
        } else {
            ctx.drawImage(note.img, x - note.img.width / 2, y - note.img.height / 2);
        }
    }

    canvas.addEventListener('click', function(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const colorIndex = Math.floor(Math.random() * lightBeamColors.length);
        const color = lightBeamColors[colorIndex];
        drawLight(x, y, color);

        notes.forEach(note => {
            if (!note.revealed && Math.hypot(x - note.x, y - note.y) < 25) {
                drawNoteImage(note, note.x, note.y);
                note.revealed = true;
            }
        });
    });
});
