// Membungkus kode dalam block scope {} untuk mencegah error 'already been declared' saat navigasi SPA
{
    const backButton = document.querySelector('.back');
    if (backButton) {
        backButton.removeAttribute('onclick'); // Hapus attribute onclick inline jika ada
        backButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (typeof loadPage === 'function') {
                loadPage('home.html'); // Navigasi smooth tanpa mematikan musik
            } else {
                window.location.href = "home.html";
            }
        });
    }

    const envelope = document.getElementById("envelope");
    const letter = document.getElementById("letter");
    const typing = document.getElementById("typing");

    const message = `Hai sayang...

Sebelumnya, aku baru pertama kali bikin yang kayak gini HAHAHAHA, jadi bisa dibilang kamu beruntungg kalo sama aku :PPPPPP

Terimakasiii yaa udah mau kenal samaa akuu, aku gatauuu kamu bisa bakal nerima aku secara baik atau tidaakk..

Eh aku gatau yaa aku sekarang kecintaan sendirian apa enggaaa WKWKKWKW

Maaf ya kalo aku ngomongnya agak panjang dan lebay hahaha, tapi keknya memang love language aku kek gini HAHAHA..

Aku juga mau minta maaf sama kamuu, perkenalan kita singkattt bgtt ya, keknya baru cuma seminggu udah ditinggal pendidikann hahaha, tapi gapapa ya sayanggg yaaa?

Aku juga di pendidikan bakal ngeusahain gimana pun caranya buat bisa megang hp demi bisa komunikasi sama kamu disanaa..

Oh iya, aku gatau, dari awal aku lihat kamu yang kamu live di tiktok itu aku udah suka bgt liat kamu, karna tipe aku yang bondol kacamata yaa dan juga kamu cantikkk bgtt terus lucuuu imut, ditambah lagi kamu kalo di chat tipikal yang ramah dan baik jugaa, semoga aku dan kamu bisa terbiasa yaa, jangan yang salting salting lagi HAHAHA.. aku suka bgt sama kamu..

Tapi semoga kamu dan aku tidakk seperti ini di awal aja ya? karna aku disini sekarang udah yang dewasa dengan umur segini walaupun belum tua tua kali lah hahaha, tapi setidaknya aku udah umur segini yang seharusnya ga mikirin buat cari pasangan lagii, semoga kamu dan aku bisa pas yaa..

Semoga kedepannya aku bisa tetap sama kamu tanpa harus ada hambatan dari laki laki atau mungkin masa lalu kamu ya? Percayalaa ogii, aku yang sekarang udah berubah bgtt, kalo bisa dibilang mungkin ini versi terbaik aku dari beberapa kali gagal dari orang sebelumnya, karna emang bener ya walaupun gagal diawal bakal digantikan yang terbaik kedepannya, dan aku yakin kamu adalah yang terbaik buat aku sekarang, karna aku udah bisa fokus sama satu orang aja, dan itu kamu sayangggg ❤️

Semoga kedepannya kalo kita tetap sama sama pun bisa jadi saling lebih dewasa yaa.

Aku cuma mau bilang, aku sayang sama kamu, 
aku suka sama kamu, 
aku pengen banget bisa kenal sama kamu lebih dalam lagi, 
aku pengen banget bisa jadi yang terbaik buat kamu, 
aku pengen banget bisa jadi yang selalu ada buat kamu, 
aku pengen banget bisa jadi yang selalu nemenin kamu, 
aku pengen banget bisa jadi yang selalu bikin kamu seneng, 
aku pengen banget bisa jadi yang selalu bikin kamu bahagia, 
aku pengen banget bisa jadi yang selalu bikin kamu nyaman, 
aku pengen banget bisa jadi yang selalu bikin kamu tenang, 
aku pengen banget bisa jadi yang selalu bikin kamu aman, 
aku pengen banget bisa jadi yang selalu bikin kamu percaya sama aku, 
aku pengen banget bisa jadi yang selalu bikin kamu sayang sama aku, 
aku pengen banget bisa jadi yang selalu bikin kamu cinta sama aku.`;

    if (envelope) {
        envelope.onclick = () => {
            envelope.style.transform = "scale(0)";
            
            setTimeout(() => {
                envelope.style.display = "none";
                if (letter) {
                    letter.style.display = "block";
                    startTyping();
                }
            }, 500);
        };
    }

    function startTyping() {
        if (!typing) return;
        
        let i = 0;
        const speed = 35; 
        typing.innerHTML = ""; // Reset teks agar tidak double saat dibuka ulang

        const typingEffect = setInterval(() => {
            typing.innerHTML += message.charAt(i);
            i++;

            if (i >= message.length) {
                clearInterval(typingEffect);
                createFinalHearts();
            }
        }, speed);
    }

    function createFinalHearts() {
        for (let i = 0; i < 25; i++) {
            let heart = document.createElement("div");
            heart.innerHTML = "❤️";
            heart.style.position = "fixed";
            heart.style.left = Math.random() * 100 + "vw";
            heart.style.bottom = "-25px";
            heart.style.fontSize = (18 + Math.random() * 14) + "px";
            heart.style.pointerEvents = "none";
            heart.style.transition = "transform 4s linear, opacity 4s ease";
            heart.style.zIndex = "999";
            
            document.body.appendChild(heart);

            setTimeout(() => {
                heart.style.transform = "translateY(-105vh) rotate(" + (Math.random() * 180 - 90) + "deg)";
                heart.style.opacity = "0";
            }, 50);

            setTimeout(() => {
                heart.remove();
            }, 4050);
        }
    }
}