


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
        this.gainN.gain
        this.start = start / 800 * 100;
        this.trackSource = trackSource;

        this.aContext = AudioBufferPlayer.audioContext;
        this.position = 0;
        this.nodes = nodes == undefined ? new Set(): nodes;
        this.playing = false;
        console.log('ready1');
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
                    this.shifter = new PitchShifter(AudioBufferPlayer.audioContext, this.trackAudioBuffer, 16384);
                    console.log("idinah");
                    this.shifter.on('play', (detail) => {

                        //redHead.style.left=(Head+lenthCoff*shifter.timePlayed/6)+"px";
                        // console.log(detail);
                        console.log(this.shifter.percentagePlayed+" | "+this.shifter.sourcePosition);

                        if (detail.percentagePlayed >= (this.tempstopTime||this.stopTime)){
                            console.log("puc");
                            this.stopTrack();
                            this.tempstopTime=undefined;
                        }
                        // console.log(redHead.style.left)
                       // this.dur=this.trackAudioBuffer;
                        if(this.Hui2){
                            this.gainN.gain.value=1.0;

                        }else {
                            this.Hui2=true;
                        }

                    });
                });
       }
        return this.trackAudioBuffer.duration;

    }

    getBufferCont(){
        //this.trackAudioBuffer
        let DataChen=[buffer.getChannelData(0),buffer.getChannelData(1)];

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
    setTemp120(temp) {

        if (this.playing)
                this.stopTrack();

        this.shifter.tempo=temp/120;




    }

    playTrack(startTime=this.startTime,stopTime=this.stopTime) {

        if (!this.playing)
            if (this.trackAudioBuffer != null) {
                this.tempstopTime=stopTime;
                this.playing = true;
               // this.rev = this.aContext.createConvolver();
               // this.source = this.aContext.createBufferSource();

              //  this.source.buffer = this.trackAudioBuffer;
             //   this.source.playbackRate.value = this.trackRate;

               

                //setTimeout(()=> {
               //
                console.log("startTime:"+startTime);
                if(startTime>0){
                    this.shifter.percentagePlayed=startTime;
                    startTime=0;
                }
             //   gainTemp
                this.gainN.gain.value=0.0;
                    this.connect();
                //this.gainN.gain.value=1.0;
                /*if(startTime>0){
                    this.shifter.percentagePlayed=startTime;
                    startTime=0;
                }*/
             //   console.log('played');
             //   }, this.start * 1000)
              //  console.log("gain2");
              

              //  console.log(this.position);


                

            }
            else {   //если нет ожидаем подгрузки
              //  console.log("pizda");
                setTimeout(this.playTrack.bind(this), 80);
            }

    }
    stopTrack() {

        if (this.playing) {
            this.Hui2=false;
            this.disconnectALL();




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
    connect(...nodes) {
        this.disconnectALL();
        this.nodes = nodes.length > 0 ? new Set(nodes) : this.nodes;
        let thisNode = this.shifter;
        if (this.nodes.size > 0) {

            console.log("node:");
            console.log(thisNode);
            console.log(this.source);
            for (let node of this.nodes) {

                thisNode.connect(node);
                thisNode = node;
            }
            if (this.verb) {
                console.log("VERBON2");
                thisNode.connect(this.verb);
            }
            else {
                console.log("VERBON1");
            thisNode.connect(this.aContext.destination);
                }
        }
        if (this.verb) {

            console.log("VERBON3");
            thisNode.connect(this.verb);
        }
        else {

         //   console.log("VERBON4");
            console.log("еба1"+this.shifter.percentagePlayed);
            thisNode.connect(this.gainN);
            this.gainN.connect(this.aContext.destination);

            console.log(this.shifter.percentagePlayed);
            console.log("еба2"+this.shifter.percentagePlayed);
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

      //  this.source.disconnect();
        this.connect();
        //  this.nodes.length=0;
        // this.connect();

    }
    disconnectALL() {

        this.nodes.forEach((val, val2, setic) => {

            val.disconnect();
        })

        this.shifter.disconnect();
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
