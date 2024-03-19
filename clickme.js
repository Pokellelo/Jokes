let frecuency = 500
let currency =  0
let incrementCurrency = 1
let interval = setInterval(spawn, frecuency);

function upgrade(element){
    if(currency - 10 < 0) return

    increment = parseFloat(element.children[0].innerText)
    incrementCurrency += increment
    document.getElementById("bag").children[1].children[0].innerText = incrementCurrency

    //frecuency-= 100
    //resetInverval()

    currency -= 10

    switch (element) {
        case 1:
        break;
    
        default:
        break;
    }
}


function resetInverval(){
  clearInterval(interval)
  interval = setInterval(spawn, frecuency);
}


function spawn(){

    currency += incrementCurrency
    document.getElementById("bag").children[0].children[0].innerText = currency


  //for (let index = 0; index < incrementCurrency; index++) {
    document.getElementById("canva").appendChild(document.createElement("span"))

  //}
}




 let menu = [
  {id: 1, label:'Currency', increment: 1, cost: 10},
  {id: 1, label:'Velocity', increment: 1, cost: 100}
 ]


 
const createOptions = () => {
  
  
  menu.forEach((element, index) => {
    let li = document.createElement("li")
    li.setAttribute("onclick", "upgrade(this)")
    li.setAttribute("id", index)
    li.innerText = element.label

    document.getElementById("menu-body").children[0].appendChild(li)

  });
  
}
createOptions()
















// Make the DIV element draggable:
dragElement(document.getElementById("menu"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }










}