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

    const audioClips = [
        "https://audio.jukehost.co.uk/aOz6KfillnraJHw8E38nj0c8T4uJk3uG.mp3",
        "https://audio.jukehost.co.uk/gVJZ29CcDLHA2eu5N2ZRthH68jtWW6Gw.mp3",
        "https://audio.jukehost.co.uk/kuI9Js3hy2kiVgojRv2yiaORL7tYYlAX.mp3",
        "https://audio.jukehost.co.uk/hkfgqlNOAxj1LgWDOBQhRTbzxq0a3xBV.mp3",
        "https://audio.jukehost.co.uk/lXCaYbwjVyRzckOilvVZxdg9MJOwy9xN.mp3",
        "https://audio.jukehost.co.uk/84b4xaUM74UJaRWCbVVeUCF822yTximk.mp3",
        "https://audio.jukehost.co.uk/e0cf53pFpqlBHa3mWIe9EFoZKNKUzjo3.mp3",
        "https://audio.jukehost.co.uk/XTKnG2oLrq1UxCHq5yHa2hp71kkaLHAY.mp3",
        "https://audio.jukehost.co.uk/xk3OfU1NDtUeRUQPlbcGmt8uNG3Hyr0m.mp3",
        "https://audio.jukehost.co.uk/hB9tnsYoYcOTi70O0oi5auIU3ZL6BEJx.mp3",
        "https://audio.jukehost.co.uk/WBe5RCJJP1vMfuaewKp1T39qm8Bm0auc.mp3",
        "https://audio.jukehost.co.uk/Zs2Ef5WCCqJswEUHc18CjbezfCl9gseq.mp3",
        "https://audio.jukehost.co.uk/26mQRqqYvPTbYVxegWXphWfYzPvlitOA.mp3",
        "https://audio.jukehost.co.uk/3rJtM3HgdQKHPj6NVcsANgc39sPIlwfR.mp3",
        "https://audio.jukehost.co.uk/vAVSRkgnD3jff7jYigFHdZlV4gxkdUfQ.mp3",
        "https://audio.jukehost.co.uk/xHRDRPYmIWURW5h4YTpgP3zZhl24NHBn.mp3",
        "https://audio.jukehost.co.uk/Pkce3RxLuRVE31dMiSiUqeSQt4FaamBB.mp3",
        "https://audio.jukehost.co.uk/2gRP6adaDph5ZaHRDaBZNhiggfhPhmGa.mp3",
        "https://audio.jukehost.co.uk/sSUTAJ1O3JYJ8nNfuV5LC55avoRySwAZ.mp3"
];

    let notes = generateNotes();

    function generateNotes() {
        const notes = [];
        const margin = 100; // Margin value to keep notes away from the edges
        const minDistance = 200; // Minimum distance between any two notes

        for (let i = 0; i < noteImages.length; i++) {
            let isValidPosition = false;
            let note;

            while (!isValidPosition) {
                note = {
                    img: noteImages[i],
                    x: Math.random() * (canvas.width - 2 * margin) + margin,
                    y: Math.random() * (canvas.height - 2 * margin) + margin,
                    revealed: false,
                    audio: new Audio(audioClips[i])
                };

                isValidPosition = notes.every(existingNote => {
                    const dx = note.x - existingNote.x;
                    const dy = note.y - existingNote.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    return distance >= minDistance;
                });
            }

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
        const maxWidth = 75;
        let imgWidth = note.img.width;
        let imgHeight = note.img.height;

        if (imgWidth > maxWidth) {
            const scaleFactor = maxWidth / imgWidth;
            imgWidth = maxWidth;
            imgHeight *= scaleFactor;
        }

        if (!note.img.complete) {
            note.img.onload = function() {
                ctx.drawImage(note.img, x - imgWidth / 2, y - imgHeight / 2, imgWidth, imgHeight);
            };
        } else {
            ctx.drawImage(note.img, x - imgWidth / 2, y - imgHeight / 2, imgWidth, imgHeight);
        }
    }

    function toggleAudio(note) {
        if (!note.audio.paused) {
            note.audio.pause();
        } else {
            if (note.audio.ended) {
                note.audio.currentTime = 0;
            }
            note.audio.play();
        }
    }

    canvas.addEventListener('click', function(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        let playAudio = null;

        notes.forEach(note => {
            const dx = x - note.x;
            const dy = y - note.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (note.revealed && distance < 25) {
                playAudio = note;
            } else if (!note.revealed && distance < 40) {
                drawNoteImage(note, note.x, note.y);
                note.revealed = true;
            }
        });

        if (!playAudio) {
            const colorIndex = Math.floor(Math.random() * lightBeamColors.length);
            const color = lightBeamColors[colorIndex];
            drawLight(x, y, color);
        } else {
            toggleAudio(playAudio);
        }
    });
});
