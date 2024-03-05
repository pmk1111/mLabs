const body = document.querySelector("body");
const nav = document.querySelector("nav");
const logoImg = document.querySelector('.logo');
const title = document.querySelector('.title');
const apps = document.querySelector('.app-icon');

const toggleList = document.querySelectorAll(".toggleSwitch");
const toggleImg = document.querySelector(".display_mode_icon");

const footer = document.querySelector("footer");
const menuBtn = document.querySelector(".menu_btn");
const menu = document.querySelector(".menu");
const menuLink = document.querySelectorAll(".menu_container a");

var res = /^[0-9]*$/;
const textArea = document.querySelector(".textarea");
const calBtn = document.querySelector(".cal-btn");
const resultContainer = document.querySelector('.result-container');
const gcdP = document.querySelector(".gcd");
const lcmP = document.querySelector(".lcm");

let gcdNum;
let lcmNum;

var isActive = true;
// 다크모드
toggleList.forEach(($toggle) => {
  $toggle.onclick = () => {
    isActive = $toggle.classList.contains("active");    
    if (isActive) {
      $toggle.classList.remove("active");
      toggleImg.setAttribute("src", "/images/sun.png");
      body.classList.remove("dark");
      body.classList.add("lite");

      nav.classList.remove("nav_dark");
      logoImg.setAttribute('src', '/images/logo_black.svg');
      title.style.color = 'black';
      apps.setAttribute('src','images/apps-black.svg');
      menuBtn.classList.remove("menu_btn_dark");
      menu.classList.remove("menu_dark");
      for(item of menuLink){
        item.classList.remove("link_dark");
      }
      textArea.classList.remove('dark');
      calBtn.classList.remove('dark');
      resultContainer.classList.remove('dark');

      footer.classList.remove("footer_dark");
    } else {
      $toggle.classList.add("active");
      toggleImg.setAttribute("src", "/images/moon.png");
      body.classList.remove("lite");
      body.classList.add("dark");

      nav.classList.add("nav_dark");
      logoImg.setAttribute('src', '/images/logo_white.svg');
      title.style.color = 'white';
      apps.setAttribute('src','images/apps-white.svg');
      menuBtn.classList.add("menu_btn_dark");
      menu.classList.add("menu_dark");
      for(item of menuLink){
        item.classList.add("link_dark");
      }
      textArea.classList.add('dark');
      calBtn.classList.add('dark');
      resultContainer.classList.add('dark');

      footer.classList.add("footer_dark");
    }
  };
});

calBtn.addEventListener("click", function () {
  const arr = textArea.value.split(" ");
  let numArr = [];
  for (i of arr) {
    if (res.test(i)) {
      numArr.push(i);
    }
  }
  gcd(numArr);
  lcm(numArr);
});

function gcd(numArr) {
  let txt;
  if(numArr.length > 0 && numArr[0] !== ""){
    const calculateGCD = (a, b) => {return b === 0 ? a : calculateGCD(b, a % b);};

    let gcdResult = parseInt(numArr[0]);

    for (let i = 1; i < numArr.length; i++) {gcdResult = calculateGCD(gcdResult, parseInt(numArr[i]));}
    gcdP.textContent = "최대공약수(GCL): " + gcdResult;
    document.querySelector('.result-container span').style.display = 'none';
  } else{
    gcdP.textContent = "";
    document.querySelector('.result-container span').style.display = 'block';
  }
}

function lcm(numArr) {
  console.log(numArr[0] !== "")
  if(numArr.length > 0 && numArr[0] !== ""){
      const calculateLCM = (a, b) => {return (a * b) / calculateGCD(a, b);};
      const calculateGCD = (a, b) => {return b === 0 ? a : calculateGCD(b, a % b);};

      let lcmResult = parseInt(numArr[0]);

      for (let i = 1; i < numArr.length; i++) {lcmResult = calculateLCM(lcmResult, parseInt(numArr[i]));}

      lcmP.textContent = "최소공배수(LCM): " + lcmResult;
    } else{lcmP.textContent = "";}
  }
