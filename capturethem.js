document.addEventListener("mousemove", function (e) {
  let ele = document.elementFromPoint(e.pageX, e.pageY);

  if (ele.getAttribute("class") == "chaseable pet") {
    const r_top = Math.floor(Math.random() * innerHeight);
    const r_left = Math.floor(Math.random() * innerWidth);

    if (
      Math.abs(ele.style.top.slice(0, -2) - r_top) +
        Math.abs(ele.style.left.slice(0, -2) - r_left) >=
      100
    )
      //basic time animation
      ele.style.transition = " all 3s";
    else ele.style.transition = " all 1s";

    ele.style.top = r_top + "px";
    ele.style.left = r_left + "px";
  }
});

const createPet = (pet = "🐄", x = 0, y = 50) => {
  let s = document.createElement("span");
  s.setAttribute("class", "chaseable pet");
  s.setAttribute("id", "pet");

  s.style.left = x;
  s.style.top = y;
  s.innerText = pet;

  return s;
};

let d = document.getElementById("canva");

d.appendChild(createPet("🐄"));
