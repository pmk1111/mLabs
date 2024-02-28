window.onload = function () {
  const body = document.querySelector("body");

  const nav = document.querySelector("nav");
  const logo = document.querySelector('.logo');
  const SiteTitle = document.querySelector('.title');

  const toggleList = document.querySelectorAll(".toggleSwitch");
  const toggleImg = document.querySelector(".display_mode_icon");

  const menuBtn = document.querySelector(".menu_btn");
  const menu = document.querySelector(".menu");

  const menuLink = document.querySelectorAll(".menu_container a");
  const footer = document.querySelector("footer");

  const colorSummary = document.querySelector('.color-info-summary');
  const spContainer = document.querySelector(".sp-container");
  const colorInfo = document.querySelector(".color-info");
  const colorBarInput = document.querySelectorAll(".color-val-type input");
  const colorGroup = document.querySelectorAll('.color-group');
  const colorUl = document.querySelectorAll('ul');
  const colorList = document.querySelectorAll("ul li");

  var isActive = true;
  // 다크모드
  toggleList.forEach(($toggle) => {
    $toggle.onclick = () => {
      isActive = $toggle.classList.contains("active");
      const fileNameDivs = document.querySelectorAll(".file-name-div");
      if (isActive) {
        $toggle.classList.remove("active");
        toggleImg.setAttribute("src", "/images/sun.png");
        body.classList.remove("dark");
        logo.setAttribute('src', "/images/logo_black.svg");
        SiteTitle.style.color = '#151515';
        appIcon.setAttribute('src', '/images/apps-black.svg');
        nav.classList.remove("nav_dark");

        menuBtn.classList.remove("menu_btn_dark");
        menu.classList.remove("menu_dark");
        for (item of menuLink) {
          item.classList.remove("link_dark");
        }

        footer.classList.remove("footer_dark");

        colorSummary.classList.remove('dark');
        spContainer.classList.remove("dark");
        colorInfo.classList.remove("dark");
        for(item of colorGroup){
          item.classList.remove('dark');
        }
        for (item of colorBarInput) {
          item.classList.remove("dark");
        }
        for(item of colorUl){
          item.classList.remove('dark');
        }
        for (item of colorList) {
          item.classList.remove("dark");
        }
      } else {
        $toggle.classList.add("active");
        toggleImg.setAttribute("src", "/images/moon.png");
        body.classList.add("dark");
        logo.setAttribute('src', "/images/logo_white.svg");
        SiteTitle.style.color = 'white';
        appIcon.setAttribute('src', '/images/apps-white.svg');
        nav.classList.add("nav_dark");

        menuBtn.classList.add("menu_btn_dark");
        menu.classList.add("menu_dark");
        for (item of menuLink) {
          item.classList.add("link_dark");
        }

        footer.classList.add("footer_dark");

        colorSummary.classList.add('dark');
        spContainer.classList.add("dark");
        colorInfo.classList.add("dark");
        for(item of colorGroup){
          item.classList.add('dark');
        }
        for (item of colorBarInput) {
          item.classList.add("dark");
        }
        for(item of colorUl){
          item.classList.add('dark');
        }
        for (item of colorList) {
          item.classList.add("dark");
        }
      }
    };
  });
};
const hexVal = document.querySelector(".hex");
const rVal = document.querySelector(".r");
const gVal = document.querySelector(".g");
const bVal = document.querySelector(".b");
const hVal = document.querySelector(".h");
const sVal = document.querySelector(".s");
const lVal = document.querySelector(".l");

$(document).ready(function () {
  $(".selected-color").css("background-color", $(".sp-input").val() + "");
  $(".selected-color").css("border-color", $(".sp-input").val() + "");
});
const selectedColor = document.querySelector(".selected-color");
$("#color-picker").spectrum({
  type: "flat",
  preferredFormat: "hex",
  togglePaletteOnly: false,
  showInput: true,
  showInitial: true,
  showButtons: false,
  showPalette: false,
  showInitial: true,
});

$("#color-picker").on("move.spectrum", function (e, tinycolor) {
  const hex = tinycolor.toHex();
  const rgb = hexColorToRGB("#" + hex);
  const rgba = tinycolor.toRgb();
  const hsl = rgbToHSL(rgb);

  const colorNow = document.querySelector('.color-now');
  const hexText = document.querySelector('.hex-text');
  const rgbText = document.querySelector('.rgb-text');
  const hslText = document.querySelector('.hsl-text');

  selectedColor.style.backgroundColor = "#" + hex;
  selectedColor.style.borderColor = "#" + hex;

  hexVal.value = hex;
  rVal.value = rgb[0];
  gVal.value = rgb[1];
  bVal.value = rgb[2];
  hVal.value = hsl[0];
  sVal.value = hsl[1];
  lVal.value = hsl[2];

  colorNow.style.backgroundColor = "#" + hex;
  hexText.textContent = "#" + hex;
  rgbText.textContent = "rgb(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ")";
  hslText.textContent = "hsl(" + hsl[0] + ", " + hsl[1] + "%, " + hsl[2] + "%)";
});

function hexColorToRGB(hexColor) {
  const rgb = hexColor.startsWith("#") ? hexColor.slice(1) : hexColor;
  const result = [rgb.slice(0, 2), rgb.slice(2, 4), rgb.slice(4, 6)].map(
    (hex) => Number.parseInt(hex, 16)
  );

  return result;
}

function rgbToHSL(rgb) {
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;

  const cMax = Math.max(r, g, b);
  const cMin = Math.min(r, g, b);
  const delta = cMax - cMin;

  let h = 0;
  let s = 0;
  let l = (cMax + cMin) / 2;

  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));

    switch (cMax) {
      case r:
        h = ((g - b) / delta + (g < b ? 6 : 0)) % 6;
        break;
      case g:
        h = ((b - r) / delta + 2) % 6;
        break;
      case b:
        h = ((r - g) / delta + 4) % 6;
        break;
    }

    h = Math.round(h * 60);
    s = Math.round(s * 100);
  }

  l = Math.round(l * 100);

  return [h, s, l];
}

hexVal.addEventListener("change", function () {
  const newVal = document.querySelector(".hex").value;
  const inputVal = document.querySelector(".sp-input");
  inputVal.value = "#" + newVal;

  // input 이벤트를 발생시킴
  var inputEvent = new Event("change");
  inputVal.dispatchEvent(inputEvent);
});

function rgbChange() {
  const r = document.querySelector(".r").value;
  const g = document.querySelector(".g").value;
  const b = document.querySelector(".b").value;
  const inputVal = document.querySelector(".sp-input");

  inputVal.value = "rgb(" + r + ", " + g + ", " + b + ")";
  var inputEvent = new Event("change");
  inputVal.dispatchEvent(inputEvent);
}

function hslChange() {
  const h = document.querySelector(".h").value;
  const s = document.querySelector(".s").value;
  const l = document.querySelector(".l").value;
  const inputVal = document.querySelector(".sp-input");

  inputVal.value = "hsl(" + h + ", " + s + ", " + l + ")";
  var inputEvent = new Event("change");
  inputVal.dispatchEvent(inputEvent);
}

function copy(e){
  var colorInfo = event.currentTarget.querySelector('span').textContent;

  var textarea = document.createElement("textarea");
  textarea.value = colorInfo;
  document.body.appendChild(textarea);

  // textarea를 선택하고 복사 명령을 수행합니다.
  textarea.select();
  document.execCommand('copy');

  // 생성한 textarea 엘리먼트를 제거합니다.
  document.body.removeChild(textarea);

  alert("텍스트가 복사되었습니다: " + colorInfo);
}