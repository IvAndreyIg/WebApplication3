//const url3 = 'https://dl.dropboxusercontent.com/s/qo2ootyr0ier8uh/dinky-jam-2.mp3';
let context = new ( window.AudioContext || webkitAudioContext )();
//const context = new AudioContext();
let button = document.querySelector('.lkass');
let url3 = 'tessa.mp3';
//const context = new AudioContext();
'use strict'
class fileTrack{

    //private:
     #position;
        #verb=null;

     //public:
    get position(){return this.#position};
    set position(position){

        this.#position=position<this.trackAudioBuffer.duration?position:this.trackAudioBuffer.duration

    };




    constructor(trackSource,aContext,nodes) {

        if(trackSource instanceof AudioBuffer ){
            this.trackBuffer=trackSource;
        }
        else{
        //подгружаем трек в хранилище
        window.fetch(trackSource)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => aContext.decodeAudioData(arrayBuffer))
            .then(audioBuffer => {

                this.trackAudioBuffer = audioBuffer;
                console.log('audiobuffer');
                console.log(audioBuffer);
            });
        }


        this._trackSource=trackSource;
        this.aContext=aContext;
        this.#position=0;
        this.nodes=nodes==undefined?0:nodes;
        this.playing=false;
        this.nodes=new Set();
        this.trackRate=1;

    }


    setVerb(revFilter,reverbPack,reverbComp){

        this.#verb=null;

        reverbComp.connect(this.aContext.destination);
        this.#verb=reverbPack.input;
        revFilter.connect(reverbPack.input);
        reverbPack.connect(reverbComp);
        return this;
    }
    clearVerb(){
        this.#verb=null;

        return this;
    }


    setRate(rate){
        this.source.playbackRate.value=(typeof rate)=='number'?rate:1;
    }

    playTrack(...nodes){

        if(!this.playing)
        if (this.trackAudioBuffer!=null){
            this.playing=true;
            this.rev=this.aContext.createConvolver();
            this.source = this.aContext.createBufferSource();
            
           this.source.buffer = this.trackAudioBuffer;
            this.source.playbackRate.value=this.trackRate;


        this.connect();

            console.log(this.#position);
            this.startTime=this.aContext.currentTime-( this.#position || 0 );
        this.source.start(this.aContext.currentTime, this.#position);

        }
        else

        {   //если нет ожидаем подгрузки
            setTimeout(this.playTrack.bind(this),80);
        }

    }
    stopTrack(){

        if(this.playing){
            this.source.stop(0);
            this.#position = this.aContext.currentTime - this.startTime;


            this.source = null;
            this.playing=false;
        }
        // this.startTime=this.aContext.currentTime;
        //console.log(this.source);

        // console.log(`{2+2}`);
    }
    addNodes(...newNodes){
        console.log("before:");
        console.log(this.nodes);
        newNodes.forEach((val,index,array) =>{

            if(![...this.nodes].find(function(item, index, array) {
                if(val.constructor==item.constructor){
                    return val.type!=undefined&&val.type==item.type;
                }
                else {
                    return false
                }
            })){
                this.nodes.add(val);
            }

        })
        console.log("after");
        console.log(this.nodes);
        return this;
    }
    connect(...nodes){
        this.disconnectALL();
        this.nodes=nodes.length>0?new Set(nodes):this.nodes;
        let thisNode=this.source;
     if(this.nodes.size>0){

         console.log("node:");
         console.log(thisNode);
         console.log(this.source);
         for(let node of this.nodes){

             thisNode.connect(node);
            thisNode=node;
         }
         if(this.#verb){
             console.log("VERBON")
             thisNode.connect(this.#verb);
         }
         else
         thisNode.connect(this.aContext.destination);
     }
        if(this.#verb){
            console.log("VERBON")
            thisNode.connect(this.#verb);
        }
        else{
            thisNode.connect(this.aContext.destination);
    }

    /* else {
         if(this.#verb){
             thisNode.connect(this.#verb);
         }
         else
             thisNode.connect(this.aContext.destination);
         console.log('empty');
         this.source.connect(this.aContext.destination);
     }*/

    }

    connect2(nodeS){
        /*this.disconnectALL();
        this.nodes=nodes.length>0?new Set(nodes):this.nodes;

        if(this.nodes.size>0){
            let thisNode=this.source;
            console.log("node:");
            console.log(thisNode);
            console.log(this.source);
            for(let node of this.nodes){

                thisNode.connect(node);
                thisNode=node;
            }
            thisNode.connect(this.aContext.destination);
        }else {
            console.log('empty');
            this.source.connect(this.aContext.destination);
        }
*/this.nodeS=nodeS;


    }
    connect3(){
        /*this.disconnectALL();
        this.nodes=nodes.length>0?new Set(nodes):this.nodes;

        if(this.nodes.size>0){
            let thisNode=this.source;
            console.log("node:");
            console.log(thisNode);
            console.log(this.source);
            for(let node of this.nodes){

                thisNode.connect(node);
                thisNode=node;
            }
            thisNode.connect(this.aContext.destination);
        }else {
            console.log('empty');
            this.source.connect(this.aContext.destination);
        }
*/
        this.output = this.aContext.createGain();
        this.output.gain.value = 0.1;
        this.output.connect(this.nodeS);
        this.source.connect(this.output);

    }



    disconnect(...nodes){

        this.nodes.forEach((val,val2,setic)=>{

            val.disconnect();
        })

        for(let node of nodes){

           // node

            this.nodes.delete(node);
        }

        this.source.disconnect();
        this.connect();
      //  this.nodes.length=0;
       // this.connect();

    }
    disconnectALL(){

        this.nodes.forEach((val,val2,setic)=>{

            val.disconnect();
        })

        this.source.disconnect();
       // this.connect();
        //  this.nodes.length=0;
        // this.connect();

    }
        connectNodes(...nodes){
           // this.stopTrack();
            this.connect(...nodes);
            //this.playTrack();
        }

}





let D;
D=new fileTrack(url3,context);
const playButton = document.querySelector('#play');
playButton.onclick = () => {

    D.playTrack();
}
const stopButton = document.querySelector('#stop');
stopButton.onclick = () => {
    //let D=new fileTrack(url3,context);
    D.stopTrack();
}



let panerr= context.createStereoPanner();

panerr.pan.value=0.06;

let highPass = context.createBiquadFilter();
highPass.type = "highpass";
highPass.frequency.value = 2800;
highPass.Q.value = 0.9;

    let highShelf = context.createBiquadFilter();
    highShelf.type = "highshelf";
    highShelf.frequency.value = 4700;
    highShelf.gain.value = 30;

    let lowShelf = context.createBiquadFilter();
    lowShelf.type = "lowshelf";
    lowShelf.frequency.value = 35;
    lowShelf.gain.value = 40;
const addNodes = document.querySelector('#add');
addNodes.onclick = () => {
    //let D=new fileTrack(url3,context);

    D.addNodes(lowShelf).connect();
    //D.connect();
};

const addNodes2 = document.querySelector('#add2');
addNodes2.onclick = () => {
    //let D=new fileTrack(url3,context);

    D.addNodes(lowShelf,highShelf,highPass).connect();
    //D.connect();
};
const rate = document.querySelector('#Rate');
rate.onclick = () => {
    //let D=new fileTrack(url3,context);

    D.setRate(1.5);
    //D.connect();
};

const disc = document.querySelector('#dis');
disc.onclick = () => {
    //let D=new fileTrack(url3,context);

    D.disconnect(highShelf);
    //D.connect();
};
const disc2 = document.querySelector('#dis2');
disc2.onclick = () => {
    //let D=new fileTrack(url3,context);

    D.disconnect(highPass);
    //D.connect();
};
const disc3 = document.querySelector('#dis3');
disc3.onclick = () => {
    //let D=new fileTrack(url3,context);

    D.disconnect(lowShelf,highShelf,highPass);
    //D.connect();
};
const pan = document.querySelector('#pann');
pan.onclick = () => {
    //let D=new fileTrack(url3,context);

    D.addNodes(panerr).connect();
    //D.connect();
};

let filter = new Filter(context, "lowpass", 50000, 0.8);
filter.setup();
let verb = new AdvancedReverb(context);

verb.wet.gain.value = 35;
verb.decayTime = 1.0;



let compressor = context.createDynamicsCompressor();
compressor.threshold.setValueAtTime(-24, context.currentTime);
compressor.knee.setValueAtTime(40, context.currentTime);
compressor.ratio.setValueAtTime(12, context.currentTime);
compressor.attack.setValueAtTime(0, context.currentTime);
compressor.release.setValueAtTime(0.25, context.currentTime);
//compressor.connect(context.destination);

//filter.connect(verb.input);
//verb.connect(compressor);

const verp = document.querySelector('#verbp');
verp.onclick = () => {
    //let D=new fileTrack(url3,context);

    D.setVerb(filter,verb,compressor).connect();
    //D.connect();
};
const out = document.querySelector('#verbpout');
out.onclick = () => {
    //let D=new fileTrack(url3,context);

    D.clearVerb().connect();
    //D.connect();
};