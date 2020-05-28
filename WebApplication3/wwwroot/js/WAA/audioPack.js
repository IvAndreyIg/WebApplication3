


import PitchShifter from './SoundTouch/PitchShifter.js';




export default class AudioBufferPlayer {

    //private:
    position;
   verb = null;

    static audioContext = null;

    //public:
    get position() { return this.position };
    set position(position) {

        this.position = position < this.trackAudioBuffer.duration ? position : this.trackAudioBuffer.duration

    };




    constructor(trackSource,start, nodes) {

        if (trackSource instanceof AudioBuffer) {
            this.trackBuffer = trackSource;
            console.log('агсл');
        }
        else {

            //подгружаем трек в хранилище
            window.fetch(trackSource)
                .then(response =>{
                    return response.arrayBuffer();

                })
                .then(arrayBuffer => AudioBufferPlayer.audioContext.decodeAudioData(arrayBuffer))
                .then(audioBuffer => {

                    this.trackAudioBuffer = audioBuffer;
                    this.shifter = new PitchShifter(AudioBufferPlayer.audioContext, this.trackAudioBuffer, 16384);
                });
        }

        this.start = start / 800 * 100;
        this.trackSource = trackSource;
        this.aContext = AudioBufferPlayer.audioContext;
        this.position = 0;
        this.nodes = nodes == undefined ? 0 : nodes;
        this.playing = false;
        this.nodes = new Set();
        this.trackRate = 1;


        console.log('ready');
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

    playTrack(...nodes) {

        if (!this.playing)
            if (this.trackAudioBuffer != null) {
                this.playing = true;
               // this.rev = this.aContext.createConvolver();
               // this.source = this.aContext.createBufferSource();

              //  this.source.buffer = this.trackAudioBuffer;
             //   this.source.playbackRate.value = this.trackRate;

                this.startTime = this.aContext.currentTime - (this.position || 0);

                //setTimeout(()=> {
                    this.connect();
             //   console.log('played');
             //   }, this.start * 1000)
                

                console.log(this.position);


                

            }
            else {   //если нет ожидаем подгрузки
                setTimeout(this.playTrack.bind(this), 30);
            }

    }
    stopTrack() {

        if (this.playing) {
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
