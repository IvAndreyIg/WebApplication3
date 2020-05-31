


export default class AllElements {

    blocked = false;

    static _Knob;

    static get Knob() {
        if (AllElements._Knob != null && AllElements._Knob != undefined) return AllElements._Knob.cloneNode(true);
        else {
            let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("class", "knobic");
            svg.setAttribute("width", "40");
            svg.setAttribute("height", "40");
            svg.setAttribute("viewBox", "0 0 40 40");

            let cir1 = document. createElementNS("http://www.w3.org/2000/svg", "circle");
            cir1.setAttribute("cx", "20");
            cir1.setAttribute("cy", "20");
            cir1.setAttribute("r", "15");
            cir1.setAttribute("fill", "#8328ff");

            let poly = document. createElementNS("http://www.w3.org/2000/svg", "polygon");
            poly.setAttribute("transform", "rotate(0 20 20)");
            poly.setAttribute("points", "20 13 17 1.5 23 1.5");
            poly.setAttribute("stroke", "red");
            poly.setAttribute("stroke-opacity", "0.9");
            // cir1.setAttribute("fill", "red");
            poly.setAttribute("fill", "#36F317");
            poly.setAttribute("stroke-width", "0.5");
            poly.setAttribute("class", "trig");

            svg.appendChild(cir1);
            svg.appendChild(poly);
            // attach container to document
            AllElements._Knob=svg;
            return AllElements._Knob.cloneNode(true);
        }
    }
  //  static _Input;
    static  Input(min=1,max=100,val=(min+max)/2,type="range",classs,step=0.1) {

            let put = document.createElement( "input");

            //<input type="range" min="1" max="100" value="50" class="slider" id="myRange" style="width:40px">
            put.setAttribute("type", type);
        put.min = min;
        put.max = max;
            put.setAttribute("value",classs);
        put.value = val;
        put.step=step;
        put.setAttribute("class", classs);


       /* let Val = Slider2.getElementsByClassName("input1")[0];
        let Sl1 = Slider2.getElementsByClassName("sliderType1")[0];
        FilterVal2.value=Sl1.value=Val.value=(Min2+Max2)/2;
        Val.oninput = function () {
            Val.value = parseFloat(Val.value) < Min2 ? Min2 : Val.value;
            Val.value = parseFloat(Val.value) > Max2 ? Max2 : Val.value;
            FilterVal2.value = parseFloat(Val.value);
            Sl1.value = parseFloat(Val.value);
        };
        Sl1.min = Min2;
        Sl1.max = Max2;
        Sl1.oninput = function () {
            Val.value = this.value;
            FilterVal2.value = this.value;
        }*/

            return put;

    }


    static getCircBarF(radius = 52, color = "#8328ff") {

        /*<svg class="progress-ring" width = "120" height = "120" >
          
        </svg >*/
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        
        svg.setAttribute("class", "progress-ring");
        svg.setAttribute("width", radius*2+12+"");
        svg.setAttribute("height", radius * 2 + 12 + "");
    //    svg.setAttribute("viewBox", "0 0 40 40");
 // <circle class="progress-ringcircle" stroke="white" fill="transparent" stroke-width="4" cx="60" cy="60" r="52" />
        let cir1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        cir1.setAttribute("class", "progress-ringcircle");
        cir1.setAttribute("stroke", "#D111A3");
        cir1.setAttribute("stroke-width", "6");

        cir1.setAttribute("cx", radius+8+"");
        cir1.setAttribute("cy", radius+8+"");
        cir1.setAttribute("r", radius.toString());
        cir1.setAttribute("fill", "transparent");

        svg.append(cir1);

        let dif = document.createElement("div");
        dif.className="BarDiv";
        dif.append(svg);
        let bartext = document.createElement("span");
        bartext.className = "bartext";
        dif.append(bartext);
       // const circle = document.querySelector('.progress-ringcircle');
     //   const radius = cir1.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        console.log(circumference);
        cir1.style.strokeDasharray = `${circumference} ${circumference}`;
        cir1.style.strokeDashoffset = circumference;

        
       // setProgress(70);

        /*let Func = (percent) => {
 const offset = circumference - percent / 100 * circumference;
            cir1.style.strokeDashoffset = offset;
        };*/
        document.body.prepend(dif);
        return (percent) => {
            console.log("pizda" + percent);
           
            if (percent < 100 && percent > 0) {
                cir1.style.strokeDashoffset = circumference - percent / 100 * circumference;
                document.body.style.pointerEvents = "none";
                dif.style.display = "block";
                bartext.innerText = percent + "%";
            }
            else {
                document.body.style.pointerEvents = "";
                dif.style.display="none";
                if(percent===-1){
                    dif.remove();
                }
            }
        };
    }



static getLKnobEL(obj,objVal,min,max,val,step){
        let knob=AllElements.Knob;
        let inputr=AllElements.Input(min,max,val,"range","inputRange1",step);
        let inputText=AllElements.Input(min,max,val,"text","inputText1",step);
    let mid = (min + max) / 2;
    console.log("knob");
    console.log(knob);


    inputr.oninput = function () {
        inputText.value = this.value;
        knob.childNodes[1].setAttribute("transform", `rotate(${(this.value-mid)/mid*135} 20 20)`);
        obj[objVal] = this.value;

    }
    inputText.oninput = function () {
        inputText.value = parseFloat(Val.value) < min ? min : inputText.value;
        inputText.value = parseFloat(Val.value) > max ? max : inputText.value;
        inputText.value = this.value;
        knob.childNodes[1].setAttribute("transform", `rotate(${( this.value-mid)/mid*135} 20 20)`);
        obj[objVal] = this.value;

    }
    let divf = document.createElement( "div");
    divf.className = "KnobDiv";
   
    divf.append(inputr);
    divf.append(inputText);
    divf.append(knob);
    return divf;
}



    constructor(...elemets) {
        console.log("бляяя");
        console.log(elemets[0]);
        console.log(elemets[1]);
        console.log(elemets[2]);
    }

    setblock(persants) {

        if (persants >= 100) {
            //unblock
            this.blocked = false;
        }
        else {
            if (this.blocked === false) {
                this.blocked = true;
            //ставим  окно блокируем
            }

            //ставим проценты на окно
        }


    }



}