const body = document.querySelector("body");
const nav = document.querySelector("nav");
const logo = document.querySelector(".logo");
const SiteTitle = document.querySelector(".title");
const toggleList = document.querySelectorAll(".toggleSwitch");
const toggleImg = document.querySelector(".display_mode_icon");
const menuBtn = document.querySelector(".menu_btn");
const menu = document.querySelector(".menu");
const menuLink = document.querySelectorAll(".menu_container a");
const footer = document.querySelector("footer");

const radioWrap = document.querySelector('.radio-wrap');
const labels = document.querySelectorAll('.radio-wrap input[type="radio"] + label');
const textAreas = document.querySelectorAll('.textarea-wrap textarea');
const btns = document.querySelectorAll('.btn-wrap button');

const originalCodeTextarea = document.querySelector(".original-code");
const minifiedCodeTextarea = document.querySelector(".minified-code");
const minifyButton = document.querySelector(".do-minify-btn");

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
      logo.setAttribute("src", "/images/logo_black.svg");
      SiteTitle.style.color = "#151515";
      appIcon.setAttribute("src", "/images/apps-black.svg");
      nav.classList.remove("nav_dark");

      menuBtn.classList.remove("menu_btn_dark");
      menu.classList.remove("menu_dark");
      for (item of menuLink) {
        item.classList.remove("link_dark");
      }

      footer.classList.remove("footer_dark");

      radioWrap.classList.remove('dark');
      for (i of labels) {
        i.classList.remove("dark");
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
      logo.setAttribute("src", "/images/logo_white.svg");
      SiteTitle.style.color = "white";
      appIcon.setAttribute("src", "/images/apps-white.svg");
      nav.classList.add("nav_dark");

      menuBtn.classList.add("menu_btn_dark");
      menu.classList.add("menu_dark");
      for (item of menuLink) {
        item.classList.add("link_dark");
      }

      footer.classList.add("footer_dark");

      radioWrap.classList.add('dark');
      for (i of labels) {
        i.classList.add("dark");
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

minifyButton.addEventListener("click", function () {
  const originalCode = originalCodeTextarea.value;
  const checkedCodeType = document.querySelector(
    'input[name="code-type"]:checked'
  ).id;
  console.log("");

  fetch("/do-minify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ originalCode, checkedCodeType }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (checkedCodeType === "javascript") {
        minifiedCodeTextarea.value = data.minifiedCode.code;
      } else {
        minifiedCodeTextarea.value = data.minifiedCode;
      }
    })
    .catch((error) => {
      alert('압축 에러 발생');
      console.error("Minify 작업 중 오류 발생:", error);
    });
});

function clearTextarea() {
  let textareas = document.querySelectorAll(".textarea-wrap textarea");
  for (i of textareas) {
    i.value = "";
  }
}

function copyResult() {
  let minifiedCode = document.querySelector(".minified-code").value;

  var textarea = document.createElement("textarea");
  textarea.value = minifiedCode;
  document.body.appendChild(textarea);

  textarea.select();
  document.execCommand("copy");

  document.body.removeChild(textarea);

  alert("텍스트가 복사되었습니다");
}
