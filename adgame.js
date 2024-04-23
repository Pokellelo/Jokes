let data = {
  positionX: 50,
  positionY: 50,
  level: 1,
  size: 20,
  movement: 10,
  classData: {
    classes: ["character"],
    class_name() {
      let classes = "";
      this.classes.forEach((c) => {
        classes += " " + c;
      });
      return classes;
    },
  },
};

const b = document.body;
const levelD = document.getElementById("levelDisplay");
const movement = (e) => {
  let key = e.code.slice(3).toLowerCase();
  let pos = 0;
  switch (key) {
    case "s":
    case "d":
      pos += data.movement;
      break;

    case "a":
    case "w":
      pos -= data.movement;
      break;

    default:
      break;
  }

  if (["s", "d", "a", "w"].includes(key)) {
    const direction = ["w", "s"].includes(key) ? "top" : "left";
    const dir = direction === "top" ? "positionX" : "positionY";

    data[dir] += pos;
    pj.style[direction] = data[dir] + "px";
  }
};
const setLevel = (level, increment = true) => {
  data.level = increment ? parseInt(level) + data.level : level;
  levelD.innerText = data.level;
};

function init() {
  pj = document.createElement("span");

  pj.style.top = data.positionY + "px";
  pj.style.left = data.positionX + "px";
  pj.style.fontSize = data.size + "px";
  pj.innerText = "🐊";
  pj.className = data.classData.class_name();
  b.append(pj);
  pj = this.pj;
  setLevel(data.level, false)
  b.addEventListener("keydown", movement);
}

init();
