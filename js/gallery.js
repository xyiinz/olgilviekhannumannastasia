// Dibungkus Block Scope {} agar variabel internal tidak bentrok di memori global SPA
{
    const photos = document.querySelectorAll(".photo img");
    const viewer = document.getElementById("viewer");
    const viewerImg = document.getElementById("viewerImg");
    const closeBtn = document.getElementById("close");

    // Ditempel ke objek window agar tombol onclick="" di HTML tetap bisa diakses
    window.backHome = function() {
        if (typeof loadPage === 'function') {
            loadPage('home.html'); // Navigasi halus sistem SPA kamu
        } else {
            window.location.href = "home.html"; // Fallback jika diakses manual
        }
    };

    // Fungsi buka gambar penuh (Lightbox)
    if (photos.length > 0 && viewer && viewerImg) {
        photos.forEach(photo => {
            photo.onclick = (e) => {
                e.stopPropagation(); // Biar event click partikel tidak bentrok
                viewer.style.display = "flex";
                viewerImg.src = photo.src;
            };
        });
    }

    // Tombol close silang klik
    if (closeBtn) {
        closeBtn.onclick = (e) => {
            e.stopPropagation();
            viewer.style.display = "none";
        };
    }

    // Klik di area luar gambar untuk otomatis menutup lightbox
    if (viewer) {
        viewer.onclick = (e) => {
            if (e.target === viewer) {
                viewer.style.display = "none";
            }
        };
    }

    // --- EFEK INTERAKTIF KLIK HATI (Diproteksi agar tidak duplikat listener) ---
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