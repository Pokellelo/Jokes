document.addEventListener("mousemove", function (e) {
  let ele = document.elementFromPoint(e.pageX, e.pageY);

  if (!ele) return;

  if (ele.getAttribute("class") == "chaseable pet") {
    const r_top = Math.floor(Math.random() * innerHeight);
    const r_left = Math.floor(Math.random() * innerWidth);

    if (
      Math.abs(ele.style.top.slice(0, -2) - r_top) +
        Math.abs(ele.style.left.slice(0, -2) - r_left) >=
      100
    )
      ele.style.transition = " all 1s"; //basic time animation
    else ele.style.transition = " all 0.5s";

    ele.style.top = r_top + "px";
    ele.style.left = r_left + "px";
  }
});

const createPet = (pet = "🐄", x = 50, y = 50) => {
  let s = document.createElement("span");
  s.setAttribute("class", "chaseable pet");

  s.style.left = x + "PX";
  s.style.top = y + "px";
  s.innerText = pet;
  return s;
};

let d = document.getElementById("canva");


["🐄", "🐄", "🦎", "🐏", "🦖"].forEach(e => {
  const r_top = Math.floor(Math.random() * innerHeight);
    const r_left = Math.floor(Math.random() * innerWidth);

    d.appendChild(createPet(e, r_top, r_left));
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
