const button = document.getElementById("enterBtn");
const music = document.getElementById("bgMusic");
const landingPage = document.getElementById("landingPage");
const homePage = document.getElementById("homePage");

// 1. EVENT TOMBOL MASUK (TANPA REFRESH)
if (button) {
    button.onclick = () => {
        // Mulai musik
        if (music) {
            music.volume = 0.5;
            music.play().catch(err => console.log("Autoplay diblokir browser: ", err));
        }

        // Efek semburat hati di tengah layar saat masuk
        createHeartsCenter();

        // Proses transisi antar halaman (Smooth SPA Effect)
        if (landingPage && homePage) {
            landingPage.classList.remove("active");
            landingPage.classList.add("hidden");

            // Beri sedikit jeda waktu agar animasi hilangnya landing page terasa pas
            setTimeout(() => {
                homePage.classList.remove("hidden");
                homePage.classList.add("active");
                sessionStorage.setItem("musicPlaying", "true");
            }, 400); 
        }
    };
}

// Fungsi semburat hati khusus tombol enter
function createHeartsCenter() {
    const hearts = ['❤️', '💖', '✨', '💕', '🌸'];
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('span');
        particle.classList.add('heart-particle');
        particle.innerText = hearts[Math.floor(Math.random() * hearts.length)];
        
        particle.style.left = '50%';
        particle.style.top = '50%';
        
        const randomX = (Math.random() - 0.5) * 300 + 'px';
        const randomY = (Math.random() - 0.5) * 300 + 'px';
        const randomR = (Math.random() * 360) + 'deg';
        
        particle.style.setProperty('--x', randomX);
        particle.style.setProperty('--y', randomY);
        particle.style.setProperty('--r', randomR);
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 800);
    }
}

// 2. EFEK KLIK/TAP SEMBURAT HATI SECARA GLOBAL
document.addEventListener('click', (e) => {
    if (e.target.id === 'enterBtn') return;

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

// 3. EFEK TILT MAGNETIK KARTU MENU
const cards = document.querySelectorAll('.menu-card');
if (cards.length > 0) {
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