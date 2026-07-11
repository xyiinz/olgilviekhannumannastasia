// Dibungkus kurung kurawal {} (Block Scope) agar variabel const/let tidak bentrok di memori global SPA
{
    const reasons = [
        "Rambut bondol kamu WKWKW.",
        "Kacamata kamuu yang bikin kamu jadi lebih manis dan imut.",
        "Kamu punya aura yang bikin aku merasa nyaman setiap kali ngobrol sama kamu.",
        "Hal-hal kecil yang kamu lakukan sering kali tanpa sadar bikin aku tersenyum.",
        "Karena bersama kamu aku merasa nyaman.",
        "Setiap kali melihat kamu, selalu ada rasa tenang.",
        "Dari semua alasan yang ada, yang paling besar adalah karena kamu adalah kamu. Rambut bondol dan kacamata mungkin yang pertama kali menarik perhatian aku, tapi hati dan kepribadian kamu yang membuatku benar-benar menyukai kamu."
    ];

    let index = 0;

    const card = document.getElementById("card");
    const number = document.getElementById("number");
    const reason = document.getElementById("reason");

    // Ditempel ke objek window agar tombol onclick="" di HTML dapat memanggil fungsinya
    window.backHome = function() {
        if (typeof loadPage === 'function') {
            loadPage('home.html'); // Menggunakan fungsi navigasi smooth bawaan web kamu
        } else {
            window.location.href = "home.html"; // Fallback jika diakses langsung tanpa SPA
        }
    };

    window.nextReason = function() {
        if (!card || !number || !reason) return;

        // Efek memutar kartu saat tombol ditekan
        card.style.transform = "rotateY(180deg)";

        setTimeout(() => {
            index++;

            if (index >= reasons.length) {
                index = 0;
            }

            number.innerHTML = String(index + 1).padStart(2, "0");
            reason.innerHTML = reasons[index];

            // Kembalikan putaran kartu setelah konten teks berubah
            card.style.transform = "rotateY(0deg)";
        }, 300);
    };

    // --- EFEK INTERAKTIF KLIK HATI (Mencegah duplikasi event listener) ---
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
                
                setTimeout(() => {
                    particle.remove();
                }, 800);
            }
        });
        window.heartEffectInitialized = true;
    }
}