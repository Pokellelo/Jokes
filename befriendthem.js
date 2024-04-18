let data = {
  selected_food: "🍡",
  selected_menu_index: 0,
  map: new Map(), //nested HashMap x, y
  elements_cuantity: 0,
  setMapElement(x, y, id) {
    let new_y_hash = new Map();
    let elements = [];

    const x_hash = this.map.get(x);
    if (x_hash) {
      new_y_hash = x_hash;

      y = new_y_hash.get(y);
      if (y) elements = y;
    }
    elements.push(id);

    new_y_hash.set(y, elements);
    this.map.set(x, new_y_hash);
    this.elements_cuantity++;
  },
  getMapElements(x, y) {
    const x_hash = this.map.get(x);
    if (!x_hash) return undefined;

    const y_array = x_hash.get(y);

    return y_array;
  },
};

const movingAlgorith = (element) => {};

let menu_tab = document.getElementsByClassName("menu-tab");

let d = document.getElementById("canva");

function spawn() {
  let pets = document.getElementsByClassName("chaseable pet");

  let foods = document.getElementsByClassName("chaseable pet");

  for (let i = 0; i < pets.length; i++) {
    let ele = pets[i];

    let r_top = Math.floor(Math.random() * innerHeight);
    let r_left = Math.floor(Math.random() * innerWidth);

    ele.style.top = r_top + "px";
    ele.style.left = r_left + "px";

    let checkFood = document.elementFromPoint(r_top, r_left);

    if (checkFood && checkFood.className == "food") {
      checkFood.remove();
    }
  }
}

let interval = setInterval(spawn, 1000);

const set_food = (food) => {
  data.selected_food = food;

  const size = menu_tab[0].children.length;
  for (let i = 0; i < size; i++) {
    console.log(menu_tab[0].children[i].innerText);
    if (menu_tab[0].children[i].innerText == food) {
      menu_tab[0].children[i].className = "selected_food";
    } else {
      menu_tab[0].children[i].className = "";
    }
  }
};

const changeMenu = (ind) => {
  const menu_size = menu_tab.length - 1;
  let pointer = data.selected_menu_index + ind;

  //Circulate menu
  if (pointer > menu_size || pointer < 0) pointer = pointer < 0 ? menu_size : 0;

  console.log(pointer);
  for (let i = 0; i <= menu_size; i++) {
    menu_tab[i].className = pointer == i ? "menu-tab" : "menu-tab hidden";
  }

  data.selected_menu_index = pointer;
};

window.onclick = function (e) {
  d.appendChild(createElement(data.selected_food, e.x, e.y, "food"));
};

const createElement = (
  inner = "🐄",
  x = 50,
  y = 50,
  classes = "chaseable pet"
) => {
  let s = document.createElement("span");
  s.setAttribute("class", classes);

  s.style.left = x + "PX";
  s.style.top = y + "px";
  s.innerText = inner;

  data.setMapElement(x, y, inner + x + "," + y);
  

  return s;
};

["🐄", "🐄", "🦎", "🐏", "🦖"].forEach((e) => {
  const r_top = Math.floor(Math.random() * innerHeight);
  const r_left = Math.floor(Math.random() * innerWidth);

  d.appendChild(createElement(e, r_top, r_left));
});

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
