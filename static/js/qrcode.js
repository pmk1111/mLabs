const qrUrl = document.querySelector("#qr-url");
const qrBgColor = document.querySelector("#set-qr-bg-color");
const qrBgColorDiv = document.querySelector(".qr-bg-color-wrap");
const qrColor = document.querySelector("#set-qr-color");
const qrColorDiv = document.querySelector(".qr-color-wrap");
const qrSize = document.querySelector("#w-h");

var qrSizeValP = document.querySelector(".qr-size-val");
var qrBgColorValP = document.querySelector(".qr-bg-color-val");
var qrColorValP = document.querySelector(".qr-color-val");

qrSizeValP.textContent = qrSize.value;
qrBgColorValP.textContent = qrBgColor.value;
qrColorValP.textContent = qrColor.value;

qrUrl.value = "https://www.example.com";
qrSize.value = 128;
qrBgColor.value = "#ffffff";
qrColor.value = "#000000";

// 입력값이 숫자인지 확인하는 함수
function isNumeric(value) {
  return /^\d+$/.test(value);
}

// 입력값이 범위 내에 있는지 확인하고 벗어나면 적절한 값으로 변경
function validateInput() {
  var inputElement = document.getElementById("w-h");

  // 입력값이 숫자인지 확인
  if (!isNumeric(inputElement.value)) {
    inputElement.value = ""; // 입력값 초기화
    return;
  }

  // 범위 확인 및 적절한 값으로 변경
  var value = parseInt(inputElement.value, 10);
  if (value < 1) {
    value = 1;
  } else if (value > 250) {
    value = 250;
  }

  // 변경된 값으로 입력 필드 업데이트
  inputElement.value = value;
}

// input 값이 변경될 때마다 validateInput 함수 호출
document.getElementById("w-h").addEventListener("input", validateInput);

var qrcode = new QRCode(document.getElementById("qrcode"), {
  text: "https://www.example.com",
  width: qrSize.value,
  height: qrSize.value,
  colorDark: qrColor.value,
  colorLight: qrBgColor.value,
});
console.log(qrcode.text);

function downloadQRCode() {
  var imageDataUrl = document
    .getElementById("qrcode")
    .getElementsByTagName("img")[0].src;
  var downloadLink = document.createElement("a");
  downloadLink.href = imageDataUrl;
  downloadLink.download = "qrcode.png";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

function setQrUrl() {
  let url = qrUrl.value;
  document.getElementById("qrcode").innerHTML = "";

  qrcode = new QRCode(document.getElementById("qrcode"), {
    text: url,
    width: qrSize.value,
    height: qrSize.value,
    colorDark: qrColor.value,
    colorLight: qrBgColor.value,
  });
}

function setQrSize() {
  let size = qrSize.value;
  qrSizeValP.textContent = size;
  size = parseInt(size);
  console.log(size);

  if (size && !isNaN(size)) {
    document.getElementById("qrcode").innerHTML = "";

    qrcode = new QRCode(document.getElementById("qrcode"), {
      text: qrUrl.value,
      width: size,
      height: size,
      colorDark: qrColor.value,
      colorLight: qrBgColor.value,
    });
  }
}

// 바코드 배경, 선 색 조절 열기
function openQrColorPicker(event, inputId) {
  event.stopPropagation();
  document.getElementById(inputId).click();
}

// 바코드 배경 색
function setQrBgColor() {
  let qrBgColorVal = qrBgColor.value;
  qrBgColorValP.textContent = qrBgColorVal;
  document.getElementById("qrcode").innerHTML = "";

  qrcode = new QRCode(document.getElementById("qrcode"), {
    text: qrUrl.value,
    width: qrSize.value,
    height: qrSize.value,
    colorDark: qrColor.value,
    colorLight: qrBgColorVal,
  });
}

// 바코드 선 색
function setQrLineColor() {
  let qrColorVal = qrColor.value;
  qrColorValP.textContent = qrColorVal;
  document.getElementById("qrcode").innerHTML = "";

  qrcode = new QRCode(document.getElementById("qrcode"), {
    text: qrUrl.value,
    width: qrSize.value,
    height: qrSize.value,
    colorDark: qrColorVal,
    colorLight: qrBgColor.value,
  });
}
