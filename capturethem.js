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

let interval = setInterval(spawn, 3000);

window.onclick = function (e) {
  d.appendChild(createElement("🍡", e.x, e.y, "food"));
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
  return s;
};

["🐄", "🐄", "🦎", "🐏", "🦖"].forEach((e) => {
  const r_top = Math.floor(Math.random() * innerHeight);
  const r_left = Math.floor(Math.random() * innerWidth);

  d.appendChild(createElement(e, r_top, r_left));
});

net = document.getElementById("net");
net.addEventListener("touchmove", function (e) {
  var touchLocation = e.targetTouches[0];
  net.style.left = touchLocation.pageX + "px";
  net.style.top = touchLocation.pageY + "px";
});

net.addEventListener("touchend", function (e) {
  var x = parseInt(net.style.left);
  var y = parseInt(net.style.top);
});
dragElement(net);

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
