const body = document.querySelector("body");
const nav = document.querySelector("nav");
const logoImg = document.querySelector('.logo');
const title = document.querySelector('.title');
const apps = document.querySelector('.app-icon');

const toggleList = document.querySelectorAll(".toggleSwitch");
const toggleImg = document.querySelector(".display_mode_icon");

const menuBtn = document.querySelector(".menu_btn");
const menu = document.querySelector(".menu");

const txt = document.querySelector(".txt-wrap p");
const ip = document.querySelector(".my-ip-is");
const navBar = document.querySelector(".nav_bar");
const main = document.querySelector("main");
const menuLink = document.querySelectorAll(".menu_container a");
const footer = document.querySelector("footer");

const openHelp = document.querySelector('.open-help');
const helpIcon = document.querySelector('.help-icon');
const helpModal = document.querySelector('.help-modal');
const modalOverlay = document.querySelector(".modal-overlay");
const modalContent = document.querySelector('.modal-content');
const closeModalBtn = document.querySelector('.close-modal');

var isActive = true;
// 다크모드
toggleList.forEach(($toggle) => {
  $toggle.onclick = () => {

    isActive = $toggle.classList.contains("active");

    if (isActive) {
      $toggle.classList.remove("active");
      toggleImg.setAttribute("src", "/images/sun.png");
      body.classList.remove("dark");

      nav.classList.remove("nav_dark");
      logoImg.setAttribute('src', '/images/logo_black.svg');
      title.style.color = 'black';
      apps.setAttribute('src','images/apps-black.svg');
      main.classList.remove("main_dark");

      menuBtn.classList.remove("menu_btn_dark");
      menu.classList.remove("menu_dark");
      for(item of menuLink){
        item.classList.remove("link_dark");
      }

      txt.classList.remove("txt-dark");
      ip.classList.remove("my-ip-is-dark");

      footer.classList.remove("footer_dark");
      helpIcon.setAttribute('src', '/images/help.svg');
      modalContent.classList.remove('dark');
      closeModalBtn.setAttribute('src', '/images/deletebtn.svg');
    } else {
      $toggle.classList.add("active");
      toggleImg.setAttribute("src", "/images/moon.png");
      body.classList.add("dark");

      nav.classList.add("nav_dark");
      logoImg.setAttribute('src', '/images/logo_white.svg');
      title.style.color = 'white';
      apps.setAttribute('src','images/apps-white.svg');
      main.classList.add("main_dark");

      menuBtn.classList.add("menu_btn_dark");
      menu.classList.add("menu_dark");
      for(item of menuLink){
        item.classList.add("link_dark");
      }
      
      txt.classList.add("txt-dark");
      ip.classList.add("my-ip-is-dark");

      footer.classList.add("footer_dark");
      helpIcon.setAttribute('src', '/images/help-white.svg');
      modalContent.classList.add('dark');
      closeModalBtn.setAttribute('src', '/images/deletebtn-white.svg');
    }
  };
});

function getIP(json) {
	ip.textContent = json.ip;
}
