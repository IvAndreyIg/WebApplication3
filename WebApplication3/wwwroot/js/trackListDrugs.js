// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
import AudioBufferPlayer from "./WAA/audioPack.js"
import FullTrackPack from "./classes.js";
import AllElements from "./DOMController.js";
import { getRId, getDragEl } from "./ElementsPack.js";

let tRacksM = new Map();
document.tr=tRacksM;

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
let BarFuck=AllElements.getCircBarF(70);
document.body.style.pointerEvents = "none";
console.log("BarFuck");
console.log(BarFuck);
//document.body.style = "pointer-events:none";
butOk.onclick = function (e) {
    AudioBufferPlayer.audioContext = new AudioContext();
    document.body.style.pointerEvents = "";
    winBlock.style.display="none";
}


MetOK.onclick = function (e) {

    tRacksM.forEach(function (el, i, arr) {
        try {

            BBbuttons[3].innerHTML = "Pl"
            playing = false;
            el.player.setTemp120(inPut.value);

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

let FTM = document.querySelector("#FTM");
let FTB = document.querySelector("#FTB");
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


let BBbuttons = document.getElementsByClassName("BottomButton");

let playing = false;

BBbuttons[3].onclick = function () {
   // console.log("hui")

    if (!playing) {
        tRacksM.forEach(function (el, i, arr) {
            try {

                setTimeout(x=> el.player.playTrack(),0);
            
            } catch (e) {
                // ...выполнится catch
                console.log("Извините, в данных ошибка, мы попробуем получить их ещё раз");
                console.log(e.name);
                console.log(e.message);
            }
        });
        console.log("start");
        BBbuttons[3].innerHTML = "Pa";
        playing = true;
    } else {
        tRacksM.forEach(function (el, i, arr) {
            try {
                
                el.player.stopTrack();

            } catch (e) {
                // ...выполнится catch
                console.log("Извините, в данных ошибка, мы попробуем получить их ещё раз");
                console.log(e.name);
                console.log(e.message);
            }
        });
        
        console.log("stop");
        BBbuttons[3].innerHTML = "Pl"
        playing = false;
    }




};

/*rightList.onmousemove = function () {
    console.log("center move");
}

rightList.onmouseover = function () {
    console.log("center over");
}
rightList.onmouseout = function () {
    console.log("centerout");
}
rightList.onclick = function () {
    // console.log("hui")
    console.log("centeclick");
};*/



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
            RsTyle.top = FTB.getBoundingClientRect().top - 73 + 'px';
            RsTyle.display = "flex";
            cloneName.style.display = "none";
          //  cloneName.style = "display: none;"
        } else
            if (e.target.classList.contains("trackBody")) {
               // e.target.getBoundingClientRect();
                
                RsTyle.left = e.pageX - red.offsetWidth * 0.5 + 'px';
               // console.log(RsTyle.left);
                   RsTyle.top=e.target.getBoundingClientRect().top-73+'px';
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
        
        console.log("left:");
        
       
        track.onmousemove = null;
    
        document.onmousemove = null;
        document.onmouseup = null;

        tName.querySelector(".auTrack");
          
            //Начало
        if (e.target.classList.contains("rightTrackList") || e.target.id === "FTB") {
            BarFuck(10);
          //  console.log("K:");
            console.log(red.getBoundingClientRect().left - FTB.getBoundingClientRect().left);
           // -FTB.getBoundingClientRect().left
            let id = getRId(tRacksM);
            let el = new FullTrackPack(BarFuck,id, cloneName, red.querySelector(".auTrack").getAttribute("src"), red.getBoundingClientRect().left - FTB.getBoundingClientRect().left);
 // el.setStart(red.getBoundingClientRect().left - FTB.getBoundingClientRect().left);
            tRacksM.set(id, el);
          
        } else
            if (e.target.classList.contains("trackBody")) {
                BarFuck(10);
                console.log(red.getBoundingClientRect().left - e.target.getBoundingClientRect().left);
                let TObj = tRacksM.get(e.target.id);
                let id = getRId(tRacksM);
              //  console.log("red:");
              //  console.log(red.querySelector(".auTrack").getAttribute("src"));
                let el = new FullTrackPack(BarFuck,id, tName, red.querySelector(".auTrack").getAttribute("src"), red.getBoundingClientRect().left - FTB.getBoundingClientRect().left, TObj.menuDiv, TObj.bodyDiv);
                   // el.setStart(red.getBoundingClientRect().left - FTB.getBoundingClientRect().left);
                tRacksM.set(id, el);
               
            }


        

      red.remove();
        cloneName.remove();
        
   // console.log("up2");
 //console.log("етот");
       // console.log(e);
    }

}


window.onresize = function (e) {

    centerL.style.height = window.innerHeight - 44 - 44 - 28 + "px";
    
}