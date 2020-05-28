import PitchShifter from './PitchShifter.js';

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const gainNode = audioCtx.createGain();
let shifter;

const buzova='js/jagodica.mp3';

const loadSource = function (url) {

  if (shifter) {
    shifter.off();
  }
  fetch(url)
    .then((response) => response.arrayBuffer())
    .then((buffer) => {

      audioCtx.decodeAudioData(buffer, (audioBuffer) => {

        shifter = new PitchShifter(audioCtx, audioBuffer, 16384);


      });
    });
};

loadSource(buzova);

let is_playing = false;
const play = function () {
  shifter.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  audioCtx.resume().then(() => {
    is_playing = true;
    this.setAttribute('disabled', 'disabled');
  });
};

const pause = function (playing = false) {
  shifter.disconnect();
  is_playing = playing;
  playBtn.removeAttribute('disabled');
};

let b=document.querySelector("#Bib");
b.onclick=play;
//play();

/*progressMeter.addEventListener('click', function (event) {
  const pos = event.target.getBoundingClientRect();
  const relX = event.pageX - pos.x;
  const perc = relX / event.target.offsetWidth;
  pause(is_playing);
  shifter.percentagePlayed = perc;
  progressMeter.value = 100 * perc;
  currTime.innerHTML = shifter.timePlayed;
  if (is_playing) {
    play();
  }
});*/
