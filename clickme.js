let frecuency = 500
let currency =  0
let incrementCurrency = 1
let interval = setInterval(spawn, frecuency);
let costMax = 0, costMin = 10000000;
let menu = [
  {id: 1, label:'Currency 1', increment: 1, cost: 10, costIncrement: 1.5, upgradedTimes:0, upgradeMax: 50},
  {id: 2, label:'Currency 2', increment: 1, cost: 5, costIncrement: 1.5, upgradedTimes:0, upgradeMax: 50},
  {id: 3, label:'Currency 3', increment: 1, cost: 30, costIncrement: 1.5, upgradedTimes:0, upgradeMax: 50},
  {id: 4, label:'Currency 4', increment: 1, cost: 10, costIncrement: 1.5, upgradedTimes:0, upgradeMax: 50},
  {id: 5, label:'Velocity', increment: 1, cost: 20, costIncrement: 2, upgradedTimes:0, upgradeMax: 50}
]

const costHashMap = new Map(); //To check cost, so we don't have to foreach the menus everytime

function upgrade(element){
    if(currency - 10 < 0) return

    increment = parseFloat(element.children[0].innerText)
    incrementCurrency += increment
    document.getElementById("bag").children[1].children[0].innerText = incrementCurrency

    //resetInverval()

    currency -= 10

    
    switch (element) {
        case 1:
        break;
    
        default:
        break;
    }
}


function reduceInverval(reduce){
  frecuency-= 100
  clearInterval(interval)
  interval = setInterval(spawn, frecuency);
}


function spawn(){

    currency += incrementCurrency
    document.getElementById("bag").children[0].children[0].innerText = currency


  //for (let index = 0; index < incrementCurrency; index++) {
    document.getElementById("canva").appendChild(document.createElement("span"))

  //}
  if(currency >= costMin){
    
    let indexs = costHashMap.get(costMin)


    indexs.forEach(i => {
      
      document.getElementById("option-" + i).removeAttribute("disabled")

    });

    costHashMap.delete(costMin)
    setMaxandMin()

  }
  
}







 
const createOptions = () => {
  
  
  menu.forEach((element, index) => {

    let val = costHashMap.get(element.cost)

    if(!val){
      costHashMap.set(element.cost, [index]);
    }else{
      val.push(index)
      costHashMap.set(element.cost, val);
    }
    


    let bt = document.createElement("button")
    bt.setAttribute("onclick", "upgrade(this)")
    bt.setAttribute("class", "menu-btn")
    bt.setAttribute("id", "option-" +index)
    bt.setAttribute("menuindex", index)

    bt.setAttribute("disabled", "disabled")

    bt.innerText = element.label

    document.getElementById("menu-body").children[0].appendChild(bt)
    setMaxandMin()
  });
 
}
createOptions()


function setMaxandMin(){
  const a = costHashMap.keys().toArray()
  costMin = Math.min(...a)
  costMax = Math.max(...a)
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