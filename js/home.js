// ==========================================
// 1. SISTEM NAVIGASI SPA SMOOTH (FETCH PAGE)
// ==========================================
function loadPage(url) {
    const container = document.getElementById('app-container');
    if (!container) return;
    
    // Pemicu efek menghilang halus (fade-out)
    container.classList.add('fade-out');
    
    setTimeout(() => {
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error("Halaman tidak ditemukan");
                return response.text();
            })
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                
                // Ambil dan pasang CSS halaman tujuan secara dinamis
                const newStyles = doc.querySelectorAll('link[rel="stylesheet"]');
                const oldStyles = document.querySelectorAll('.dynamic-css');

                newStyles.forEach(style => {
                    const href = style.getAttribute('href');
                    // Hindari pemuatan ulang jika file CSS-nya sama dengan css/home.css
                    if (!href.includes('home.css')) {
                        const link = document.createElement('link');
                        link.rel = 'stylesheet';
                        link.href = href;
                        link.classList.add('dynamic-css');
                        document.head.appendChild(link);
                    }
                });

                // Hapus CSS lama setelah CSS baru disiapkan agar tidak berkedip polos
                oldStyles.forEach(style => style.remove());

                // Masukkan konten baru ke dalam container utama
                const newContent = doc.querySelector('.page') || doc.body;
                container.innerHTML = '';
                container.appendChild(newContent.cloneNode(true));
                
                // Update URL browser tanpa reload halaman asli
                if (window.location.pathname.split('/').pop() !== url) {
                    history.pushState({ pageUrl: url }, '', url);
                }

                // --- INTEGRASI TOMBOL KEMBALI DI DALAM HALAMAN ---
                const backBtn = container.querySelector('.back');
                if (backBtn) {
                    backBtn.removeAttribute('onclick');
                    backBtn.addEventListener('click', function(e) {
                        e.preventDefault();
                        loadPage('home.html'); 
                    });
                }

                // Pasang ulang efek kemiringan kartu jika kembali ke beranda utama
                if (url.includes('home.html')) {
                    initMenuTilt();
                }

                // Injeksi/Eksekusi JavaScript bawaan halaman tujuan secara aman
                if (url.includes('message.html')) {
                    loadScript('js/message.js');
                } else if (url.includes('gallery.html')) {
                    loadScript('js/gallery.js');
                } else if (url.includes('reasons.html')) {
                    loadScript('js/reasons.js');
                } else if (url.includes('surprise.html')) {
                    loadScript('js/surprise.js');
                }

                // Munculkan kembali konten (fade-in)
                container.classList.remove('fade-out');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            })
            .catch(err => {
                console.error("Gagal memuat halaman secara smooth:", err);
                window.location.href = url; // Jalur alternatif (fallback) jika ajax gagal
            });
    }, 400);
}

// Menangani tombol back/forward bawaan browser agar SPA tidak rusak
window.addEventListener('popstate', (e) => {
    if (e.state && e.state.pageUrl) {
        loadPage(e.state.pageUrl);
    } else {
        loadPage('home.html');
    }
});

// Fungsi bantu untuk memicu / menyuntikkan script halaman anak secara bersih
function loadScript(src) {
    const oldScript = document.querySelector(`script[src="${src}"]`);
    if (oldScript) oldScript.remove();

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
}

// ==========================================
// 2. EFEK KLIK/TAP SEMBURAT HATI (HEART BURST)
// ==========================================
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
        
        setTimeout(() => {
            particle.remove();
        }, 800);
    }
});

// ==========================================
// 3. EFEK TILT MAGNETIK LUXURY PADA KARTU MENU
// ==========================================
function initMenuTilt() {
    const cards = document.querySelectorAll('.menu-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const tiltX = ((y / rect.height) - 0.5) * -15;
            const tiltY = ((x / rect.width) - 0.5) * 15;
            
            card.style.transform = `translateY(-6px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        });
    });
}

// Inisialisasi efek saat DOM siap
document.addEventListener("DOMContentLoaded", initMenuTilt);