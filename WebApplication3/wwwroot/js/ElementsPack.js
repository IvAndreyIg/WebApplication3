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
    div1.append(div2);
    return div1;
}