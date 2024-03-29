const colorClasses = ["c-blue", "c-blue", "c-blue", "c-orange"]; //75% - 30%

let frecuency = 500;
let currency = 0;
let incrementCurrency = 1;
let randomPickableMax = 2;
let randomPickableCurrency = 200;

let interval = setInterval(spawn, frecuency);
let costMax = 0;
let costMin = 10000000;
let menu = [
  {
    id: 1,
    label: "Currency",
    increment: 1,
    cost: 10,
    costIncrement: 1.5,
    upgradedTimes: 0,
    upgradeMax: 30,
  },
  {
    id: 2,
    label: "Velocity",
    increment: 1,
    cost: 5,
    costIncrement: 1.5,
    upgradedTimes: 0,
    upgradeMax: 50,
  },
  {
    id: 3,
    label: "Pickable",
    increment: 1,
    cost: 30,
    costIncrement: 1.5,
    upgradedTimes: 0,
    upgradeMax: 50,
  },
  {
    id: 4,
    label: "Pickable value",
    increment: 1,
    cost: 10,
    costIncrement: 1.5,
    upgradedTimes: 0,
    upgradeMax: 50,
  },
  {
    id: 5,
    label: "Test",
    increment: 1,
    cost: 20,
    costIncrement: 2,
    upgradedTimes: 0,
    upgradeMax: 50,
  },
];

const costHashMap = new Map(); //To check cost, so we don't have to foreach the menus everytime

function upgrade(element) {
  setCookie("currency", currency)
  let index = parseInt(element.getAttribute("menuindex"));

  currency -= menu[index].cost;

  menu[index].upgradedTimes++;
  menu[index].cost *= menu[index].costIncrement;

  setCost(menu[index].cost, index, true);

  //resetInverval()

  switch (index) {
    case 0:
      incrementCurrency++;
      break;
    case 1:
      reduceInverval();
      break;

    case 2:
      randomPickableMax--;
      break;

    case 3:
      randomPickableCurrency += randomPickableCurrency * 0.5;
      break;

    default:
      break;
  }
}

function createPickleable() {
  //ADD some animations and ways to encourage the player to click it
  
  
  const r_top = Math.floor(Math.random() * 500);
  const r_left = Math.floor(Math.random() * 500);

  
  let s = document.createElement("span");
  s.setAttribute("class", "pickable");
  s.setAttribute("onclick", "pickPickeable(this)");
  s.setAttribute("style", "(this)");
  s.style.top = r_top
  s.style.left = r_left

  s.innerText = "⭐";
  let body = document.body;

  body.appendChild(s);
}

function pickPickeable(e) {
  e.remove();
  currency += randomPickableCurrency;
}

function reduceInverval(reduce = 10) {
  frecuency -= reduce;
  clearInterval(interval);
  interval = setInterval(spawn, frecuency);
}

const createBlock = (color = null) => {
  let b = document.createElement("span");

  if (!color)
    color = colorClasses[Math.floor(Math.random() * colorClasses.length)];

  b.setAttribute("class", color);
  return b;
};

function spawn() {
  currency += incrementCurrency;
  document.getElementById("bag").children[0].children[0].innerText =
    currency.toFixed(2);

  for (let index = 0; index < incrementCurrency; index++) {
    document.getElementById("canva").appendChild(createBlock());

    if (currency >= costMin) enableMenuOptions();
  }

  if (Math.floor(Math.random() * randomPickableMax) == 1) createPickleable();
}

const enableMenuOptions = () => {
  let indexs = costHashMap.get(costMin);
  indexs.forEach((i) => {
    if (menu[i].upgradedTimes < menu[i].upgradeMax) {
      document.getElementById("option-" + i).removeAttribute("disabled");
    }
  });

  costHashMap.delete(costMin);
  setMaxandMin();
};

//All Evalua todos los elementos del menú
const setCost = (cost, index, all = false) => {
  const menu2 = all ? menu : [{ cost: cost, index: index }];

  menu2.forEach((e, i) => {
    const index = all ? i : e.index;
    let val = costHashMap.get(e.cost);

    if (!val) {
      costHashMap.set(e.cost, [index]);
    } else {
      val.push(index);
      costHashMap.set(e.cost, val);
    }

    if (currency < e.cost) {
      document
        .getElementById("option-" + index)
        .setAttribute("disabled", "disabled");
    }

    let d = document.getElementById("menu-div-" + index);
    d.children[1].innerText = menu[index].upgradedTimes;

    d.children[3].innerText = menu[index].cost.toFixed(2);
  });

  setMaxandMin();
};

const createOptions = () => {
  menu.forEach((element, index) => {
    let d = document.createElement("div");
    d.setAttribute("id", "menu-div-" + index);
    d.setAttribute("class", "menu-div");

    let s = document.createElement("span");
    s.innerText = " | ";

    let s_cost = document.createElement("span");

    let bt = document.createElement("button");
    bt.setAttribute("onclick", "upgrade(this)");
    bt.setAttribute("class", "menu-btn");
    bt.setAttribute("id", "option-" + index);
    bt.setAttribute("menuindex", index);
    bt.innerText = element.label + " + ";

    d.appendChild(bt);
    d.appendChild(document.createElement("span"));
    d.appendChild(s);
    d.appendChild(document.createElement("span"));

    document.getElementById("menu-body").children[0].appendChild(d);

    setCost(element.cost, index);
  });
};
createOptions();

function setMaxandMin() {
  const a = costHashMap.keys().toArray();
  costMin = Math.min(...a);
  costMax = Math.max(...a);
}

// Make the DIV element draggable:
dragElement(document.getElementById("menu"));

function dragElement(elmnt) {
  getCookie("currency")
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

/* Cookies */

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

const setCookie = (name, value) => {
  document.cookie = name + "=" + value + ";" + "path=/";
};
