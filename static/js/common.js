var isMenuOpened = false;
var isContentOpened = false;
var browserWidth = window.innerWidth;
let contentType = document.querySelectorAll(".content_type");

document.addEventListener("DOMContentLoaded", function () {
  let menuBtn = document.querySelector(".menu_btn");

  menuBtn.addEventListener("click", function () {
    let menu = document.querySelector(".menu");
    slideToggle(menu);
  });

  contentType.forEach(function(item) {
    item.addEventListener("click", function() {
      let list = item.parentNode.querySelector(".content_list");
      slideList(list);
    });
  });

});

function slideToggle(menu) {
  if (isMenuOpened) {
    menu.classList.remove("open");
    isMenuOpened = false;
  } else {
    menu.classList.add("open");
    isMenuOpened = true;
  }
}

function slideList(list){
  let span = list.parentNode.querySelector("span");
  if(isContentOpened){
    list.classList.remove("content_open");
    isContentOpened = false;
    if (window.innerWidth <= 768) {
      span.textContent = "↓";   
    }
  } else{
    list.classList.add("content_open");
    isContentOpened = true;
    if (window.innerWidth <= 768) {
      span.textContent = "↑";   
    }
  }

}

// browserWidth 변화에 따른 content arrow 추가 및 제거
function handleResize() {
    let isSpan = document.querySelector(".arrow");
    if (window.innerWidth <= 768) {
      contentType.forEach(function(item) {
        if(!isSpan){
          let arrow = document.createElement("span");
          arrow.classList.add("arrow")
          arrow.style.float = "right"
          arrow.style.paddingRight = "3px"
          arrow.textContent = "↓";   
          item.appendChild(arrow);
        }
      });
    } else{
      if(isSpan){
        contentType.forEach(function(item) {
          let arrow = item.querySelector(".arrow");
          item.removeChild(arrow);
        });
      }
    }
  }
  
    // 초기 로딩 시에도 한 번 실행
    handleResize();
    
    // 브라우저 크기가 변할 때마다 실행
    window.addEventListener("resize", handleResize);