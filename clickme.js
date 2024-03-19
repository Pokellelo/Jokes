let frecuency = 1000
let currency =  0
let incrementCurrency = 1

function upgrade(element){
    if(currency - 10 < 0) return

element.children[0].innerText

    increment = parseFloat(element.children[0].innerText)

    incrementCurrency += increment

    currency -= 10

    switch (element) {
        case 1:
        break;
    
        default:
        break;
    }
}




const interval = setInterval(function() {
    spawn()
  }, frecuency);

function spawn(){
    currency += incrementCurrency
    document.getElementById("bag").children[0].children[0].innerText = currency



    document.getElementById("canva").appendChild(document.createElement("span"))
}























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