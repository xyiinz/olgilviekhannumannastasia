const music =
document.createElement("audio");


music.src=
"music/tulusjatuhsuka.mp3";


music.loop=true;


music.volume=.5;



if(
sessionStorage.getItem("musicPlaying")
){

music.play();

}



document.body.appendChild(music);