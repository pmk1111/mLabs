const bodyTag = document.body;
const bodyClassList = bodyTag.classList;

const body = document.querySelector("body");
const nav = document.querySelector("nav");

const toggleList = document.querySelectorAll(".toggleSwitch");
const toggleImg = document.querySelector(".display_mode_icon");

const menuBtn = document.querySelector(".menu_btn");
const menu = document.querySelector(".menu");
const menuLink = document.querySelectorAll(".menu_container a");

const form = document.querySelector("form");
const calBtn = document.querySelectorAll(".cal_btn");
const calWriteIntpt = document.querySelector(".write_input");

const main = document.querySelector("main");
const footer = document.querySelector("footer");

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

      menuBtn.classList.remove("menu_btn_dark");
      menu.classList.remove("menu_dark");
      for(item of menuLink){
        item.classList.remove("link_dark");
      }

      nav.classList.remove("nav_dark"); 
      main.classList.remove("main_dark");

      form.classList.remove("form_dark");
      for(item of calBtn){
        item.classList.remove("cal_btn_dark");
      }
      calWriteIntpt.classList.remove("write_input_dark");

      footer.classList.remove("footer_dark");
    } else {
      $toggle.classList.add("active");
      toggleImg.setAttribute("src", "/images/moon.png");
      body.classList.remove("lite");
      body.classList.add("dark");

      menuBtn.classList.add("menu_btn_dark");
      menu.classList.add("menu_dark");
      for(item of menuLink){
        item.classList.add("link_dark");
      }

      nav.classList.add("nav_dark");
      main.classList.add("main_dark");

      form.classList.add("form_dark");
      for(item of calBtn){
        item.classList.add("cal_btn_dark");
      }
      calWriteIntpt.classList.add("write_input_dark");

      footer.classList.add("footer_dark");
    }
  };
});

// 계산 기능
var all = "";

function add(num) {
  document.getElementById("display").value += num;
}

function calculateExpression(expression) {
  // 로그 함수 및 삼각함수 처리
  if(expression.includes("log")){
      expression = expression.replace(/log\(([^)]+)\)/g, (match, p1) => `Math.log10(${p1})`);
  }
  if(expression.includes("tan")){
      expression = expression.replace(/tan\(([^)]+)\)/g, (match, p1) => `Math.tan(${p1})`);
  }
  if(expression.includes("sin")){
      expression = expression.replace(/sin\(([^)]+)\)/g, (match, p1) => `Math.sin(${p1})`);
  }
  if(expression.includes("cos")){
      expression = expression.replace(/cos\(([^)]+)\)/g, (match, p1) => `Math.cos(${p1})`);
  }
  if(expression.includes("**")) {
    expression = expression.replace(/\b(\d+)\s*\^\s*(\d+)\b/g, (match, p1, p2) => `${p1}**${p2}`);
  }
  if(expression.includes("abs")){
    expression = expression.replace(/abs\(([^)]+)\)/g, (match, p1) => `Math.abs(${p1})`);
  }
  if(expression.includes("in")){
    expression = expression.replace(/in\(([^)]+)\)/g, (match, p1) => `Math.log(${p1})`);
  }

  // 각 함수의 결과를 따로 계산하고 더하기
  const terms = expression.split('+');
  let result = 0;
  for (const term of terms) {
    result += eval(term); // eval 대신에 안전한 방법으로 계산하는 방법을 사용할 것을 권장
  }
  return result;
}

function sum() {
  let target = document.getElementById("display").value
  const result = calculateExpression(target);
  document.getElementById("display").value = result;
}

function clearDisplay() {
  document.getElementById("display").value = "";
}

function tan() {
  let target = document.getElementById("display").value
  document.getElementById("display").value = target+"tan("
  
    // 포커스를 '(' 문자 뒤에 위치시킴
  const display = document.getElementById("display");
  const position = target.lastIndexOf("(") + 1;
  display.setSelectionRange(position, position);
  display.focus();
}

function sin() {
  let target = document.getElementById("display").value
  document.getElementById("display").value = target+"sin("
  
  const display = document.getElementById("display");
  const position = target.lastIndexOf("(") + 1;
  display.setSelectionRange(position, position);
  display.focus();
}

function cos() {
  let target = document.getElementById("display").value
  document.getElementById("display").value = target+"cos("
  
  const display = document.getElementById("display");
  const position = target.lastIndexOf("(") + 1;
  display.setSelectionRange(position, position);
  display.focus();
}

function addAbs() {
  let target = document.getElementById("display").value
  document.getElementById("display").value = target+"abs("

  const display = document.getElementById("display");
  const position = target.lastIndexOf("(") + 1;
  display.setSelectionRange(position, position);
  display.focus();
}

function addPow() {
  let target = document.getElementById("display").value
  document.getElementById("display").value = target+"**"

  const display = document.getElementById("display");
  const position = target.lastIndexOf("^") + 1;
  display.setSelectionRange(position, position);
  display.focus();
}

function addLog() {
  let target = document.getElementById("display").value
  document.getElementById("display").value = target+"log(";
  
  const display = document.getElementById("display");
  const position = target.lastIndexOf("(") + 1;
  display.setSelectionRange(position, position);
  display.focus();
}

function addIn() {
  let target = document.getElementById("display").value
  document.getElementById("display").value = target+"in(";
    
  const display = document.getElementById("display");
  const position = target.lastIndexOf("(") + 1;
  display.setSelectionRange(position, position);
  display.focus();
}

const feet = 3.28084;
const inches = 39.3701;

function convertToFeet() {
  let val = document.querySelector("#display");
  const result = val.value * feet;
  val.value = result;
}
function convertToInches() {
  let val = document.querySelector("#display");
  const result = val.value * inches;
  val.value = result;
}



// common js
var isMenuOpened = false;
var isContentOpened = false;
var browserWidth = window.innerWidth;
let contentType = document.querySelectorAll(".content_type");

document.addEventListener("DOMContentLoaded", function () {
  let menuBtn = document.querySelector(".menu_btn");

  menuBtn.addEventListener("click", function () {
    let menu = document.querySelector(".menu");
    slideToggle(menu);
  });

  contentType.forEach(function(item) {
    item.addEventListener("click", function() {
      let list = item.parentNode.querySelector(".content_list");
      slideList(list);
    });
  });

});

function slideToggle(menu) {
  if (isMenuOpened) {
    menu.classList.remove("open");
    isMenuOpened = false;
  } else {
    menu.classList.add("open");
    isMenuOpened = true;
  }
}

function slideList(list){
  let span = list.parentNode.querySelector("span");
  if(isContentOpened){
    list.classList.remove("content_open");
    isContentOpened = false;
    if (window.innerWidth <= 768) {
      span.textContent = "↓";   
    }
  } else{
    list.classList.add("content_open");
    isContentOpened = true;
    if (window.innerWidth <= 768) {
      span.textContent = "↑";   
    }
  }

}

// browserWidth 변화에 따른 content arrow 추가 및 제거
function handleResize() {
    let isSpan = document.querySelector(".arrow");
    if (window.innerWidth <= 768) {
      contentType.forEach(function(item) {
        if(!isSpan){
          let arrow = document.createElement("span");
          arrow.classList.add("arrow")
          arrow.style.float = "right"
          arrow.style.paddingRight = "3px"
          arrow.textContent = "↓";   
          item.appendChild(arrow);
        }
      });
    } else{
      if(isSpan){
        contentType.forEach(function(item) {
          let arrow = item.querySelector(".arrow");
          item.removeChild(arrow);
        });
      }
    }
  }
  
    // 초기 로딩 시에도 한 번 실행
    handleResize();
    
    // 브라우저 크기가 변할 때마다 실행
    window.addEventListener("resize", handleResize);



//언어 설정 기능
// const title = document.querySelector(".title");
// const userLang = navigator.language.toLowerCase();
// const langSplit = userLang.substring(userLang.indexOf("-") + 1);
// let selectedLanguage = langSplit;

// document.addEventListener("DOMContentLoaded", function () {
//   console.log(selectedLanguage)
//   document.title = getTranslatedTitle(selectedLanguage);
//   getTranslatedDescription(selectedLanguage);
//   document.querySelector('meta[name="description"]')
//           .setAttribute("content", getTranslatedDescription(selectedLanguage));
//   title.textContent = getTranslatedContent(selectedLanguage);
// });

// function getTranslatedTitle(selectedLanguage) {
//   switch (selectedLanguage) {
//     case "ko":
//     case "kr":
//       return "공학용 계산기";
//     case "en":
//       return "Scientific Calculator";
//     case "zh":
//       return "科学计算器";
//     case "ja":
//       return "工学用計算機";
//     default:
//       return "Scientific Calculator";
//     }
//   }
  
//   function getTranslatedDescription(selectedLanguage) {
//     switch (selectedLanguage) {
//       case "ko":
//       case "kr":
//         return "간편한 공학용 계산기";
//       case "en":
//         return "An easy Scientific Calculator";
//       case "zh":
//         return "简便的科学计算器";
//       case "ja":
//         return "工学用計算機";
//       default:
//         return "An easy engineering calculator";
//     }
//   }

//   function getTranslatedContent(selectedLanguage){
//     const title = document.querySelector(".title");
//     switch (selectedLanguage) {
//       case "ko":
//       case "kr":
//         return "공학용 계산기"
//       case "en":
//         return "Scientific Calculator";
//       case "zh":
//         return "科学计算器";
//       case "ja":
//         return "工学用計算機";
//       default:
//         return "Scientific Calculator";
//     }
//   }