const body = document.querySelector("body");
const nav = document.querySelector("nav");
const logoImg = document.querySelector(".logo");
const title = document.querySelector(".title");
const apps = document.querySelector(".app-icon");
const toggleList = document.querySelectorAll(".toggleSwitch");
const toggleImg = document.querySelector(".display_mode_icon");
const menuBtn = document.querySelector(".menu_btn");
const menu = document.querySelector(".menu");
const menuLink = document.querySelectorAll(".menu_container a");
const footer = document.querySelector("footer");

const ul = document.querySelector(".all-result-container ul");
const liFirstDiv = document.querySelectorAll(".all-result-container ul li > div:nth-child(1)");
const diceBox = document.querySelector("#diceBox");
const label = document.querySelector(".label");
const options = document.querySelectorAll(".optionItem");
const selectBox = document.querySelector(".selectBox2");
const optionList = document.querySelector(".optionList");
const optionItems = document.querySelectorAll(".selectBox2 .optionItem");

var isActive = true;
// 다크모드
toggleList.forEach(($toggle) => {
  $toggle.onclick = () => {
    const li = document.querySelectorAll(".all-result-container ul li");
    const liFirstDiv = document.querySelectorAll(
      ".all-result-container > ul > li > div:nth-child(1)"
    );
    const dice = document.querySelectorAll(
      "#diceBox > .dice_wrap > [class^=dice] .dice > div"
    );
    isActive = $toggle.classList.contains("active");
    if (isActive) {
      $toggle.classList.remove("active");
      toggleImg.setAttribute("src", "/images/sun.png");
      body.classList.remove("dark");

      nav.classList.remove("nav_dark");
      logoImg.setAttribute("src", "/images/logo_black.svg");
      title.style.color = "black";
      apps.setAttribute("src", "images/apps-black.svg");

      menuBtn.classList.remove("menu_btn_dark");
      menu.classList.remove("menu_dark");
      for (item of menuLink) {
        item.classList.remove("link_dark");
      }
      footer.classList.remove("footer_dark");

      ul.classList.remove("dark");
      for (i of li) {
        i.classList.remove("dark");
      }
      for (i of liFirstDiv) {
        i.classList.remove("dark");
      }

      diceBox.classList.remove("dark");
      for (i of dice) {
        i.classList.remove("dark");
      }
      label.classList.remove("dark");
      selectBox.classList.remove("dark");
      optionList.classList.remove("dark");
      for (i of optionItems) {
        i.classList.remove("dark");
      }
    } else {
      $toggle.classList.add("active");
      toggleImg.setAttribute("src", "/images/moon.png");
      body.classList.add("dark");

      nav.classList.add("nav_dark");
      logoImg.setAttribute("src", "/images/logo_white.svg");
      title.style.color = "white";
      apps.setAttribute("src", "images/apps-white.svg");

      menuBtn.classList.add("menu_btn_dark");
      menu.classList.add("menu_dark");
      for (item of menuLink) {
        item.classList.add("link_dark");
      }
      footer.classList.add("footer_dark");

      ul.classList.add("dark");
      for (i of li) {
        i.classList.add("dark");
      }
      for (i of liFirstDiv) {
        i.classList.add("dark");
      }

      diceBox.classList.add("dark");
      for (i of dice) {
        i.classList.add("dark");
      }
      label.classList.add("dark");
      selectBox.classList.add("dark");
      optionList.classList.add("dark");
      for (i of optionItems) {
        i.classList.add("dark");
      }
    }
  };
});

var dice = document.querySelectorAll(".dice");
var dice_width = dice[0].clientWidth;
var face1 = document.querySelectorAll(".face1");
var face2 = document.querySelectorAll(".face2");
var face3 = document.querySelectorAll(".face3");
var face4 = document.querySelectorAll(".face4");
var face5 = document.querySelectorAll(".face5");
var face6 = document.querySelectorAll(".face6");
var count = 0;
function DiceResizing() {
  Array.prototype.forEach.call(face1, function (item) {
    item.style.transform = "rotateY(0deg) translateZ(" + dice_width / 2 + "px)";
  });
  Array.prototype.forEach.call(face2, function (item) {
    item.style.transform =
      "rotateY(90deg) translateZ(" + dice_width / 2 + "px)";
  });
  Array.prototype.forEach.call(face3, function (item) {
    item.style.transform =
      "rotateX(90deg) translateZ(" + dice_width / 2 + "px)";
  });
  Array.prototype.forEach.call(face4, function (item) {
    item.style.transform =
      "rotateX(270deg) translateZ(" + dice_width / 2 + "px)";
  });
  Array.prototype.forEach.call(face5, function (item) {
    item.style.transform =
      "rotateY(270deg) translateZ(" + dice_width / 2 + "px)";
  });
  Array.prototype.forEach.call(face6, function (item) {
    item.style.transform =
      "rotateY(180deg) translateZ(" + dice_width / 2 + "px)";
  });
}

DiceResizing();

window.onresize = function () {
  dice_width = dice[0].clientWidth;
  DiceResizing();
};

var RandomNumber = function () {
  return "face" + (Math.floor(Math.random() * 6) + 1);
};
function rolling() {
  let sum = 0;
  let arr = [];
  for (i of dice) {
    i.classList.add(RandomNumber());
  }
  let dice = document.querySelectorAll(".dice");
  for (i of dice) {
    let thisClassName = i.className;
    sum += parseInt(thisClassName.slice(9, 10));
  }
  document.querySelector(".sum h2 span").textContent = sum;
}

function rolling(selectedDice) {
  let sum = 0;
  let arr = [];
  for (i of selectedDice) {
    i.classList.add(RandomNumber());
  }
  let dice = document.querySelectorAll(".dice");
  for (i of dice) {
    let thisClassName = i.className;
    sum += parseInt(thisClassName.slice(9, 10));
  }
  document.querySelector(".sum h2 span").textContent = sum;
  createTotal(sum);
}

function createTotal(sum) {
  count++;
  let ul = document.querySelector(".all-result-container ul");
  let li = document.createElement("li");
  let cnt = document.createElement("div");
  let val = document.createElement("div");

  if (!isActive) {
    li.classList.add("dark");
    cnt.classList.add("dark");
  }

  cnt.classList.add("cnt");
  val.classList.add("val");

  cnt.textContent = count;
  val.textContent = sum;

  li.appendChild(cnt);
  li.appendChild(val);
  ul.appendChild(li);
}

// 주사위 굴리기
var btnRolling = document.querySelector("#btnRolling");
btnRolling.onclick = function () {
  let selectedDice = document.querySelectorAll(".dice");

  for (i of selectedDice) {
    i.classList.value = "dice";
  }
  rolling(selectedDice);
};

// custom select

const handleSelect = (item) => {
  label.parentNode.classList.remove("active");
  label.innerHTML = item.textContent;

  let diceWrap = document.querySelector(".dice_wrap");
  diceWrap.innerHTML = "";
  switch (item.textContent) {
    case "1":
      createDice(1);
      break;
    case "2":
      createDice(2);
      break;
  }
  let dice = document.querySelectorAll(".dice");
  let dice_width = dice[0].clientWidth;
  let face1 = document.querySelectorAll(".face1");
  let face2 = document.querySelectorAll(".face2");
  let face3 = document.querySelectorAll(".face3");
  let face4 = document.querySelectorAll(".face4");
  let face5 = document.querySelectorAll(".face5");
  let face6 = document.querySelectorAll(".face6");
  Array.prototype.forEach.call(face1, function (item) {
    item.style.transform = "rotateY(0deg) translateZ(" + dice_width / 2 + "px)";
  });
  Array.prototype.forEach.call(face2, function (item) {
    item.style.transform =
      "rotateY(90deg) translateZ(" + dice_width / 2 + "px)";
  });
  Array.prototype.forEach.call(face3, function (item) {
    item.style.transform =
      "rotateX(90deg) translateZ(" + dice_width / 2 + "px)";
  });
  Array.prototype.forEach.call(face4, function (item) {
    item.style.transform =
      "rotateX(270deg) translateZ(" + dice_width / 2 + "px)";
  });
  Array.prototype.forEach.call(face5, function (item) {
    item.style.transform =
      "rotateY(270deg) translateZ(" + dice_width / 2 + "px)";
  });
  Array.prototype.forEach.call(face6, function (item) {
    item.style.transform =
      "rotateY(180deg) translateZ(" + dice_width / 2 + "px)";
  });
};
options.forEach((option) => {
  option.addEventListener("click", () => handleSelect(option));
});

label.addEventListener("click", () => {
  if (label.parentNode.classList.contains("active")) {
    label.parentNode.classList.remove("active");
  } else {
    label.parentNode.classList.add("active");
  }
});

function createDice(num) {
  let diceWrapper = document.querySelector(".dice_wrap");
  let diceCnt = 1;
  for (let i = 0; i < num; i++) {
    //dice div
    const dice = document.createElement("div");
    dice.classList.add("dice0" + diceCnt);
    diceCnt++;

    //dice_inner div
    const diceInner = document.createElement("div");
    diceInner.classList.add("dice_inner");

    //dice item wrapper div
    const diceItemWrap = document.createElement("div");
    diceItemWrap.classList.add("dice");

    for (let i = 1; i <= 6; i++) {
      const diceNum = document.createElement("div");
      diceNum.classList.add("face" + i);
      diceNum.classList.add("face");
      diceNum.textContent = i;
      if (!isActive) {
        diceNum.classList.add("dark");
      }

      diceItemWrap.appendChild(diceNum);
    }
    diceInner.appendChild(diceItemWrap);
    dice.appendChild(diceInner);
    diceWrapper.appendChild(dice);
  }
}
