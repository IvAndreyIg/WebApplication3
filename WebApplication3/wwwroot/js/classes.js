﻿
import AudioBufferPlayer from "./WAA/audioPack.js"


/*export default class User {
    constructor(name) {
        this.name = name;
        this.hui = "231";
    }
}*/
export default class FullTrackPack {

    static loadMenu = "idinahui";
    static before1;
    static before2;
    static centerEl = "huii";
    static AuCon;
   

    constructor(PId,track,src,start,before1,before2) {
        this.Pid = PId;
        this.rightList = FullTrackPack.centerEl.querySelector(".rightTrackList");
        this.leftList = FullTrackPack.centerEl.querySelector(".leftTrackList");
        this.menuDiv = document.createElement("div");
        this.bodyDiv = document.createElement("div");
       
        this.menuDiv.className = "trackMenu";
        this.menuDiv.innerHTML = track.innerHTML;
        this.bodyDiv.className = "trackBody";
        this.bodyDiv.id = PId;
        if (before1 === undefined) {
            FullTrackPack.before1.before(this.menuDiv);
            FullTrackPack.before2.before(this.bodyDiv);
        }
        else {
            before1.before(this.menuDiv);
            before2.before(this.bodyDiv);
        }
        this.tracksrc = track.querySelector(".auTrack");
       
        this.player = new AudioBufferPlayer(src, start);

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