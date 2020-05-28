//import * as say from './sayH.js';
import * as n from '../src/sayH.js';
import PitchShifter from '../src/PitchShifter.js';
//import {sayHi} from "./sayH";

//sayHi();
const buzova='js/jagodica.mp3';
let b=document.querySelector("#Bib");
let bs=document.querySelector("#Bob");
let redHead=document.querySelector(".headArr");

n.sayHi();

console.log(PitchShifter);

let canvas=document.querySelector("#ko");
console.log(canvas);
let ctx=canvas.getContext('2d');
let source;
let bb;
//console.log("Bstart1");
let shifter;
 let gainNode;

let cont;
console.log("shiftre:");

bs.onclick=function stop(){
  shifter.disconnect(gainNode);

};




function start(cont,buffer) {
  //arr=cont.createBufferSource();
   gainNode = cont.createGain();
  shifter = new PitchShifter(cont, buffer, 16384);
  shifter.tempo=2.5;
  shifter.rate=0.5;
  console.log(shifter);
  console.log(this);
  console.log("head:");
  //console.log(redHead);



  //shifter.
  //gainNode.setValueAtTime(0.5,0);

 //let shiftToSemitones = shift => -12*Math.log2(1/shift)  ;


  /*cont.resume().then(() => {

    this.setAttribute('disabled', 'disabled');
  });*/









    let DataChen=[buffer.getChannelData(0),buffer.getChannelData(1)];
  //  let LData = arr.buffer.getChannelData(1);
//  console.log(arr.buffer.duration);
  let Colours=["rgba(0,4,230,0.5)","rgba(250,0,0,0.5)"]

    ctx.lineCap="round";
  //кофф блока
  let lenthCoff=32;
  ctx.lineWidth=8;
  //размер блока
let blocksSize=Math.floor(DataChen[0].length/Math.round(buffer.duration*lenthCoff));
//  console.log(`Blocks:${blocksSize}`);
  //420-min
//7-sec

  console.log(`len:${Math.floor(buffer.duration)*lenthCoff}`)
let BlockPos=0;
  for(let i=0;i<Math.floor(buffer.duration)*lenthCoff;i+=1){
    BlockPos+=blocksSize

   // if(i>300){
      //ctx.strokeStyle="blue";
   // }
    for(let j=0;j<buffer.numberOfChannels;j++){
      ctx.strokeStyle=Colours[j];
      ctx.beginPath();
    ctx.moveTo(i+10,150);
    ctx.lineTo(i+10,150-


      (DataChen[j][(BlockPos)]
      +DataChen[j][BlockPos+1]
      +DataChen[j][BlockPos+2]
      +DataChen[j][BlockPos+3]
      +DataChen[j][BlockPos+4])/5

      *100);
    ctx.stroke();
    }
  }
  let Head=15;
  shifter.on('play', (detail) => {
    // redHead.style.left;

    //console.log(detail.formattedTimePlayed);
    //console.log(detail.percentagePlayed);
    // console.log("playe:"+);
    // shifter.timePlayed
    //  progressMeter.value = detail.percentagePlayed;
    redHead.style.left=(Head+lenthCoff*shifter.timePlayed/6)+"px";
    console.log(shifter.timePlayed);
    console.log(redHead.style.left)
 //   co
    //  console.log(redHead.style.left=(Head++)+"px");
  });


  window.gainNode=gainNode;
  shifter.connect(gainNode);
  gainNode.connect(cont.destination);

  return this;
}
b.onclick=()=>{

   cont=new AudioContext();



  window.fetch(buzova)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => cont.decodeAudioData(arrayBuffer))
    .then(audioBuffer => {

      //arr.buffer = audioBuffer;
      //console.log('audiobuffer');
      //console.log(audioBuffer);
     bb= start(cont,audioBuffer);
    });


};





