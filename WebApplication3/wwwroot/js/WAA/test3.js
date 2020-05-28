import AudioBufferPlayer from "./audioPack.js";

AudioBufferPlayer.audioContext= new AudioContext();

const buzova='jagodica.mp3';
new AudioBufferPlayer(buzova).playTrack();