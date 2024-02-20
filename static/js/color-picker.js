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

  selectedColor.style.backgroundColor = "#" + hex;
  selectedColor.style.borderColor = "#" + hex;
  hexVal.value = hex;
  rVal.value = rgb[0];
  gVal.value = rgb[1];
  bVal.value = rgb[2];
  hVal.value = hsl[0];
  sVal.value = hsl[1];
  lVal.value = hsl[2];
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