// Menggunakan Block Scope {} agar variabel const/let aman dari tabrakan memori SPA
{
    const gift = document.getElementById("gift");
    const final = document.getElementById("finalMessage");
    const letter = document.getElementById("letter");

    const text = `
Terima kasih sudah membuka semua halaman kecil ini.
Semuanya mungkin sederhana.
Tetapi semuanya dibuat dengan satu tujuan.
Yaitu membuat kamu tersenyum.
Semoga kita selalu diberikan kebahagiaan.

Aku sayang kamu,
Hari ini.
Besok.
Dan seterusnya.
❤️
`;

    // Daftarkan fungsi ke objek window agar onclick="openGift()" di HTML terbaca sempurna
    window.openGift = function() {
        if (!gift || !final || !letter) return;

        gift.style.display = "none";
        final.style.display = "block";
        
        letter.innerHTML = ""; // Pastikan wadah kosong sebelum efek mengetik dimulai
        typing();
        createHeart();
    };

    window.backHome = function() {
        if (typeof loadPage === 'function') {
            loadPage('home.html');
        } else {
            window.location.href = "home.html";
        }
    };

    function typing() {
        let i = 0;
        const interval = setInterval(() => {
            letter.innerHTML += text.charAt(i);
            i++;
            if (i >= text.length) {
                clearInterval(interval);
            }
        }, 45);
    }

    function createHeart() {
        for (let i = 0; i < 35; i++) {
            let h = document.createElement("div");
            h.innerHTML = "❤️";
            h.style.position = "fixed";
            h.style.left = Math.random() * 100 + "vw";
            h.style.bottom = "-20px";
            h.style.fontSize = Math.random() * 10 + 20 + "px"; // Ukuran hati bervariasi
            h.style.zIndex = "999";
            h.style.transition = "transform 5s ease-out, opacity 5s ease-out";
            
            document.body.appendChild(h);

            setTimeout(() => {
                h.style.transform = `translateY(-120vh) rotate(${Math.random() * 360}deg)`;
                h.style.opacity = "0";
            }, 100);

            setTimeout(() => {
                h.remove();
            }, 5000);
        }
    }

    // --- EFEK INTERAKTIF KLIK HATI (Hanya dipasang jika belum diinisialisasi) ---
    if (!window.heartEffectInitialized) {
        document.addEventListener('click', (e) => {
            const hearts = ['❤️', '💖', '✨', '💕', '🌸'];
            for (let i = 0; i < 5; i++) {
                const particle = document.createElement('span');
                particle.classList.add('heart-particle');
                particle.innerText = hearts[Math.floor(Math.random() * hearts.length)];
                
                particle.style.left = e.clientX + 'px';
                particle.style.top = e.clientY + 'px';
                
                const randomX = (Math.random() - 0.5) * 150 + 'px';
                const randomY = (Math.random() - 0.5) * 150 + 'px';
                const randomR = (Math.random() * 360) + 'deg';
                
                particle.style.setProperty('--x', randomX);
                particle.style.setProperty('--y', randomY);
                particle.style.setProperty('--r', randomR);
                
                document.body.appendChild(particle);
                setTimeout(() => particle.remove(), 800);
            }
        });
        window.heartEffectInitialized = true;
    }
}