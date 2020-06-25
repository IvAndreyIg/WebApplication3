


import PitchShifter from './SoundTouch/PitchShifter.js';




export default class AudioBufferPlayer {

    //private:
    position;
   verb = null;
    dur=null;
    static audioContext = null;
    //shifter=null;
    stopTime = 100;
    tempstopTime=undefined;
    startTime = 0;
    gainTemp=0;
    Hui2=false;

    // старт время дробью
    set startTime(tm) {
        this.startTime = this.startTime > 1 ? this.startTime / 100 : this.startTime;
    }



    constructor(trackSource,start, nodes) {



        this.gainN=new GainNode(AudioBufferPlayer.audioContext);
        this.gainN.gain;
        this.start = start / 800 * 100;
        this.trackSource = trackSource;

        this.aContext = AudioBufferPlayer.audioContext;
        this.position = 0;
        this.nodes = nodes|| new Map();
        this.playing = false;
       // console.log('ready1');

    }

    async initial() {
        let pucked = null;
        if (this.trackSource instanceof AudioBuffer) {
         
            this.trackBuffer = this.trackSource;
            console.log('агсл');
        }
        else {

            //подгружаем трек в хранилище
            await window.fetch(this.trackSource)
                .then(response =>{
                    return response.arrayBuffer();

                })
                .then(arrayBuffer => AudioBufferPlayer.audioContext.decodeAudioData(arrayBuffer))
                .then(audioBuffer => {
                    //console.log("duration:");
                    //console.log(audioBuffer.duration);
                    this.trackAudioBuffer = audioBuffer;



                    this.trackRate = 1;
                   // console.log('ready');
                });
       }
        return this.trackAudioBuffer.duration;

    }

    setVerb(revFilter, reverbPack, reverbComp) {

        this.verb = null;

        reverbComp.connect(this.aContext.destination);
        this.verb = reverbPack.input;
        revFilter.connect(reverbPack.input);
        reverbPack.connect(reverbComp);
        return this;
    }
    clearVerb() {
        this.verb = null;

        return this;
    }


    setRate(rate) {
        this.source.playbackRate.value = (typeof rate) == 'number' ? rate : 1;
    }

    playTrack(perspos,...nodes) {

        if (!this.playing)
            if (this.trackAudioBuffer != null) {
                this.playing = true;
                this.rev = this.aContext.createConvolver();
                this.source = this.aContext.createBufferSource();
                this.source.onended=()=>{
                //    console.log("открывай уши");
                    this.position=0;

                    this.playing = false;

                    this.source&&(console.log("pig"));
                    this.source&&(this.source.stop(0));
                    this.source = null;
                };

                this.source.buffer = this.trackAudioBuffer;
                this.source.playbackRate.value = this.trackRate;
                console.log(this.position);
                this.position=perspos!==undefined?perspos*this.trackAudioBuffer.duration:this.position;
                this.startTime = this.aContext.currentTime - (this.position || 0);

                this.connect();


                this.source.start(this.aContext.currentTime, this.position);
                console.log('played');

            }
            else {   //если нет ожидаем подгрузки
                setTimeout(this.playTrack.bind(this), 30);
            }

    }
    stopTrack() {

        if (this.playing) {
            this.source.stop(0);
            this.position = this.aContext.currentTime - this.startTime;


            this.source = null;
            this.playing = false;
        }

    }
    addNodes(...newNodes) {
        console.log("before:");
        console.log(this.nodes);
        newNodes.forEach((val, index, array) => {

            if (![...this.nodes].find(function (item, index, array) {
                if (val.constructor == item.constructor) {
                    return val.type != undefined && val.type == item.type;
                }
                else {
                    return false
                }
            })) {
                this.nodes.add(val);
            }

        })
        console.log("after");
        console.log(this.nodes);
        return this;
    }
    connect(nodes) {
        this.disconnectALL();
        this.nodes = nodes=!undefined > 0 ? nodes : this.nodes;
        let thisNode = this.source;
        if (this.nodes.size > 0) {

            console.log("node:");
            console.log(thisNode);
            console.log(this.source);
            for (let node of this.nodes) {

                thisNode.connect(node);
                thisNode = node;
            }
            if (this.verb) {
                console.log("VERBON")
                thisNode.connect(this.verb);
            }
            else
                thisNode.connect(this.aContext.destination);
        }
        if (this.verb) {
            console.log("VERBON")
            thisNode.connect(this.verb);
        }
        else {
            thisNode.connect(this.aContext.destination);
        }



    }





    disconnect(...nodes) {

        this.nodes.forEach((val, val2, setic) => {

            val.disconnect();
        })

        for (let node of nodes) {

            // node

            this.nodes.delete(node);
        }

        this.source.disconnect();
        this.connect();
        //  this.nodes.length=0;
        // this.connect();

    }
    disconnectALL() {

        this.nodes.forEach((val, val2, setic) => {

            val.disconnect();
        })

        this.source.disconnect();
        // this.connect();
        //  this.nodes.length=0;
        // this.connect();

    }
    connectNodes(...nodes) {
        // this.stopTrack();
        this.connect(...nodes);
        //this.playTrack();
    }

}
