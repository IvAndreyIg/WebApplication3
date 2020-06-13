



export default class Handler{

     _RealArrPossLeft = -10;

    get RealArrPossLeft(){
        return this._RealArrPossLeft;
    }
    set RealArrPossLeft(val){
         this._RealArrPossLeft=val;
        this.clocks.setTimeFromPix(this.RealStartLeft+this._RealArrPossLeft);
    }

    constructor(className,objScrollSt,clocks) {
        this.div=document.querySelector(className);
        this.width=this.div.offsetWidth;
        this.RealStartLeft=0;
        this.bodyDiv = this.div.parentElement;
        this.leftRight = this.div.children;
        this.clocks=clocks;

        this.leftRight[0].onmousedown= e=>  {


            let Start=e.pageX;

            // console.log("Bogdanovdown:"+this.RealStartLeft);
            let LeftTemp=this.RealStartLeft;






        };

        this.div.onmousedown = e=>  {
            console.log("gavno:");
            console.log(e.target);

            let Start=e.pageX;
            let widthT=this.width;
            console.log("Bogdanovdown:"+this.RealStartLeft);
            let LeftTemp=this.RealStartLeft;
            if(e.target===this.div){
            document.onmousemove = e=> {


                this.RealStartLeft=(LeftTemp+e.pageX-Start)>=0?LeftTemp+e.pageX-Start:0;
                console.log("Bogdanovpuc:"+e.pageX+" "+Start);
                console.log("Bogdanovmove:"+this.RealStartLeft);
                //track.onmousemove = null;
                this.setThisHandlerLeftPos(objScrollSt);
            };

            document.onmouseup =  e=> {
                document.onmousemove = null;
                //pointerClass.disabled = true;
            }
            }else{
                if(e.target===this.leftRight[0]){
                    document.onmousemove = e=> {

                        if(this.width>30){

                        this.RealStartLeft=(LeftTemp+e.pageX-Start)>=0?LeftTemp+e.pageX-Start:0;
                        this.width=widthT+(LeftTemp-this.RealStartLeft)>31?widthT+(LeftTemp-this.RealStartLeft):31;

                        console.log("this.width");
                        console.log(this.width);
                        //track.onmousemove = null;
                        this.setThisHandlerLeftPos(objScrollSt);}
                    };

                    document.onmouseup =  e=> {
                        document.onmousemove = null;
                        //pointerClass.disabled = true;
                    }



                }
                if(e.target===this.leftRight[1]){
                    document.onmousemove = e=> {

                      //  if(this.width>30){

                          //  this.RealStartLeft=(LeftTemp+e.pageX-Start)>=0?LeftTemp+e.pageX-Start:0;
                            this.width=widthT-(Start-e.pageX)>31?widthT-(Start-e.pageX):31;
                            console.log("this.width");
                            console.log(this.width);
                           /* if(this.width<=30){
                                this.width+=7;
                            }
                            if(this.width<=30){
                                this.width+=7;
                            }
                            if(this.width<=30){
                                this.width+=7;
                            }
                            if(this.width<=3d0){
                                this.width+=7;
                            }*/
                            //track.onmousemove = null;
                            this.setThisHandlerLeftPos(objScrollSt);
                            }
                   // };

                    document.onmouseup =  e=> {
                        document.onmousemove = null;
                        //pointerClass.disabled = true;
                    }



                }
                if (e.target === this.leftRight[2]) {
                    let temppos = this.RealArrPossLeft;
                    document.onmousemove = e => {


                        let posTemp = (this.RealArrPossLeft - (Start - e.pageX));
                       // this.leftRight[2].style.left = posTemp >= -10 ? posTemp : -10) +"px"
                        temppos = (posTemp >= -10 && posTemp <= (this.width - 10) ? posTemp : (posTemp >= -10 ? (this.width - 10) : -10)) ;
                        this.leftRight[2].style.left = temppos+ "px";
                        /*console.log("posisa" + " " + Start + " " + this.RealArrPossLeft + " " + e.pageX +" "+  this.leftRight[2].style.left);
                        console.log(temppos + "px");*/

                    };
                    // };

                    document.onmouseup = e => {
                         this.RealArrPossLeft=temppos;
                        document.onmousemove = null;
                        //pointerClass.disabled = true;
                    }



                }



            }


        };

       /* console.log("bitck");
        console.log(this.leftRight[0]);*/





    }
    setThisHandlerLeftPos(objSCroll){

        this.templeft=this.RealStartLeft-objSCroll.scrollBarLeft;
        //отступ видно



        if(this.templeft>=0){
              console.log("нупизда1");
            this.div.style.left = this.templeft + "px";
            this.leftRight[2].style.left=this.RealArrPossLeft+"px";
            this.div.style.width = this.width+"px";
            this.leftRight[1].hidden=false;
            this.leftRight[0].hidden=false;
        }
        //отступ не видно
        else{
            console.log("нупизда2"+"this.thisSize:");
            this.div.style.left="0px";
            if((this.width+this.templeft-this.bodyDiv.offsetWidth)<=0){
                this.leftRight[2].style.left=this.RealArrPossLeft+this.templeft+"px";
                this.div.style.width=((this.width+this.templeft>0)?this.width+this.templeft:0)+"px";
                console.log("нупизда3 ");
                this.leftRight[0].hidden=true;
            }
        }
        if (this.bodyDiv.offsetWidth <= this.div.offsetWidth + Number.parseInt(this.div.style.left)) {

            this.leftRight[1].hidden=true;
            this.div.style.width=this.bodyDiv.offsetWidth -  + Number.parseInt(this.div.style.left)+"px";
            console.log("нупизда4"+" "+this.div.style.width+" "+ this.bodyDiv.offsetWidth+" "+this.div.offsetWidth+" "+Number.parseInt(this.div.style.left) );
console.log((this.div.offsetWidth - (this.div.offsetWidth + Number.parseInt(this.div.style.left)))+"px");
        }

        //this.leftRight[2].style.left

        //Длина блока <текуща ширина трека+ трек лефт
        let temppos = (this.RealArrPossLeft >= -10 && this.RealArrPossLeft <= (this.width - 10) ? this.RealArrPossLeft : (this.RealArrPossLeft >= -10 ? (this.width - 10) : -10)) ;
        this.leftRight[2].style.left = temppos+ "px";

        this.clocks.setStartStopTimeFromPix(this.RealStartLeft,this.RealStartLeft+this.width);
        this.clocks.setTimeFromPix(this.RealStartLeft+this._RealArrPossLeft);
    }

    // this.leftRight[2].style.left = posTemp >= -10 ? posTemp : -10) +"px"


}