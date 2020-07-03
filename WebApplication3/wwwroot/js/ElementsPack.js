export function getRId(map) {
    if (map === undefined) {
        return null;
    }
    for (; ;) {
        let id = Math.random().toString(10).substr(2, 9);

        console.log(map);
        if (!(map.has(id))) {
            return id;
        }
    }

}



export function getDragEl(name) {

    let div1 = document.createElement('div');
    div1.className = "draggEx";
    let div2 = document.createElement('div');
    div2.innerHTML = name;
    div2.style.display="none";
    div1.append(div2);
    return div1;
}
let svgpause=null;
export function getPauseSVG(name) {

    if (svgpause != null && svgpause !== undefined) return svgpause.cloneNode(true);
    else {
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

        svg.setAttribute("width", "14");
        svg.setAttribute("height", "15");
        svg.setAttribute("viewBox", "0 0 14 15");
        svg.setAttribute("fill", "none");
        svg.setAttribute("class","butIconSVG");


        let rect1 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect1.setAttribute("width", "5");
        rect1.setAttribute("height", "15");
        rect1.setAttribute("fill", "#00FF47");
        //rect1.setAttribute("y", "1");

        let rect2 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect2.setAttribute("width", "5");
        rect2.setAttribute("height", "15");
        rect2.setAttribute("x", "9");
    //    rect2.setAttribute("y", "5");
        rect2.setAttribute("fill", "#00FF47");


        svg.appendChild(rect1);
        svg.appendChild(rect2);
        svgpause=svg;
        return svg;
    }
}
let svgplay=null;
export function getPlaySVG(name) {

    if (svgplay != null && svgplay != undefined) return svgplay.cloneNode(true);
    else {

        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

        svg.setAttribute("width", "13");
        svg.setAttribute("height", "15");
        svg.setAttribute("viewBox", "0 0 13 15");
        svg.setAttribute("fill", "none");
        svg.setAttribute("class","butIconSVG");


        let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M13 7.50001L0.250001 14.8612L0.250001 0.138791L13 7.50001Z");

        path.setAttribute("fill", "#00FF47");


        svg.appendChild(path);
        svgplay=svg;
        return svg;
    }
}