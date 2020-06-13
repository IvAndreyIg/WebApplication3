// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
import AudioBufferPlayer from "./WAA/audioPack.js"
import FullTrackPack from "./classes.js";
import AllElements from "./DOMController.js";
import Handler from "./Handler.js";
import { getRId, getDragEl } from "./ElementsPack.js";
//import Clocks from "./Clocks.js";
let tRacksM = new Map();
document.tr = tRacksM;
let pointerClass;
let trackPacks = document.getElementsByClassName("trackPack");
let buttonAct = document.querySelector(".buttonList");
let trackChoicer = document.querySelector(".trackChoicer");
let rightList = document.querySelector(".rightTrackList");
let centerL = document.querySelector(".centerPlace");
let Tempo = document.querySelector(".met");
let MetWind = document.querySelector(".metWind");
let MetOK = document.querySelector(".okBut");
let inPut = document.querySelector(".inputMetr");
let butOk = document.querySelector(".butOk");
let winBlock = document.querySelector(".winBlock");

let scrollBar = document.querySelector(".panel21");
let fuckPanel = document.querySelector(".panel2");


let timePool=document.querySelector(".timePool");
let handler;
let FTM = document.querySelector("#FTM");
let FTB = document.querySelector("#FTB");
let BBbuttons = document.getElementsByClassName("BottomButton");


let closurePS=()=>{
    let playing = false;
    let Pl=()=>{
        window.Clocks.startTimer();

        console.log("start");
        BBbuttons[3].innerHTML = "Pa";
        playing = true;
    };
    let Pa=()=>{
        window.Clocks.pauseTime();
        tRacksM.forEach(function (el, i, arr) {
            try {



            } catch (e) {
                // ...выполнится catch
                console.log("Извините, в данных ошибка, мы попробуем получить их ещё раз");
                console.log(e.name);
                console.log(e.message);
            }
        });

        console.log("stop");
        BBbuttons[3].innerHTML = "Pl";
        playing = false;
    };
    let ST=()=>{
        window.Clocks.stopTime();
        tRacksM.forEach(function (el, i, arr) {
            try {



            } catch (e) {
                // ...выполнится catch
                console.log("Извините, в данных ошибка, мы попробуем получить их ещё раз");
                console.log(e.name);
                console.log(e.message);
            }
        });

        console.log("stop");
        BBbuttons[3].innerHTML = "Pl";
        playing = false;
    };
    let toggle=()=>{
        if (!playing) {

        } else {

        }

    };

    return {
        Pl,ST,Pa,toggle

    }

};

window.Clocks={
    timeOnStart:0,
    timeOnStop:15000,
    timeSpace:20,
    timeOutF:null,
    TimePause:0,
    tempTime:0,
    tracksToStart:[],
    stopAll(){

        closurePS.ST();
    },
    setTime(){
        this.stopAll();

    },
    startTimer(){
      //  let tempTime;
        let maThTime=this.TimePause>0?this.TimePause:this.timeOnStart;
        console.log("checkTimes:"+maThTime+" "+this.TimePause+" "+this.timeOnStart);
        let firsttime=maThTime;
        let startTime=new Date().getTime()-maThTime;
        //let lastTemp=this.time;
        let diff;
        let startArr=Number.parseInt(handler.leftRight[2].style.left);
        let tempTrToS=[];
        let tempTrPaS=[];
        tRacksM.forEach( (el, i, arr)=> {
        //    console.log(this.timeOnStart+"| puccc|"+el.leftStartTime+"| |"+this.timeOnStop+"| "+el.endTime);
            try {
              //  console.log("el.player.dur");
               // console.log(el.duration);
                console.log("GAVNO");
                console.log(el);
                console.log(maThTime+"| puccc|"+el.leftStartTime+"| |"+this.timeOnStop+"| "+el.endTime);
                if(maThTime<el.leftStartTime){
                    console.log("p1");
                    if(el.leftStartTime<this.timeOnStop){
                        console.log("p2");
                       // this.timeOnStart-el.leftStartTime
                        tempTrPaS.push(el);

                    }


                }
                else{
                    //слева
                    console.log("p3");
                    //&&this.timeOnStop>el.endTime
                        if(el.endTime>maThTime){
                            console.log("p4");
                            tempTrToS.push(el);
                        }

                }
               // setTimeout(x=> el.player.playTrack(),0);

                this.tracksToStart.push()
            } catch (e) {
                // ...выполнится catch
                console.log("Извините, БЛЯЯЯ");
                console.log(e.name);
                console.log(e.message);
            }
        });
        tempTrToS.forEach( (el, i, arr)=> {

            let emptywidths=maThTime-el.leftStartTime;
            let trashTime=(maThTime-el.leftStartTime)/(el.duration*1000);
            setTimeout(x=> el.player.playTrack(trashTime),0);
            console.log("LWid:"+el.duration*1000+" "+emptywidths+" "+trashTime) ;
        });

        //---------------
        this.timeOutF=setTimeout((function goTime () {
            maThTime+=this.timeSpace;

            this.tempTime=new Date().getTime()-startTime;

            diff=this.tempTime-maThTime;
           // lastTemp=tempTime;
           // console.log(tempTime+" sp : "+diff);
            if(this.tempTime>=this.timeOnStop+this.timeSpace){
                this.stopAll();
            }else{
                this.timeOutF=  setTimeout( goTime.bind(this),this.timeSpace -(diff));

                timePool.innerHTML=`${Math.trunc(this.tempTime/60000)}:${Math.trunc(this.tempTime%60000/1000)} :${this.tempTime%1000}`;
                handler.leftRight[2].style.left=startArr+(this.tempTime-firsttime)/1000*FullTrackPack.pixSiz+"px";
            }


            tempTrPaS.forEach( (el, i, arr)=> {

                if(el.leftStartTime<=this.tempTime){
                    console.log(i+" ==== "+i);
                    el.player.playTrack(0);
                    tempTrPaS.splice(i, 1);
                }
            });

           // console.log(handler.leftRight[2]);
          //  console.log(startArr+(this.tempTime-firsttime)/1000*FullTrackPack.pixSiz+"px");
           // lastTemp=tempTime;
        }).bind(this),this.timeSpace)
        //---------------
    },
    stopTime(){
        clearTimeout(this.timeOutF);
        this.tempTime=0;
        this.TimePause=0;
    },
    pauseTime(){
        clearTimeout(this.timeOutF);
        console.log("блеать:"+this.tempTime);
        this.TimePause=this.tempTime;
        this.tempTime=0;
    },
    setTimeFromPix(leftPix){
      //  let time= leftPix/FullTrackPack.pixSiz;
       // let milices=leftPix/FullTrackPack.pixSiz*1000;
       // let milicest=;
        this.pauseTime();
        this.TimePause=Math.trunc((leftPix+10)/FullTrackPack.pixSiz*1000);
        console.log(" time:"+this.TimePause);
        timePool.innerHTML=`${Math.trunc(this.TimePause/60000)}:${Math.trunc(this.TimePause%60000/1000)}:${this.TimePause%1000}`;
    },
    setStartStopTimeFromPix(start,stop){
        //  let time= leftPix/FullTrackPack.pixSiz;
        // let milices=leftPix/FullTrackPack.pixSiz*1000;
        // let milicest=;
        this.pauseTime();
        this.timeOnStart=Math.trunc((start)/FullTrackPack.pixSiz*1000);
        this.timeOnStop=Math.trunc((stop)/FullTrackPack.pixSiz*1000);
        console.log(" time:"+this.TimePause);
        timePool.innerHTML=`${Math.trunc(this.TimePause/60000)}:${Math.trunc(this.TimePause%60000/1000)}:${this.TimePause%1000}`;
    }


};

//window.Clocks.startTimer();

let BarFuck=AllElements.getCircBarF(70);
document.body.style.pointerEvents = "none";
console.log("BarFuck");
console.log(BarFuck);
//document.body.style = "pointer-events:none";
butOk.onclick = function (e) {
    AudioBufferPlayer.audioContext = new AudioContext();
    document.body.style.pointerEvents = "";
    winBlock.style.display = "none";
    pointerClass = document.styleSheets[0];
    console.log(pointerClass);
    pointerClass.disabled = true;
};


MetOK.onclick = function (e) {

    tRacksM.forEach(function (el, i, arr) {
        try {

            BBbuttons[3].innerHTML = "Pl"
            playing = false;
        //    el.player.setTemp120(inPut.value);

        } catch (e) {
            // ...выполнится catch
            console.log("Извините, в данных ошибка, мы попробуем получить их ещё раз");
            console.log(e.name);
            console.log(e.message);
        }
    });
}

Tempo.onmouseover=function(e) {
    MetWind.style.left = Tempo.getBoundingClientRect().left + "px";
    MetWind.style.top = Tempo.getBoundingClientRect().top-60 + "px";
    MetWind.style.display="block";
};
Tempo.onmouseout = function (e) {
     BBbuttons[3].innerHTML = "Pl"
        playing = false;
    MetWind.style.display = "none";
};



let alEl = new AllElements(document.getElementsByClassName("trackPack"),
    document.querySelector(".buttonList"),
    document.querySelector(".trackChoicer")



);
//console.log(rightList.classList.contains("rightTrackList"));


//AudioBufferPlayer.AudioContext=
FullTrackPack.centerEl = centerL;
FullTrackPack.before1 = FTM;
FullTrackPack.before2 = FTB;

//назначаем контекст для всех объектов
//AudioBufferPlayer.audioContext = new AudioContext();;
//console.log("Player");
//console.log(AudioBufferPlayer);


console.log(rightList);
buttonAct.onclick = function () {
   // console.log("hui")
    trackChoicer.classList.toggle('transform-active');


 
    
};









BBbuttons[3].onclick = function () {
   // console.log("hui")

    closurePS.toggle();




};

//Полоса прокрутки
let objSCroll = {
    scrollBar: document.querySelector(".panel21"),
    scrollBarLeft: document.querySelector(".panel21").firstElementChild,
    scrollBarChild: document.querySelector(".panel21").firstElementChild,
    SEt(scrollBar, scrollBarCont) {
        this.scrollBar = scrollBar;
        this.scrollBarLeft = scrollBarCont;
    }
};
//УСТАНОВКА ПЕРВОГО ЗНАЧЕНИЯ
objSCroll.SEt(scrollBar.offsetWidth, scrollBar.scrollLeft);
objSCroll.scrollBarChild=scrollBar.firstElementChild;
FullTrackPack.objScrollSt=objSCroll;



for (let track of trackPacks) {

    let PlayB = track.querySelector(".playStopButton")
    let audioTag = track.querySelector(".auTrack");
    
    if (PlayB !=null)
        track.onclick = function (e) {



            console.log(audioTag);
            //id трека
            if (track.TiD == null) {

            }
            console.log("puc");
            if (PlayB.playing == false || PlayB.playing == null) {


                audioTag.play(); 

                PlayB.style.backgroundColor = "blue";
                PlayB.playing = true;
            }
            else {
                PlayB.style.backgroundColor="chocolate";
                PlayB.playing = false;
                audioTag.pause();
            }
        
        }
   



    track.onmousedown = function (e) {


        pointerClass.disabled = false;

        //console.log("down");


        track.onmousemove = function (e) {

            let tName = track.querySelector(".trackName");


           
            if (track.querySelector(".trackName") !== null) {
                trackDraging(e, track, tName);
            }
            
           // console.log("move"); 
            track.onmousemove = null;
        }

        track.onmouseup = function (e) {
            track.onmousemove = null;
            pointerClass.disabled = true;
        }

        

    };
   // console.log(track);
}

function trackDraging(e, track, tName) {
    let pip = track.querySelector(".trackName");


    
    let cloneName = tName.cloneNode(true);
    
    document.body.appendChild(cloneName);

    cloneName.style.zIndex = 1000; 
    // подготовить к перемещению
    // 2. разместить на том же месте, но в абсолютных координатах

    cloneName.style.position = 'absolute';
    moveAt(e);
    // переместим в body, чтобы мяч был точно не внутри position:relative


    // показывать мяч над другими элементами

    // передвинуть мяч под координаты курсора
    // и сдвинуть на половину ширины/высоты для центрирования
    function moveAt(e) {
        cloneName.style.left = e.pageX - cloneName.offsetWidth  + 'px';
        cloneName.style.top = e.pageY - cloneName.offsetHeight  + 'px';
    }

    // 3, перемещать по экрану
    let red = getDragEl(tName.innerHTML);
    let RsTyle = red.style;
    // 3, перемещать по экрану
    rightList.append(red);
    document.onmousemove = function (e) {
        //console.log(e.target);


        if (e.target.classList.contains("rightTrackList") || e.target.id === "FTB") {
            RsTyle.left = e.pageX - red.offsetWidth * 0.5 + 'px';
            RsTyle.top = FTB.getBoundingClientRect().top - fuckPanel.getBoundingClientRect().top-fuckPanel.getBoundingClientRect().height-3 + 'px';

            RsTyle.display = "flex";
            cloneName.style.display = "none";
          //  cloneName.style = "display: none;"
        } else
            if (e.target.classList.contains("trackBody")) {
               // e.target.getBoundingClientRect();
                
                RsTyle.left = e.pageX - red.offsetWidth * 0.5 + 'px';
               // console.log(RsTyle.left);
                   RsTyle.top=e.target.getBoundingClientRect().top-fuckPanel.getBoundingClientRect().top-fuckPanel.getBoundingClientRect().height-3+'px';

                RsTyle.display = "flex";
                cloneName.style.display="none";
              //  cloneName.style = "display: none;"
            }
            else {
                cloneName.style.display = "flex";
                RsTyle.display = "none";
                //console.log(cloneName.style);
                moveAt(e);

            }


    }

    // 4. отследить окончание переноса
    document.onmouseup = function (e) {
        
      //  console.log("left:");
        
       
        track.onmousemove = null;
    
        document.onmousemove = null;
        document.onmouseup = null;

        tName.querySelector(".auTrack");
          
            //Начало
        if (e.target.classList.contains("rightTrackList") || e.target.id === "FTB") {
            BarFuck(10);
          //  console.log("K:");
          //  console.log(red.getBoundingClientRect().left - FTB.getBoundingClientRect().left);
           // -FTB.getBoundingClientRect().left
            let posS = red.getBoundingClientRect().left - e.target.getBoundingClientRect().left+objSCroll.scrollBarLeft;
         //   console.log("shit:");
        //    console.log(red.getBoundingClientRect().left +" "+ e.target.getBoundingClientRect().left+" " +objSCroll.scrollBarLeft);


            let id = getRId(tRacksM);
            let el = new FullTrackPack(objSCroll,posS,BarFuck,id, cloneName, red.querySelector(".auTrack").getAttribute("src"), red.getBoundingClientRect().left - FTB.getBoundingClientRect().left);
 // el.setStart(red.getBoundingClientRect().left - FTB.getBoundingClientRect().left);
            tRacksM.set(id, el);
          
        } else
            if (e.target.classList.contains("trackBody")) {
                BarFuck(10);
                //console.log(red.getBoundingClientRect().left - e.target.getBoundingClientRect().left);
                let posS = red.getBoundingClientRect().left - e.target.getBoundingClientRect().left+objSCroll.scrollBarLeft;
                //console.log("shit:");
               // console.log(red.getBoundingClientRect().left +" "+ e.target.getBoundingClientRect().left+" " +objSCroll.scrollBarLeft);
                let TObj = tRacksM.get(e.target.id);
                let id = getRId(tRacksM);
              //  console.log("red:");
              //  console.log(red.querySelector(".auTrack").getAttribute("src"));
                let el = new FullTrackPack(objSCroll,posS,BarFuck,id, tName, red.querySelector(".auTrack").getAttribute("src"), red.getBoundingClientRect().left - FTB.getBoundingClientRect().left, TObj.menuDiv, TObj.bodyDiv);
                   // el.setStart(red.getBoundingClientRect().left - FTB.getBoundingClientRect().left);
                tRacksM.set(id, el);
               
            }


        

      red.remove();
        cloneName.remove();
        pointerClass.disabled = true;
   // console.log("up2");
 //console.log("етот");
       // console.log(e);
    }

}
let topCanvas = document.querySelector(".LineCanvas");

topCanvas.ctx=topCanvas.getContext('2d');
//console.log("topCanvas");
//console.log(topCanvas);




//topCanvas.ctx.font = 'bold 4px sans-serif';

topCanvas.can=function (pixforsec, startPix, endPix) {
    this.width=fuckPanel.offsetWidth;
    this.ctx.lineWidth=0.75;
    this.ctx.strokeStyle="rgb(66,62,66)";
    this.ctx.clearRect(0, 0, this.width, this.height);
   // console.log(this.ctx);

    let startTime=Math.trunc(startPix/pixforsec)+1;
let firstsec=startPix%pixforsec+1;
    //полных секунд
    let timeinsec=Number.parseInt(((endPix-startPix)/pixforsec).toFixed(0));
   // startPix+=pixforsec-startPix%pixforsec;

    //отступаем неполную секунду
let secPosition=pixforsec-startPix%pixforsec;



for(let time=0;time<timeinsec;time++){
   // console.log("3123");
   // this.ctx.beginPath();
    this.ctx.moveTo(secPosition,5);

    this.ctx.lineTo(secPosition,20);
    this.ctx.strokeText((startTime+time)+"", secPosition+1, 7);
    this.ctx.stroke();
    secPosition+=pixforsec;

}







    //objSCroll
}
//topCanvas.can(FullTrackPack.pixSiz,objSCroll.scrollBarLeft,objSCroll.scrollBarLeft+topCanvas.offsetWidth);



window.onresize = function (e) {

    centerL.style.height = window.innerHeight - 44 - 44 - 98 - 28 + "px";
    topCanvas.setAttribute("width", fuckPanel.offsetWidth);
    topCanvas.can(FullTrackPack.pixSiz, objSCroll.scrollBarLeft, objSCroll.scrollBarLeft + topCanvas.offsetWidth);
}
centerL.style.height = window.innerHeight - 44 - 44 - 98 - 28 + "px";
let templeft;

handler= new Handler(".Handler",objSCroll,window.Clocks);
handler.leftRight[2].style.left="-10px";
scrollBar.addEventListener('scroll', function (e) {
    
    //console.log("scro");
    objSCroll.SEt(e.target.offsetWidth, e.target.scrollLeft);
   

   // console.log(objSCroll.scrollBar);
   // console.log(objSCroll.scrollBarLeft);


    tRacksM.forEach(function (track, i, arr) {

        track.setThisTrackLeftPos(objSCroll);

    });
    handler.setThisHandlerLeftPos(objSCroll);
    topCanvas.can(FullTrackPack.pixSiz,objSCroll.scrollBarLeft,objSCroll.scrollBarLeft+topCanvas.offsetWidth);
});
//первая инициализация таймлайна
topCanvas.can(FullTrackPack.pixSiz, objSCroll.scrollBarLeft, objSCroll.scrollBarLeft + topCanvas.offsetWidth);

