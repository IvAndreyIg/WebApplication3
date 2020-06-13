
import AudioBufferPlayer from "./WAA/audioPack.js"
import AllElements from "./DOMController.js";

/*export default class User {
    constructor(name) {
        this.name = name;
        this.hui = "231";
    }
}*/
export default class FullTrackPack {

    //статические переменные
    static loadMenu = "idinahui";
    static before1;
    static before2;
    static centerEl = "huii";
    static AuCon;
    static pixSiz = 20;
    static objScrollSt;

    leftStartTime;
    endTime=0;

    get RealStartLeft() {
        return this._RealStartLeft;
    }

    set RealStartLeft(value) {
        this._RealStartLeft = value;
        this.leftStartTime=value/FullTrackPack.pixSiz*1000;
        this.endTime=(this.RealStartLeft+this.pixWidth)/FullTrackPack.pixSiz*1000;
       // console.log("gavno123:"+value+" "+this.leftStartTime);
    }
    get pixWidth() {
        return this._pixWidth;

    }

    set pixWidth(value) {
        this._pixWidth = value;
        this.endTime=(this.RealStartLeft+value)/FullTrackPack.pixSiz*1000;
      //  console.log("iniendtime");
    }







    constructor(scroll,posS, F, PId, track, src, start, before1, before2) {

        this.RealStartLeft = posS;

        this.player = new AudioBufferPlayer(src, start);

        F(50);
        this.player.initial().then(duration => {
            this.duration = duration.toFixed(4);
            this.player.dur=this.duration;
            this.pixWidth = FullTrackPack.pixSiz * this.duration*(this.player.stopTime/100-this.player.startTime);
            console.log("width:");
            console.log(this.pixWidth);
            this.pixPres = this.pixWidth / 100;
            this.persEnd = this.RealStartLeft + this.pixWidth;
            F(65);
            this.Pid = PId;
            this.rightList = FullTrackPack.centerEl.querySelector(".rightTrackList");
            this.leftList = FullTrackPack.centerEl.querySelector(".leftTrackList");
            this.menuDiv = document.createElement("div");
            this.bodyDiv = document.createElement("div");

            this.menuDiv.className = "trackMenu";
            this.menuDiv.innerHTML = track.innerHTML;
           // this.leftStartTime=0;




        }).then(r => {
            F(85);

            if (before1 === undefined) {
                FullTrackPack.before1.before(this.menuDiv);
                FullTrackPack.before2.before(this.bodyDiv);
            }
            else {
                before1.before(this.menuDiv);
                before2.before(this.bodyDiv);
            }
            this.KnobGain = AllElements.getLKnobEL(this.player.gainN.gain, "value", 0.1, 5, 1, 0.05);

            this.menuDiv.append(this.KnobGain);

            this.bodyDiv.className = "trackBody";
            this.bodyDiv.id = PId;
            this.fulltrackPixWidth = this.duration * FullTrackPack.pixSiz;
            /*console.log("this.posStar:");
            console.log(this.RealStartLeft);
            console.log("this.bodyDiv.offsetWidth");
            console.log(this.bodyDiv.offsetWidth);
            console.log("before2.getBoundingClientRect().left");
            console.log(FullTrackPack.before2.getBoundingClientRect().left);*/
            this.thisSize = this.fulltrackPixWidth > (this.bodyDiv.offsetWidth - this.RealStartLeft + scroll.scrollBarLeft) ? this.bodyDiv.offsetWidth - this.RealStartLeft + scroll.scrollBarLeft : this.fulltrackPixWidth;
            console.log("  this.thisSize");
            console.log(this.fulltrackPixWidth + " |secs: " + this.bodyDiv.offsetWidth/FullTrackPack.pixSiz + " | " + this.RealStartLeft/FullTrackPack.pixSiz+" | " + this.thisSize);
            this.trackGrabber_svg=AllElements.getTrackGrabber_SVG("bogdanovPidor",this.thisSize);
            this.trackGrabber_svg.style.left=this.RealStartLeft-scroll.scrollBarLeft+"px";

            this.bodyDiv.append(this.trackGrabber_svg);

            this.tracksrc = track.querySelector(".auTrack");



            //ПЕРЕДВИЖЕНИЕ ТРЕКА ПО ПОЛОСЕ
            this.trackGrabber_svg.onmousedown = e=>  {


                let Start=e.pageX;

                console.log("Bogdanovdown:"+this.RealStartLeft);
                let LeftTemp=this.RealStartLeft;

                document.onmousemove = e=> {
                    if(FullTrackPack.objScrollSt.scrollBarChild.offsetWidth-500-this.pixWidth<(LeftTemp+e.pageX-Start)){
                        FullTrackPack.objScrollSt.scrollBarChild.style.width=FullTrackPack.objScrollSt.scrollBarChild.offsetWidth+1000+"px";
                    }
                  //  console.log("FullTrackPack.objScrollSt.scrollBarChild");
                 //   console.log(FullTrackPack.objScrollSt.scrollBarChild);
                    this.RealStartLeft=(LeftTemp+e.pageX-Start)>=0?LeftTemp+e.pageX-Start:0;
                   // console.log("Bogdanovpuc:"+e.pageX+" "+Start);
                    // console.log("Bogdanovmove:"+this.RealStartLeft);
                    //track.onmousemove = null;
                    this.setThisTrackLeftPos(FullTrackPack.objScrollSt);
                };

                document.onmouseup =  e=> {
                    document.onmousemove = null;
                    //pointerClass.disabled = true;
                }



            };



           // F(95);

          //  this.RealStartLeft+=scroll.scrollBarCont;

        }).then(r => {

          //  console.log(this)
            //100
            F(100);
        });





    }

    setThisTrackLeftPos(objSCroll){

        this.templeft=this.RealStartLeft-objSCroll.scrollBarLeft;
        //отступ видно
        if(this.templeft>=0){
            //  console.log("нупизда1");
            this.trackGrabber_svg.style.left = this.templeft + "px";

            this.trackGrabber_svg.style.width = this.fulltrackPixWidth+"px";
        }
        //отступ не видно
        else{
            //console.log("нупизда2"+"this.thisSize:"+this.thisSize);
            this.trackGrabber_svg.style.left="0px";
            if((this.fulltrackPixWidth+this.templeft-this.bodyDiv.offsetWidth)<=0){

                this.trackGrabber_svg.style.width=((this.fulltrackPixWidth+this.templeft>0)?this.fulltrackPixWidth+this.templeft:0)+"px";
                //console.log("нупизда3 "+this.fulltrackPixWidth+" "+this.templeft);
            }
        }
        //Длина блока <текуща ширина трека+ трек лефт
        if (this.bodyDiv.offsetWidth <= this.trackGrabber_svg.offsetWidth + this.trackGrabber_svg.offsetLeft) {
            //console.log("нупизда");
            this.trackGrabber_svg.style.width=this.bodyDiv.offsetWidth - (this.trackGrabber_svg.offsetWidth + this.trackGrabber_svg.offsetLeft)+"px";


        }
       // this.leftStartTime=this.RealStartLeft/FullTrackPack.pixSiz*1000;
        //this.leftEndTime=
        console.log("this.leftpix:");
        console.log(this.leftStartTime);
    }


}
export  let  trackListMap=new Map();




//trackListMap.set(3123,{this.});

//trackListMap.set(3123,new FullTrackPack());
console.log(trackListMap);
console.log(trackListMap.has(3123));
console.log(trackListMap.has(31));
/*
function getRId(map) {
    if (map === undefined) {
        return null;
    }
    for (; ;) {
        let id = Math.random().toString(10).substr(2, 9);

        if (!map.has(id)) {
            return id;
        }
    }

}
console.log(getRId(trackListMap));
console.log(getRId(trackListMap));*/
