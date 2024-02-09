const body = document.querySelector("body");
const nav = document.querySelector("nav");

// const bodyClassList = bodyTag.classList;
const logo = document.querySelector(".logo");

const toggleList = document.querySelectorAll(".toggleSwitch");
const toggleImg = document.querySelector(".display_mode_icon");

const menuBtn = document.querySelector(".menu_btn");
const menu = document.querySelector(".menu");

const txt = document.querySelector(".txt-wrap p");
const ip = document.querySelector(".my-ip-is");

const htu = document.querySelectorAll(".how_to_use");
const descH3 = document.querySelectorAll(".htu_h3");
const description = document.querySelectorAll(".description");

const navBar = document.querySelector(".nav_bar");
const main = document.querySelector("main");

const menuLink = document.querySelectorAll(".menu_container a");

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

      nav.classList.remove("nav_dark");
      main.classList.remove("main_dark");

      menuBtn.classList.remove("menu_btn_dark");
      menu.classList.remove("menu_dark");
      for(item of menuLink){
        item.classList.remove("link_dark");
      }
     
      for(item of htu){
      	item.classList.remove("htu_dark");
      }
			for(item of descH3){
      	item.classList.remove("htu_h3_dark");
      }
      for(item of description){
      	item.classList.remove("desc_dark");
      }
      txt.classList.remove("txt-dark");
      ip.classList.remove("my-ip-is-dark");

      footer.classList.remove("footer_dark");
    } else {
      $toggle.classList.add("active");
      toggleImg.setAttribute("src", "/images/moon.png");
      body.classList.add("dark");

      nav.classList.add("nav_dark");
      main.classList.add("main_dark");

      menuBtn.classList.add("menu_btn_dark");
      menu.classList.add("menu_dark");
      for(item of menuLink){
        item.classList.add("link_dark");
      }

      for(item of htu){
      	item.classList.add("htu_dark");
      }
			for(item of descH3){
      	item.classList.add("htu_h3_dark");
      }
      for(item of description){
      	item.classList.add("desc_dark");
      }
      
      txt.classList.add("txt-dark");
      ip.classList.add("my-ip-is-dark");

      footer.classList.add("footer_dark");
    }
  };
});

function getIP(json) {
	ip.textContent = json.ip;
}
