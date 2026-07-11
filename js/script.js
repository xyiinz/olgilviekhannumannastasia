const landing=document.getElementById("landing");
const home=document.getElementById("home");
const message=document.getElementById("messagePage");

document.getElementById("enterBtn").onclick=()=>{

createHeart();

setTimeout(()=>{

landing.style.display="none";

home.style.display="block";

document.body.style.overflow="auto";

},1200);

}

function createHeart(){

for(let i=0;i<25;i++){

let heart=document.createElement("div");

heart.innerHTML="❤️";

heart.style.position="fixed";

heart.style.left=Math.random()*100+"vw";

heart.style.top="100vh";

heart.style.fontSize=(20+Math.random()*20)+"px";

heart.style.transition="4s linear";

document.body.appendChild(heart);

setTimeout(()=>{

heart.style.transform="translateY(-120vh)";

heart.style.opacity=0;

},100);

setTimeout(()=>heart.remove(),4000);

}

}

function openMenu(menu){

if(menu==="Pesan"){

home.style.display="none";

message.style.display="block";

return;

}

alert(menu+" akan dibuat pada Part selanjutnya ❤️");

}

function backHome(){

message.style.display="none";

home.style.display="block";

}

const envelope=document.getElementById("envelope");

const letter=document.getElementById("letter");

const typing=document.getElementById("typing");

const text=`Hai sayang...

Terima kasih sudah hadir di hidupku.

Website kecil ini mungkin sederhana,
tetapi setiap bagian dibuat khusus untukmu.

Semoga setiap kali kamu membukanya,
kamu selalu ingat kalau ada seseorang
yang sangat menyayangimu.

❤️`;

envelope.onclick=()=>{

envelope.style.display="none";

letter.style.display="block";

let i=0;

typing.innerHTML="";

const interval=setInterval(()=>{

typing.innerHTML+=text.charAt(i);

i++;

if(i>=text.length){

clearInterval(interval);

}

},40);

}

// 1. EFEK KLIK/TAP SEMBURAT HATI (HEART BURST)
document.addEventListener('click', (e) => {
    // Kumpulan emoji romantis & gemas
    const hearts = ['❤️', '💖', '✨', '💕', '🌸'];
    
    // Buat 5 partikel setiap kali layar di-tap
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('span');
        particle.classList.add('heart-particle');
        
        // Ambil emoji acak
        particle.innerText = hearts[Math.floor(Math.random() * hearts.length)];
        
        // Posisikan tepat di titik koordinat jari menyentuh layar
        particle.style.left = e.clientX + 'px';
        particle.style.top = e.clientY + 'px';
        
        // Variabel arah acak untuk CSS Animation (X, Y, dan Rotasi)
        const randomX = (Math.random() - 0.5) * 150 + 'px';
        const randomY = (Math.random() - 0.5) * 150 + 'px';
        const randomR = (Math.random() * 360) + 'deg';
        
        particle.style.setProperty('--x', randomX);
        particle.style.setProperty('--y', randomY);
        particle.style.setProperty('--r', randomR);
        
        document.body.appendChild(particle);
        
        // Hapus elemen dari DOM setelah animasi selesai biar web tidak lemot
        setTimeout(() => {
            particle.remove();
        }, 800);
    }
});

// 2. EFEK TILT MAGNETIK LUXURY PADA KARTU MENU
const cards = document.querySelectorAll('.menu-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        // Hitung posisi kursor/jari relatif terhadap kartu
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Hitung derajat kemiringan (maksimal 10 derajat agar tetap elegan)
        const tiltX = ((y / rect.height) - 0.5) * -15;
        const tiltY = ((x / rect.width) - 0.5) * 15;
        
        card.style.transform = `translateY(-6px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });
    
    // Kembalikan ke posisi semula saat kursor/jari dilepas
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    });
});