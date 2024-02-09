const formatSelect = document.querySelector("#barcode-format");
const barFormat = document.querySelectorAll("#barcode-format option");
const barTxtVisible = document.querySelectorAll(".txt-visibility");
const barWidth = document.querySelector("#set-width");
const barHeight = document.querySelector("#set-heigth");
const barTxtPos = document.querySelectorAll(".txt-position");
const barTxtAlign = document.querySelectorAll(".txt-align");
const barTxtSize = document.querySelector("#set-txt-size");
const barTxtMargin = document.querySelector("#set-txt-margin");
const barMargin = document.querySelector("#set-margin");
const barBgColor = document.querySelector("#set-bg-color");
const barLineColor = document.querySelector("#set-line-color");
const barWrap = document.querySelector(".barcode-wrap");
const barSettingWrap = document.querySelector(".barcode-setting-wrap");
const qrWrap = document.querySelector("#qrcode-wrap");
const qrSettingWrap = document.querySelector(".qr-setting-wrap");

const txtSizeValP = document.querySelector(".txt-size-val");
const txtMarginValP = document.querySelector(".txt-margin-val");
const barWidthValP = document.querySelector(".bar-width-val");
const barHeightValP = document.querySelector(".bar-height-val");
const barMarginValP = document.querySelector(".bar-margin-val");
const barBgColorValP = document.querySelector(".bar-bg-color-val");
const barLineColorValP = document.querySelector(".bar-line-color-val");

const barCodeDownloadBtn = document.querySelector("#barcode-download");
const qrDownLoadBtn = document.querySelector("#qr-download");
const qrUrlInput = document.querySelector("#qr-url");

var barTxt = document.querySelector("#barcode-txt");
barTxt.value = "Example 1234";

const body = document.querySelector("body");
const nav = document.querySelector("nav");

const toggleList = document.querySelectorAll(".toggleSwitch");
const toggleImg = document.querySelector(".display_mode_icon");

const menuBtn = document.querySelector(".menu_btn");
const menu = document.querySelector(".menu");
const menuLink = document.querySelectorAll(".menu_container a");

const spans = document.querySelectorAll(".wrapper span");
const rangeInputs = document.querySelectorAll('input[type="range"]');
const valWraps = document.querySelectorAll(".val-wrap");
const rangeWrap = document.querySelectorAll(".range-wrap");
const colorWrap = document.querySelectorAll(".color-wrap");

//const htu = document.querySelector(".how_to_use");
//const descH3 = document.querySelector(".htu_h3");
//const description = document.querySelector(".description");

const footer = document.querySelector("footer");

var isActive = true;
// 다크모드
toggleList.forEach(($toggle) => {
  $toggle.onclick = () => {
    isActive = $toggle.classList.contains("active");

    if (isActive) {
      let content = document.querySelector(".content-dark");
      let selectedContent = document.querySelector(".selected-content-dark");

      let radioWrappers = document.querySelectorAll(".radio-wrapper-dark");
      let selectedRadios = document.querySelectorAll(".selected-radio-dark");

      $toggle.classList.remove("active");
      toggleImg.setAttribute("src", "/images/sun.png");
      body.classList.remove("dark");
      body.classList.add("lite");

      menuBtn.classList.remove("menu_btn_dark");
      menu.classList.remove("menu_dark");
      for (item of menuLink) {
        item.classList.remove("link_dark");
      }

      nav.classList.remove("nav_dark");

      content.classList.remove("content-dark");
      content.classList.add("content-color");

      selectedContent.classList.remove("selected-content-dark");
      selectedContent.classList.add("selected-content");

      formatSelect.classList.remove("barcode-format-dark");
      barTxt.classList.remove("barcode-txt-dark");
			barWrap.classList.remove("barcode-wrap-dark");
			barSettingWrap.classList.remove("barcode-setting-wrap-dark");
			qrWrap.classList.remove("qr-wrap-dark");
			qrSettingWrap.classList.remove("qr-setting-wrap-dark");
			
      for (item of spans) {
        item.classList.remove("span-dark");
      }

      for (item of valWraps) {
        item.classList.remove("val-wrap-dark");
      }

      for (item of rangeInputs) {
        item.classList.remove("range_dark");
      }

      for (item of rangeWrap) {
        item.classList.remove("range-wrap-dark");
      }

      for (item of colorWrap) {
        item.classList.remove("color-wrap-dark");
      }

      for (item of radioWrappers) {
        item.classList.remove("radio-wrapper-dark");
        item.classList.add("radio-wrapper");
      }

      for (item of selectedRadios) {
        item.classList.remove("selected-radio-dark");
        item.classList.add("selected-radio");
      }

      barCodeDownloadBtn.classList.remove("download-btn-dark");
      qrDownLoadBtn.classList.remove("download-btn-dark");
      qrUrlInput.classList.remove("qr-url-dark");

      //htu.classList.remove("htu_dark");
      //descH3.classList.remove("htu_h3_dark");
      //description.classList.remove("desc_dark");

      footer.classList.remove("footer_dark");
    } else {
      let content = document.querySelector(".content-color");
      let selectedContent = document.querySelector(".selected-content");

      let radioWrappers = document.querySelectorAll(".radio-wrapper");
      let selectedRadios = document.querySelectorAll(".selected-radio");

      $toggle.classList.add("active");
      toggleImg.setAttribute("src", "/images/moon.png");
      body.classList.remove("lite");
      body.classList.add("dark");

      nav.classList.add("nav_dark");
      menuBtn.classList.add("menu_btn_dark");
      menu.classList.add("menu_dark");
      for (item of menuLink) {
        item.classList.add("link_dark");
      }

      content.classList.add("content-dark");
      content.classList.remove("content-color");

      selectedContent.classList.add("selected-content-dark");
      selectedContent.classList.remove("selected-content", "content-color");

      formatSelect.classList.add("barcode-format-dark");
      barTxt.classList.add("barcode-txt-dark");
      barWrap.classList.add("barcode-wrap-dark");
      barSettingWrap.classList.add("barcode-setting-wrap-dark");
      qrWrap.classList.add("qr-wrap-dark");
			qrSettingWrap.classList.add("qr-setting-wrap-dark");

      for (item of spans) {
        item.classList.add("span-dark");
      }

      for (item of valWraps) {
        item.classList.add("val-wrap-dark");
      }

      for (item of rangeInputs) {
        item.classList.add("range_dark");
      }

      for (item of rangeWrap) {
        item.classList.add("range-wrap-dark");
      }

      for (item of colorWrap) {
        item.classList.add("color-wrap-dark");
      }

      for (item of radioWrappers) {
        item.classList.add("radio-wrapper-dark");
        item.classList.remove("radio-wrapper");
      }

      for (item of selectedRadios) {
        item.classList.add("selected-radio-dark");
        item.classList.remove("selected-radio");
      }

      barCodeDownloadBtn.classList.add("download-btn-dark");
      qrDownLoadBtn.classList.add("download-btn-dark");
      qrUrlInput.classList.add("qr-url-dark");

      // htu.classList.add("htu_dark");
      //descH3.classList.add("htu_h3_dark");
      //description.classList.add("desc_dark");

      footer.classList.add("footer_dark");
    }
  };
});

var barcode = JsBarcode("#barcode", barTxt.value, {
  format: "CODE128",
  displayValue: true,
  textPosition: "bottom",
  textAlign: "center",
  fontSize: 20,
  width: 2,
  height: 100,
  margin: 10,
  textMargin: 10,
  background: "#ffffff",
  lineColor: "#000000",
  font: "monospace",
});

barBgColor.value = "#ffffff";

txtSizeValP.textContent = barTxtSize.value;
txtMarginValP.textContent = barTxtMargin.value;
barWidthValP.textContent = barWidth.value;
barHeightValP.textContent = barHeight.value;
barMarginValP.textContent = barMargin.value;
barBgColorValP.textContent = barBgColor.value;
barLineColorValP.textContent = barLineColor.value;

function downloadBarCode() {
  var imageDataUrl = document.getElementById("barcode").src;
  var downloadLink = document.createElement("a");
  downloadLink.href = imageDataUrl;
  downloadLink.download = "barcode.png";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

function setBarTxt() {
  let bar = document.querySelector("#barcode");
  let wrongValTxt = document.querySelector(".wrong-value");
  let displayStyle = wrongValTxt.style.display;
  try {
    console.log(wrongValTxt.style.display);
    if (wrongValTxt.style.display == "block") {
      bar.style.display = "block";
      wrongValTxt.style.display = "none";
    }
    document.getElementById("barcode").innerHTML = "";

    barcode = JsBarcode("#barcode", barTxt.value, {
      format: barcode._options.format,
      displayValue: barcode._options.displayValue,
      width: barcode._options.width,
      height: barcode._options.height,
      textPosition: barcode._options.textPosition,
      textAlign: barcode._options.textAlign,
      fontSize: barcode._options.fontSize,
      textMargin: barcode._options.textMargin,
      marginTop: barcode._options.marginTop,
      marginBottom: barcode._options.marginBottom,
      background: barcode._options.background,
      lineColor: barcode._options.lineColor, // 이전 색상 유지
      text: barcode._options.text,
    });
  } catch (error) {
    bar.style.display = "none";
    wrongValTxt.style.display = "block";
  }
}
//포맷 설정
function setBarFormat() {
  let checkedOpt;

  barFormat.forEach((option) => {
    if (option.selected) {
      checkedOpt = option;
    }
  });

  let exampleBarTxt = "";
  if (checkedOpt.value === "CODE128") {
    exampleBarTxt = "Example 1234";
  } else if (checkedOpt.value === "CODE128A") {
    exampleBarTxt = "EXAMPLE";
  } else if (checkedOpt.value === "CODE128B") {
    exampleBarTxt = "Example text";
  } else if (checkedOpt.value === "CODE128C") {
    exampleBarTxt = "12345678";
  } else if (checkedOpt.value === "CODE39") {
    exampleBarTxt = "EXAMPLE TEXT";
  } else if (checkedOpt.value === "EAN8") {
    exampleBarTxt = "12345670";
  } else if (checkedOpt.value === "EAN5") {
    exampleBarTxt = "54495";
  } else if (checkedOpt.value === "EAN2") {
    exampleBarTxt = "53";
  } else if (checkedOpt.value === "upc") {
    exampleBarTxt = "123456789999";
  } else if (checkedOpt.value === "ITF") {
    exampleBarTxt = "123456";
  } else if (checkedOpt.value === "MSI10") {
    exampleBarTxt = "123456";
  } else if (checkedOpt.value === "MSI11") {
    exampleBarTxt = "123456";
  } else if (checkedOpt.value === "MSI1010") {
    exampleBarTxt = "123456";
  } else if (checkedOpt.value === "MSI1110") {
    exampleBarTxt = "123456";
  } else if (checkedOpt.value === "pharmacode") {
    exampleBarTxt = "1234";
  } else if (checkedOpt.value === "CODABAR") {
    exampleBarTxt = "A1234B";
  }
  barTxt.value = exampleBarTxt;

  document.getElementById("barcode").innerHTML = "";

  barcode = JsBarcode("#barcode", exampleBarTxt, {
    format: checkedOpt.value,
    displayValue: barcode._options.displayValue,
    width: barcode._options.width,
    height: barcode._options.height,
    textPosition: barcode._options.textPosition,
    textAlign: barcode._options.textAlign,
    fontSize: barcode._options.fontSize,
    textMargin: barcode._options.textMargin,
    marginTop: barcode._options.marginTop,
    marginBottom: barcode._options.marginBottom,
    background: barcode._options.background,
    lineColor: barcode._options.lineColor, // 이전 색상 유지
    text: barcode._options.text,
  });
}

function setTxtVisibility() {
  let txtOpt = document.querySelector(".text-option");
  let checkedInput;
  let prevCheckedInput;

  let checkedInputDiv;
  let inputDiv = [];
  let prevCheckedInputDiv;

  barTxtVisible.forEach((input) => {
    if (input.checked) {
      checkedInput = input;
      checkedInputDiv = checkedInput.closest("div");
    }
    inputDiv.push(input.closest("div"));
  });

  for (item of inputDiv) {
    if (
      item.classList.contains("selected-radio") ||
      item.classList.contains("selected-radio-dark")
    ) {
      prevCheckedInputDiv = item;
    }
  }

  if (isActive) {
    prevCheckedInputDiv.classList.remove("selected-radio");
    checkedInputDiv.classList.add("selected-radio");
  } else {
    prevCheckedInputDiv.classList.remove("selected-radio-dark");
    checkedInputDiv.classList.add("selected-radio-dark");
  }

  if (checkedInput.value == "true") {
    txtOpt.style.display = "block";
  } else {
    txtOpt.style.display = "none";
  }
  document.getElementById("barcode").innerHTML = "";

  barcode = JsBarcode("#barcode", barTxt.value, {
    format: barcode._options.format,
    displayValue: checkedInput.value,
    width: barcode._options.width,
    height: barcode._options.height,
    textPosition: barcode._options.textPosition,
    textAlign: barcode._options.textAlign,
    fontSize: barcode._options.fontSize,
    textMargin: barcode._options.textMargin,
    marginTop: barcode._options.marginTop,
    marginBottom: barcode._options.marginBottom,
    background: barcode._options.background,
    lineColor: barcode._options.lineColor, // 이전 색상 유지
    text: barcode._options.text,
  });
}

function setBarWidth() {
  barWidthValP.textContent = barWidth.value;
  document.getElementById("barcode").innerHTML = "";

  barcode = JsBarcode("#barcode", barTxt.value, {
    format: barcode._options.format,
    displayValue: barcode._options.displayValue,
    width: barWidth.value,
    height: barcode._options.height,
    textPosition: barcode._options.textPosition,
    textAlign: barcode._options.textAlign,
    fontSize: barcode._options.fontSize,
    textMargin: barcode._options.textMargin,
    marginTop: barcode._options.marginTop,
    marginBottom: barcode._options.marginBottom,
    background: barcode._options.background,
    lineColor: barcode._options.lineColor, // 이전 색상 유지
  });
}

function setBarHeight() {
  barHeightValP.textContent = barHeight.value;
  document.getElementById("barcode").innerHTML = "";

  barcode = JsBarcode("#barcode", barTxt.value, {
    format: barcode._options.format,
    displayValue: barcode._options.displayValue,
    width: barcode._options.width,
    height: barHeight.value,
    textPosition: barcode._options.textPosition,
    textAlign: barcode._options.textAlign,
    fontSize: barcode._options.fontSize,
    textMargin: barcode._options.textMargin,
    marginTop: barcode._options.marginTop,
    marginBottom: barcode._options.marginBottom,
    background: barcode._options.background,
    lineColor: barcode._options.lineColor, // 이전 색상 유지
    text: barcode._options.text,
  });
}

function setTxtPos() {
  let checkedInput;
  let prevCheckedInput;

  let checkedInputDiv;
  let inputDiv = [];
  let prevCheckedInputDiv;

  barTxtPos.forEach((input) => {
    if (input.checked) {
      checkedInput = input;
      checkedInputDiv = checkedInput.closest("div");
    }
    inputDiv.push(input.closest("div"));
  });

  for (item of inputDiv) {
    if (
      item.classList.contains("selected-radio") ||
      item.classList.contains("selected-radio-dark")
    ) {
      prevCheckedInputDiv = item;
    }
  }

  if (isActive) {
    prevCheckedInputDiv.classList.remove("selected-radio");
    prevCheckedInputDiv.classList.add("radio-wrapper");
    checkedInputDiv.classList.remove("radio-wrapper");
    checkedInputDiv.classList.add("selected-radio");
  } else {
    prevCheckedInputDiv.classList.remove("selected-radio-dark");
    prevCheckedInputDiv.classList.add("radio-wrapper-dark");
    checkedInputDiv.classList.remove("radio-wrapper-dark");
    checkedInputDiv.classList.add("selected-radio-dark");
  }

  document.getElementById("barcode").innerHTML = "";

  barcode = JsBarcode("#barcode", barTxt.value, {
    format: barcode._options.format,
    displayValue: barcode._options.displayValue,
    width: barcode._options.width,
    height: barcode._options.height,
    textPosition: checkedInput.value,
    textAlign: barcode._options.textAlign,
    fontSize: barcode._options.fontSize,
    textMargin: barcode._options.textMargin,
    marginTop: barcode._options.marginTop,
    marginBottom: barcode._options.marginBottom,
    background: barcode._options.background,
    lineColor: barcode._options.lineColor, // 이전 색상 유지
    text: barcode._options.text,
  });
}

function setTxtAlign() {
  let checkedInput;
  let prevCheckedInput;

  let checkedInputDiv;
  let inputDiv = [];
  let prevCheckedInputDiv;

  barTxtAlign.forEach((input) => {
    if (input.checked) {
      checkedInput = input;
      checkedInputDiv = checkedInput.closest("div");
    }
    inputDiv.push(input.closest("div"));
  });

  for (item of inputDiv) {
    if (
      item.classList.contains("selected-radio") ||
      item.classList.contains("selected-radio-dark")
    ) {
      prevCheckedInputDiv = item;
    }
  }

  if (isActive) {
    prevCheckedInputDiv.classList.remove("selected-radio");
    prevCheckedInputDiv.classList.add("radio-wrapper");
    checkedInputDiv.classList.remove("radio-wrapper");
    checkedInputDiv.classList.add("selected-radio");
  } else {
    prevCheckedInputDiv.classList.remove("selected-radio-dark");
    prevCheckedInputDiv.classList.add("radio-wrapper-dark");
    checkedInputDiv.classList.remove("radio-wrapper-dark");
    checkedInputDiv.classList.add("selected-radio-dark");
  }

  document.getElementById("barcode").innerHTML = "";

  barcode = JsBarcode("#barcode", barTxt.value, {
    format: barcode._options.format,
    displayValue: barcode._options.displayValue,
    width: barcode._options.width,
    height: barcode._options.height,
    textPosition: barcode._options.textPosition,
    textAlign: checkedInput.value,
    fontSize: barcode._options.fontSize,
    textMargin: barcode._options.textMargin,
    marginTop: barcode._options.marginTop,
    marginBottom: barcode._options.marginBottom,
    background: barcode._options.background,
    lineColor: barcode._options.lineColor, // 이전 색상 유지
    text: barcode._options.text,
  });
}

function setTxtSize() {
  let txtSizeVal = barTxtSize.value;
  txtSizeValP.textContent = txtSizeVal;

  document.getElementById("barcode").innerHTML = "";

  barcode = JsBarcode("#barcode", barTxt.value, {
    format: barcode._options.format,
    displayValue: barcode._options.displayValue,
    width: barcode._options.width,
    height: barcode._options.height,
    textPosition: barcode._options.textPosition,
    textAlign: barcode._options.textAlign,
    fontSize: txtSizeVal,
    textMargin: barcode._options.textMargin,
    marginTop: barcode._options.marginTop,
    marginBottom: barcode._options.marginBottom,
    background: barcode._options.background,
    lineColor: barcode._options.lineColor, // 이전 색상 유지
    text: barcode._options.text,
  });
}

function setTxtMargin() {
  let txtMarginVal = barTxtMargin.value;
  txtMarginValP.textContent = txtMarginVal;
  document.getElementById("barcode").innerHTML = "";

  barcode = JsBarcode("#barcode", barTxt.value, {
    format: barcode._options.format,
    displayValue: barcode._options.displayValue,
    textPosition: barcode._options.textPosition,
    textAlign: barcode._options.textAlign,
    fontSize: barcode._options.fontSize,
    width: barcode._options.width,
    height: barcode._options.height,
    textMargin: txtMarginVal,
    marginTop: barcode._options.marginTop,
    marginBottom: barcode._options.marginBottom,
    background: barcode._options.background,
    lineColor: barcode._options.lineColor, // 이전 색상 유지
    font: "monospace",
    text: barcode._options.text,
  });
}

// 위 아래 마진
function setBarMargin() {
  let marginVal = barMargin.value;
  barMarginValP.textContent = marginVal;
  document.getElementById("barcode").innerHTML = "";

  barcode = JsBarcode("#barcode", barTxt.value, {
    format: barcode._options.format,
    displayValue: barcode._options.displayValue,
    width: barcode._options.width,
    height: barcode._options.height,
    textPosition: barcode._options.textPosition,
    textAlign: barcode._options.textAlign,
    fontSize: barcode._options.fontSize,
    marginTop: marginVal,
    marginBottom: marginVal,
    textMargin: barcode._options.textMargin,
    background: barcode._options.background,
    lineColor: barcode._options.lineColor, // 이전 색상 유지
    font: "monospace",
    text: barcode._options.text,
  });
}

// 바코드 배경, 선 색 조절 열기
function openColorPicker(event, inputId) {
  event.stopPropagation();
  document.getElementById(inputId).click();
}

// 바코드 배경 색
function setBarBgColor() {
  let bgColor = barBgColor.value;
  barBgColorValP.textContent = bgColor;
  document.getElementById("barcode").innerHTML = "";

  barcode = JsBarcode("#barcode", barTxt.value, {
    format: barcode._options.format,
    displayValue: barcode._options.displayValue,
    width: barcode._options.width,
    height: barcode._options.height,
    textPosition: barcode._options.textPosition,
    textAlign: barcode._options.textAlign,
    fontSize: barcode._options.fontSize,
    marginTop: barcode._options.marginTop,
    marginBottom: barcode._options.marginBottom,
    textMargin: barcode._options.textMargin,
    background: bgColor,
    lineColor: barcode._options.lineColor, // 이전 색상 유지
    font: "monospace",
    text: barcode._options.text,
  });
}

// 바코드 선 색
function setBarLineColor() {
  let lineColor = barLineColor.value;
  barLineColorValP.textContent = lineColor;
  document.getElementById("barcode").innerHTML = "";

  // 새로운 바코드 생성
  barcode = JsBarcode("#barcode", barTxt.value, {
    format: barcode._options.format,
    displayValue: barcode._options.displayValue,
    width: barcode._options.width,
    height: barcode._options.height,
    textPosition: barcode._options.textPosition,
    textAlign: barcode._options.textAlign,
    fontSize: barcode._options.fontSize,
    marginTop: barcode._options.marginTop,
    marginBottom: barcode._options.marginBottom,
    textMargin: barcode._options.textMargin,
    background: barcode._options.background,
    lineColor: lineColor,
    font: "monospace",
    text: barcode._options.text,
  });
}
