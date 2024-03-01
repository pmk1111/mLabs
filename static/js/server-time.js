const body = document.querySelector("body");
const nav = document.querySelector(".nav_bar");
const logoImg = document.querySelector('.logo');
const title = document.querySelector('.title');
const apps = document.querySelector('.app-icon');
const toggleList = document.querySelectorAll(".toggleSwitch");
const toggleImg = document.querySelector(".display_mode_icon");
const menuBtn = document.querySelector(".menu_btn");
const menu = document.querySelector(".menu");
const menuLink = document.querySelectorAll(".menu_container a");
const urlInputDiv = document.querySelector(".url-input-wrap");
const search = document.querySelector(".search");
const getTimeBtn = document.querySelector(".get-time-btn");
const serverTimeTxt = document.querySelector("#serverTime");

const htu = document.querySelectorAll(".how_to_use");
const descH3 = document.querySelectorAll(".htu_h3");
const description = document.querySelectorAll(".description");


const footer = document.querySelector("footer");

const openHelp = document.querySelector('.open-help');
const helpIcon = document.querySelector('.help-icon');
const helpModal = document.querySelector('.help-modal');
const modalOverlay = document.querySelector(".modal-overlay");
const modalContent = document.querySelector('.modal-content');
const closeModalBtn = document.querySelector('.close-modal');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

toggleList.forEach(($toggle) => {
  $toggle.onclick = () => {
    const isActive = $toggle.classList.contains("active");

    if (isActive) {
      $toggle.classList.remove("active");
      toggleImg.setAttribute("src", "/images/sun.png");
      body.classList.remove("dark");
      body.classList.add("lite");

      nav.classList.remove("nav_dark");
      nav.classList.add("nav_lite");
      logoImg.setAttribute('src', '/images/logo_black.svg');
      title.style.color = 'black';
      apps.setAttribute('src','images/apps-black.svg');

      menuBtn.classList.remove("menu_btn_dark");
      menu.classList.remove("menu_dark");
      for(item of menuLink){
        item.classList.remove("link_dark");
      }
      
      urlInputDiv.classList.remove("url-input-wrap-dark");
      search.classList.remove("dark");
      getTimeBtn.classList.remove("get-time-btn-dark");
      serverTimeTxt.classList.remove("server-time-dark");
      
      for(item of htu){
      	item.classList.remove("htu_dark");
      }
			for(item of descH3){
      	item.classList.remove("htu_h3_dark");
      }
      for(item of description){
      	item.classList.remove("desc_dark");
      }

      footer.classList.remove("footer_dark");
      helpIcon.setAttribute('src', '/images/help.svg');
      modalContent.classList.remove('dark');
      closeModalBtn.setAttribute('src', '/images/deletebtn.svg');
    } else {
      $toggle.classList.add("active");
      toggleImg.setAttribute("src", "/images/moon.png");
      body.classList.remove("lite");
      body.classList.add("dark");

      nav.classList.remove("nav_lite");
      nav.classList.add("nav_dark");
      logoImg.setAttribute('src', '/images/logo_white.svg');
      title.style.color = 'white';
      apps.setAttribute('src','images/apps-white.svg');
      
			menuBtn.classList.add("menu_btn_dark");
      menu.classList.add("menu_dark");
      
      urlInputDiv.classList.add("url-input-wrap-dark");
      search.classList.add("dark");
      getTimeBtn.classList.add("get-time-btn-dark");
      serverTimeTxt.classList.add("server-time-dark");
      
      for(item of htu){
      	item.classList.add("htu_dark");
      }
			for(item of descH3){
      	item.classList.add("htu_h3_dark");
      }
      for(item of description){
      	item.classList.add("desc_dark");
      }

      for(item of menuLink){
        item.classList.add("link_dark");
      }

      footer.classList.add("footer_dark");
      helpIcon.setAttribute('src', '/images/help-white.svg');
      modalContent.classList.add('dark');
      closeModalBtn.setAttribute('src', '/images/deletebtn-white.svg');
    }
  };
});