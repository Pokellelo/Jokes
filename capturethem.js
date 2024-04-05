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

d.appendChild(createPet("🐄"));
d.appendChild(createPet("🐄", 100, 500));
d.appendChild(createPet("🦎", 200, 100));
d.appendChild(createPet("🐏", 300, 150));
d.appendChild(createPet("🦖", 80, 250));