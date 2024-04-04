const colorClasses = ["bg-c-blue", "bg-c-blue", "bg-c-blue", "bg-c-orange"]; //75% - 30%
const emojis = ["🐻", "🐸", "🦖", "🐙"]; //25%

const local = getLocalStorage("vars");
let vars = local
  ? local
  : {
      frecuency: 500,
      currency: 0,
      incrementCurrency: 1,
      randomPickableMax: 100,
      randomPickableCurrency: 200,
      interval: undefined,
      costMax: 0,
      costMin: 10000000,
      menu: [
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
          costIncrement: 2.5,
          upgradedTimes: 0,
          upgradeMax: 10,
        },
        {
          id: 5,
          label: "Test",
          increment: 1,
          cost: 20,
          costIncrement: 3,
          upgradedTimes: 0,
          upgradeMax: 50,
        },
      ],
    };
vars.interval = setInterval(spawn, vars.frecuency);

const costHashMap = new Map(); //To check cost, so we don't have to foreach the menus everytime

function upgrade(element) {
  let index = parseInt(element.getAttribute("menuindex"));

  vars.currency -= vars.menu[index].cost;

  vars.menu[index].upgradedTimes++;
  vars.menu[index].cost *= vars.menu[index].costIncrement;

  setCost(vars.menu[index].cost, index, true);

  //resetInverval()

  switch (index) {
    case 0:
      vars.incrementCurrency++;
      break;
    case 1:
      reduceInverval();
      break;

    case 2:
      vars.randomPickableMax--;
      break;

    case 3:
      vars.randomPickableCurrency += vars.randomPickableCurrency * 0.5;
      break;

    default:
      break;
  }

  setLocalStorage("vars", vars);
}

function createPickleable() {
  //ADD some animations and ways to encourage the player to click it

  const r_top = Math.floor(Math.random() * innerHeight) + "px";
  const r_left = Math.floor(Math.random() * innerWidth) + "px";

  let s = document.createElement("span");
  s.setAttribute("class", "pickable");
  s.setAttribute("onclick", "pickPickeable(this)");
  s.style.top = r_top;
  s.style.left = r_left;

  s.innerText = "⭐";
  let body = document.body;

  body.appendChild(s);
}

function pickPickeable(e) {
  e.remove();
  vars.currency += vars.randomPickableCurrency;
}

function reduceInverval(reduce = 10) {
  vars.frecuency -= reduce;
  clearInterval(vars.interval);
  vars.interval = setInterval(spawn, vars.frecuency);
}

const createBlock = (cclass = null, text = null) => {
  let b = document.createElement("span");
      
  if (!cclass)
    cclass = colorClasses[Math.floor(Math.random() * colorClasses.length)]; 
  b.setAttribute("class", cclass);

  if (!text)
    text = emojis[Math.floor(Math.random() * emojis.length)];

  b.innerText = text;

  return b;
};

function spawn() {
  vars.currency += vars.incrementCurrency;
  document.getElementById("bag").children[0].children[0].innerText =
    vars.currency.toFixed(2);

  for (let index = 0; index < vars.incrementCurrency; index++) {
    document.getElementById("canva").appendChild(createBlock());

    if (vars.currency >= vars.costMin) enableMenuOptions();
  }

  if (Math.floor(Math.random() * vars.randomPickableMax) == 1)
    createPickleable();
}

const enableMenuOptions = () => {
  let indexs = costHashMap.get(vars.costMin);
  indexs.forEach((i) => {
    if (vars.menu[i].upgradedTimes < vars.menu[i].upgradeMax) {
      document.getElementById("option-" + i).removeAttribute("disabled");
    }
  });

  costHashMap.delete(vars.costMin);
  setMaxandMin();
};

//All Evalua todos los elementos del menú
const setCost = (cost, index, all = false) => {
  const menu2 = all ? vars.menu : [{ cost: cost, index: index }];

  menu2.forEach((e, i) => {
    const index = all ? i : e.index;
    let val = costHashMap.get(e.cost);

    if (!val) {
      costHashMap.set(e.cost, [index]);
    } else {
      val.push(index);
      costHashMap.set(e.cost, val);
    }

    if (vars.currency < e.cost) {
      document
        .getElementById("option-" + index)
        .setAttribute("disabled", "disabled");
    }

    let d = document.getElementById("menu-div-" + index);
    d.children[1].innerText = vars.menu[index].upgradedTimes;

    d.children[3].innerText = vars.menu[index].cost.toFixed(2);
  });

  setMaxandMin();
};

const createOptions = () => {
  vars.menu.forEach((element, index) => {
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
  const a = [ ...costHashMap.keys()];
  vars.costMin = Math.min(...a);
  vars.costMax = Math.max(...a);
}

// Make the DIV element draggable:
dragElement(document.getElementById("menu"));

function dragElement(elmnt) {
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

/* Local Storage */
function getLocalStorage(name) {
  return JSON.parse(localStorage.getItem(name));
}

const setLocalStorage = (name, value) => {
  localStorage.setItem(name, JSON.stringify(value));
};

const clearLocalStorage = () => {
  localStorage.clear();
  location.reload();
};
