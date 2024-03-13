const body = document.querySelector("body");
const nav = document.querySelector("nav");
const logoImg = document.querySelector('.logo');
const title = document.querySelector('.title');
const apps = document.querySelector('.app-icon');
const toggleList = document.querySelectorAll(".toggleSwitch");
const toggleImg = document.querySelector(".display_mode_icon");
const menuBtn = document.querySelector(".menu_btn");
const menu = document.querySelector(".menu");
const menuLink = document.querySelectorAll(".menu_container a");
const footer = document.querySelector("footer");

const switchBtn = document.querySelector(".switch-btn");
const calBtn = document.querySelector(".cal-btn");
const clearBtn = document.querySelector(".clear");
const textAreas = document.querySelectorAll('textarea');
const btns = document.querySelectorAll(".btn-container button");
const radioLabels = document.querySelectorAll('input[type="radio"] + label');

var isActive = true;
// 다크모드
toggleList.forEach(($toggle) => {
  $toggle.onclick = () => {

    isActive = $toggle.classList.contains("active");
    const fileNameDivs = document.querySelectorAll('.file-name-div');
    if (isActive) {
      $toggle.classList.remove("active");
      toggleImg.setAttribute("src", "/images/sun.png");
      body.classList.remove("dark");

      nav.classList.remove("nav_dark");
      logoImg.setAttribute('src', '/images/logo_black.svg');
      title.style.color = 'black';
      apps.setAttribute('src','images/apps-black.svg');

      menuBtn.classList.remove("menu_btn_dark");
      menu.classList.remove("menu_dark");
      for(item of menuLink){
        item.classList.remove("link_dark");
      }
      footer.classList.remove("footer_dark");

      for(i of radioLabels){
        i.classList.remove('dark');
      }
      for(i of textAreas){
        i.classList.remove('dark');
      }
      for(i of btns){
        i.classList.remove('dark');
      }
    } else {
      $toggle.classList.add("active");
      toggleImg.setAttribute("src", "/images/moon.png");
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
      footer.classList.add("footer_dark");

      for(i of radioLabels){
        i.classList.add('dark');
      }
      for(i of textAreas){
        i.classList.add('dark');
      }
      for(i of btns){
        i.classList.add('dark');
      }
    }
  };
});


clearBtn.addEventListener("click", function () {
  document.querySelector(".original-val").value = "";
  document.querySelector(".result-val").value = "";
});

switchBtn.addEventListener("click", function () {
  const originalBase = document
    .querySelector(
      '.original-container .base-selector-wrapper input[type="radio"]:checked'
    )
    .getAttribute("id");
  const resultBase = document
    .querySelector(
      '.result-container .base-selector-wrapper input[type="radio"]:checked'
    )
    .getAttribute("id");
  const originalTxt = document.querySelector(".original-val").value;
  const resultTxt = document.querySelector(".result-val").value;

  const originalValInputs = document.querySelectorAll(
    '.original-container .base-selector-wrapper input[type="radio"]'
  );
  const resultValInputs = document.querySelectorAll(
    '.result-container .base-selector-wrapper input[type="radio"]'
  );
  for (let i = 0; i < originalValInputs.length; i++) {
    originalValInputs[i].checked = false;
    resultValInputs[i].checked = false;
  }
  switch (originalBase) {
    case "o-2":
      document.querySelector("#r-2").checked = true;
      break;
    case "o-8":
      document.querySelector("#r-8").checked = true;
      break;
    case "o-10":
      document.querySelector("#r-10").checked = true;
      break;
    case "o-16":
      document.querySelector("#r-16").checked = true;
      break;
  }

  switch (resultBase) {
    case "r-2":
      console.log(document.querySelector("#o-2"));
      document.querySelector("#o-2").checked = true;
      break;
    case "r-8":
      document.querySelector("#o-8").checked = true;
      break;
    case "r-10":
      document.querySelector("#o-10").checked = true;
      break;
    case "r-16":
      document.querySelector("#o-16").checked = true;
      break;
  }

  document.querySelector(".original-val").value = resultTxt;
  document.querySelector(".result-val").value = originalTxt;
});

calBtn.addEventListener("click", function () {
  const originalBase = document
    .querySelector(
      '.original-container .base-selector-wrapper input[type="radio"]:checked'
    )
    .getAttribute("id");
  const resultBase = document
    .querySelector(
      '.result-container .base-selector-wrapper input[type="radio"]:checked'
    )
    .getAttribute("id");
  const originalTxt = document.querySelector(".original-val").value;
  const resultTxtArea = document.querySelector(".result-val");

  switch (originalBase) {
    case "o-2":
      switch (resultBase) {
        case "r-2":
          resultTxtArea.value = originalTxt;
          break;
        case "r-8":
          resultTxtArea.value = binaryToOctal(originalTxt);
          break;
        case "r-10":
          resultTxtArea.value = binaryToDecimal(originalTxt);
          break;
        case "r-16":
          resultTxtArea.value = binaryToHexadecimal(originalTxt);
          break;
      }
      break;
    case "o-8":
      switch (resultBase) {
        case "r-2":
          resultTxtArea.value = octalToBinary(originalTxt);
          break;
        case "r-8":
          resultTxtArea.value = originalTxt;
          break;
        case "r-10":
          resultTxtArea.value = octalToDecimal(originalTxt);
          break;
        case "r-16":
          resultTxtArea.value = octalToHexadecimal(originalTxt);
          break;
      }
      break;
    case "o-10":
      switch (resultBase) {
        case "r-2":
          resultTxtArea.value = decimalToBinary(originalTxt);
          break;
        case "r-8":
          resultTxtArea.value = decimalToOctal(originalTxt);
          break;
        case "r-10":
          resultTxtArea.value = originalTxt;
          break;
        case "r-16":
          resultTxtArea.value = decimalToHexadecimal(originalTxt);
          break;
      }
      break;
    case "o-16":
      switch (resultBase) {
        case "r-2":
          resultTxtArea.value = hexadecimalToBinary(originalTxt);
          break;
        case "r-8":
          resultTxtArea.value = hexadecimalToOctal(originalTxt);
          break;
        case "r-10":
          resultTxtArea.value = hexadecimalToDecimal(originalTxt);
          break;
        case "r-16":
          resultTxtArea.value = originalTxt;
          break;
      }
      break;
  }
});
// binary to ~~
function binaryToOctal(binary) {
  const decimal = parseInt(binary, 2);
  const octal = decimal.toString(8);
  return octal;
}
function binaryToDecimal(binary) {
  const decimal = parseInt(binary, 2);
  return decimal;
}
function binaryToHexadecimal(binary) {
  const decimal = parseInt(binary, 2);
  const hexadecimal = decimal.toString(16).toUpperCase();
  return hexadecimal;
}

//oct to ~~
function octalToBinary(octal) {
  const decimal = parseInt(octal, 8);
  const binary = decimal.toString(2);
  return binary;
}
function octalToDecimal(octal) {
  const decimal = parseInt(octal, 8);
  return decimal;
}
function octalToHexadecimal(octal) {
  const decimal = parseInt(octal, 8);
  const hexadecimal = decimal.toString(16).toUpperCase();
  return hexadecimal;
}

//demical to ~~
function decimalToBinary(decimal) {
  const binary = parseInt(decimal).toString(2);
  return binary;
}
function decimalToOctal(decimal) {
  const octal = parseInt(decimal).toString(8);
  return octal;
}
function decimalToHexadecimal(decimal) {
  const hexadecimal = parseInt(decimal).toString(16).toUpperCase();
  return hexadecimal;
}

//hexademical to ~~
function hexadecimalToBinary(hexadecimal) {
  const decimal = parseInt(hexadecimal, 16);
  const binary = decimal.toString(2);
  return binary;
}
function hexadecimalToOctal(hexadecimal) {
  const decimal = parseInt(hexadecimal, 16);
  const octal = decimal.toString(8);
  return octal;
}
function hexadecimalToDecimal(hexadecimal) {
  const decimal = parseInt(hexadecimal, 16);
  return decimal;
}
