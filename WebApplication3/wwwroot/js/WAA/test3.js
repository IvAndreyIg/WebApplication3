import AudioBufferPlayer from "./audioPack.js";



const buzova='40sec.mp3';

setTimeout(x=>{
    AudioBufferPlayer.audioContext= new AudioContext();
    window.a=new AudioBufferPlayer(buzova);
    a.initial().then(z=>{

        a.playTrack(0.20);
    });

},2000);
