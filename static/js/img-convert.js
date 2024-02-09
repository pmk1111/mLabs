const body = document.querySelector("body");
const nav = document.querySelector("nav");

const toggleList = document.querySelectorAll(".toggleSwitch");
const toggleImg = document.querySelector(".display_mode_icon");

const footer = document.querySelector("footer");
const menuBtn = document.querySelector(".menu_btn");
const menu = document.querySelector(".menu");
const menuLink = document.querySelectorAll(".menu_container a");

const uploadBtn = document.querySelector(".btn-upload");
const convertBtn = document.querySelector(".convert-btn");
const downloadBtn = document.querySelector(".download_wrap");

const htu = document.querySelector(".how_to_use");
const htuH3 = document.querySelector(".htu_h3");
const step = document.querySelector(".step");
const desc = document.querySelectorAll(".step p");

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
      menuBtn.classList.remove("menu_btn_dark");
      menu.classList.remove("menu_dark");
      for (item of menuLink) {
        item.classList.remove("link_dark");
      }
      
      uploadBtn.classList.remove("btn_dark");
      convertBtn.classList.remove("btn_dark");
      downloadBtn.classList.remove("btn_dark");

      htu.classList.remove("htu_dark");
      htuH3.classList.remove("htu_h3_dark");
	  step.classList.remove("step_dark");
      for(item of desc){
        item.classList.remove("p_dark");
      }

      footer.classList.remove("footer_dark");
    } else {
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
      
	  uploadBtn.classList.add("btn_dark");
      convertBtn.classList.add("btn_dark");
      downloadBtn.classList.add("btn_dark");

      htu.classList.add("htu_dark");
      htuH3.classList.add("htu_h3_dark");
      step.classList.add("step_dark");
      for(item of desc){
        item.classList.add("p_dark");
      }

      footer.classList.add("footer_dark");
    }
  };
});

// 파일 변환
var prevImgWrap = document.querySelector(".prev_img_wrap");
var imageInput = document.getElementById("imageInput");

// 드래그 앤 드롭 이벤트 핸들러
prevImgWrap.addEventListener("dragenter", function (e) {
  e.preventDefault();
  prevImgWrap.classList.add("dragover");
});

prevImgWrap.addEventListener("dragover", function (e) {
  e.preventDefault();
  prevImgWrap.classList.add("dragover");
});

prevImgWrap.addEventListener("dragleave", function () {
  prevImgWrap.classList.remove("dragover");
});

prevImgWrap.addEventListener("drop", function (e) {
  e.preventDefault();
  prevImgWrap.classList.remove("dragover");
  
  let preview = document.getElementById("preview");
  let noImg = document.querySelector(".no_img");
  let dropTxt = document.querySelector(".drop_img_here");
  var reader = new FileReader();

  reader.onload = function () {
    noImg.style.display = "none";
    dropTxt.style.display = "none";
    preview.style.display = "block";
    document.getElementById("preview").src = reader.result;
  };

  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
    reader.readAsDataURL(e.dataTransfer.files[0]);
    imageInput.files = e.dataTransfer.files; // 드롭한 파일을 input에 반영
  }
});

// Input 변경 이벤트 핸들러
imageInput.addEventListener("change", function (event) {
  var input = event.target;
  var preview = document.getElementById("preview");
  let noImg = document.querySelector(".no_img");
  let dropTxt = document.querySelector(".drop_img_here");

  var reader = new FileReader();

  reader.onload = function () {
    noImg.style.display = "none";
    dropTxt.style.display = "none";
    preview.style.display = "block";
    preview.src = reader.result;
  };

  if (input.files && input.files[0]) {
    reader.readAsDataURL(input.files[0]);
  }
});

document.getElementById("imageInput").addEventListener("change", function (event) {
    var input = event.target;
    var preview = document.getElementById("preview");

    var reader = new FileReader();

    reader.onload = function () {
      preview.src = reader.result;
    };

    if (input.files && input.files[0]) {
      reader.readAsDataURL(input.files[0]);
    }
  });

function convertImage() {
  const inputElement = document.querySelector('input[type="file"]');
  const outputFormat = document.querySelector('select[name="format"]').value;
  const downloadWrap = document.querySelector(".download_wrap");
  const downloadLink = document.getElementById("downloadLink");

  const file = inputElement.files[0];

  if (file) {
    const formData = new FormData();
    formData.append("format", outputFormat);
    formData.append("image", file);

    // GIF 또는 TIFF가 선택된 경우 서버에 요청
    if (outputFormat === "gif" || outputFormat === "tiff") {
      fetch("/mlabs/convert-image", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob);

          // 다운로드 링크 업데이트
          downloadWrap.style.display = "block";
          downloadLink.href = url;
          downloadLink.download = `converted_image.${outputFormat}`;
        })
        .catch((error) => console.error(error));
    } else {
      // 다른 확장자는 클라이언트 측에서 변환
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = new Image();
        img.src = e.target.result;

        img.onload = function () {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);

          const dataURL = canvas.toDataURL(`image/${outputFormat}`);

          // 다운로드 링크 업데이트
          downloadLink.href = dataURL;
          downloadLink.download = `converted_image.${outputFormat}`;
          downloadWrap.style.display = "block";
        };
      };
      reader.readAsDataURL(file);
    }
    downloadLink.textContent = outputFormat + "(으)로 다운로드";
  }
}
