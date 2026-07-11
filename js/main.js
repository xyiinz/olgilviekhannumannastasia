const button = document.getElementById("enterBtn");
const music = document.getElementById("bgMusic");
const landingPage = document.getElementById("landingPage");
const homePage = document.getElementById("homePage");

// 1. KONTROL EFEK TRANSISI MASUK
if (button) {
    button.onclick = (e) => {
        e.preventDefault();

        // Putar Musik
        if (music) {
            music.volume = 0.5;
            music.play().catch(err => console.log("Autoplay diblokir browser: ", err));
        }

        // Jalankan Efek Semburat Hati
        createHeartsCenter();

        // Mulai Transisi Halaman
        if (landingPage && homePage) {
            landingPage.style.opacity = "0";
            landingPage.style.transform = "translateY(-20px)";
            landingPage.style.pointerEvents = "none";

            setTimeout(() => {
                landingPage.classList.remove("active");
                landingPage.classList.add("hidden");

                homePage.classList.remove("hidden");
                homePage.classList.add("active");
                
                // Trigger efek masuk untuk halaman Home
                setTimeout(() => {
                    homePage.style.opacity = "1";
                    homePage.style.transform = "translateY(0)";
                }, 50);

                sessionStorage.setItem("musicPlaying", "true");
            }, 600); // Sinkron dengan durasi transisi CSS
        }
    };
}

// Fungsi membuat ledakan hati di tengah
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

// 2. EFEK SEMBURAT HATI SAAT LAYAR DIKLIK GLOBAL
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