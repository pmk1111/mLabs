const body = document.querySelector("body");
const nav = document.querySelector("nav");
const logoImg = document.querySelector('.logo');
const title = document.querySelector('.title');
const apps = document.querySelector('.app-icon');
const toggleList = document.querySelectorAll(".toggleSwitch");
const toggleImg = document.querySelector(".display_mode_icon");
const menuBtn = document.querySelector(".menu_btn");
const menu = document.querySelector(".menu");
const menuLink = document.querySelectorAll(".menu_container a");
const footer = document.querySelector("footer");

const downloadItem = document.querySelector(".show-download");
const imgItem = document.querySelector('.show-img');
const thumbnailDiv = document.querySelector(".thumbnail-container");
const inputBtnArea = document.querySelector('.input-btn-area');
const here = document.querySelector('.here');
const imgSizeSelector = document.querySelector('select[name="img-size-selector"]');
const urlinput = document.querySelector(".url-input");
const submitBtn = document.querySelector(".submit-url");
const downloadAllBtn = document.querySelector('.download-all');

var isActive = true;
// 다크모드
toggleList.forEach(($toggle) => {
  $toggle.onclick = () => {

    isActive = $toggle.classList.contains("active");
    const fileNameDivs = document.querySelectorAll('.file-name-div');
    if (isActive) {
      $toggle.classList.remove("active");
      toggleImg.setAttribute("src", "/images/sun.png");
      body.classList.remove("dark");

      nav.classList.remove("nav_dark");
      logoImg.setAttribute('src', '/images/logo_black.svg');
      title.style.color = 'black';
      apps.setAttribute('src','images/apps-black.svg');

      menuBtn.classList.remove("menu_btn_dark");
      menu.classList.remove("menu_dark");
      for(item of menuLink){
        item.classList.remove("link_dark");
      }
      footer.classList.remove("footer_dark");

      thumbnailDiv.classList.remove('dark');
      inputBtnArea.classList.remove('dark');
      imgSizeSelector.classList.remove('dark');
      urlinput.classList.remove('dark');
      submitBtn.classList.remove('dark');
      downloadAllBtn.classList.remove('dark');
    } else {
      $toggle.classList.add("active");
      toggleImg.setAttribute("src", "/images/moon.png");
      body.classList.add("dark");

      nav.classList.add("nav_dark");
      logoImg.setAttribute('src', '/images/logo_white.svg');
      title.style.color = 'white';
      apps.setAttribute('src','images/apps-white.svg');

      menuBtn.classList.add("menu_btn_dark");
      menu.classList.add("menu_dark");
      for(item of menuLink){
        item.classList.add("link_dark");
      }
      footer.classList.add("footer_dark");

      thumbnailDiv.classList.add('dark');
      inputBtnArea.classList.add('dark');
      imgSizeSelector.classList.add('dark');
      urlinput.classList.add('dark');
      submitBtn.classList.add('dark');
      downloadAllBtn.classList.add('dark');
    }
  };
});


submitBtn.addEventListener("click", function () {
  const imgSize = document.querySelector('select[name="img-size-selector"] option:checked') .value;
  const url = document.querySelector(".url-input").value;
  if (url) {
    let index = "";
    let videoId = "";
    if (url.includes("v=")) {
      index = url.indexOf("v=");
      if(url.includes("&t")){
        tIndex = url.indexOf("&t");
        videoId = url.substring(index + 2, tIndex);
      } else{
        videoId = url.substring(index + 2);
      }
    } else if (url.includes("shorts/")) {
      index = url.indexOf("shorts/");
      videoId = url.substring(index + 7);
    } else if(url.includes("embed/")){
      index = url.indexOf("embed/");
      videoId = url.substring(index + 6);
    } else if(url.includes("youtu.be/")){
      index = url.indexOf("youtu.be/");
      videoId = url.substring(index + 9);
    }

    let imgUrl = "";
    if(imgSize === 'default'){
      imgUrl = "https://i1.ytimg.com/vi/" + videoId + "/default.jpg";
    } else if(imgSize === 'mqdefault'){
      imgUrl = "https://i1.ytimg.com/vi/" + videoId + "/mqdefault.jpg";
    } else if(imgSize === 'hqdefault'){
      imgUrl = "https://i1.ytimg.com/vi/" + videoId + "/hqdefault.jpg"; 
    } else if(imgSize === 'sddefault'){
      imgUrl = "https://i1.ytimg.com/vi/" + videoId + "/sddefault.jpg";
    } else {
      imgUrl = "https://i1.ytimg.com/vi/" + videoId + "/maxresdefault.jpg";
    }
    const thumnailContent = document.createElement('div');
    const thumbnailWrapper = document.createElement('div');
    thumnailContent.className = "thumbnail-content";
    thumbnailWrapper.className = 'thumbnail-wrapper';
    const img = document.createElement("img");
    img.className = "thumbnail";
    
    img.setAttribute("src", imgUrl);

    const deleteItem = document.createElement('div');
    deleteItem.className = 'delete-item'
    deleteItem.style.display = 'none';

    const deleteBtnImg = document.createElement('img');
    deleteBtnImg.setAttribute('src', '/images/deletebtn.svg');

    deleteItem.appendChild(deleteBtnImg);
    thumnailContent.appendChild(deleteItem);
    thumnailContent.appendChild(thumbnailWrapper);
    thumbnailWrapper.appendChild(img)
    thumbnailDiv.appendChild(thumnailContent);

    if(thumbnailDiv.querySelectorAll('.thumbnail-content').length >= 0){
      downloadAllBtn.style.display = 'block';
    }

    thumnailContent.addEventListener('mouseover', function(){
      deleteItem.style.display = 'flex';
      img.style.width = '174px';
      img.style.height = 'auto';
      img.style.opacity = '0.8';
      img.style.transition = '0.2s';
    });
    thumnailContent.addEventListener('mouseout', function(){
      deleteItem.style.display = 'none';
      img.style.width = '';
      img.style.height = '';
      img.style.opacity = '';
      img.style.transition = '';
    });
    deleteBtnImg.addEventListener('mouseover', function(){
      deleteBtnImg.setAttribute('src', '/images/deletebtn-white.svg');
      deleteItem.style.backgroundColor = '#E5322D';
      deleteItem.style.transition = '0.1s';
    });
    deleteBtnImg.addEventListener('mouseout', function(){
      deleteBtnImg.setAttribute('src', '/images/deletebtn.svg');
      deleteItem.style.backgroundColor = '';
      deleteItem.style.transition = '0.1s';
    });
    deleteBtnImg.addEventListener('click', function(){
      thumbnailDiv.removeChild(thumnailContent);
      const thumbnailItems = document.querySelectorAll('.thumbnail-content');
      if(thumbnailItems.length == 0){
        downloadAllBtn.style.display = 'none';
      }
    });


    if(thumbnailDiv.querySelectorAll('.thumbnail-content').length != 0){here.style.display = 'none'}

    const imgWrapper = document.createElement("div");
    imgWrapper.className = "img-wrapper";

    const renderImg = document.createElement("img");
    renderImg.src = imgUrl;

    const span = document.createElement("span");
    span.style.fontWeight = "600";
    span.textContent = "다운로드";

    imgWrapper.appendChild(renderImg);

    img.addEventListener("click", function () {
      downloadImage(imgUrl);
    });
  } else {
    alert("올바른 url을 입력하세요");
  }
});

function downloadImage(imgUrl) {
  fetch("/download-thumbnail", {
    method: "POST", // POST 메서드로 변경
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ imgUrl: imgUrl }), // 이미지 URL을 JSON 형태로 보냄
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.blob();
    })
    .then((blob) => {
      // 이미지 다운로드 링크 생성
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = "image.jpg";

      // 가상으로 클릭 이벤트 발생
      downloadLink.click();
    })
    .catch((error) => {
      console.error("Error during image download:", error);
    });
}

function downloadAll(){
  let arr = [];
  const thumbnails = document.querySelectorAll('.thumbnail');

  for (const thumbnail of thumbnails) {
    arr.push(thumbnail.getAttribute('src'));
  }

  fetch("/download-all-thumbnail", {
    method: "POST", 
    headers: {"Content-Type": "application/json",},
    body: JSON.stringify({ imageUrls: arr }),
  }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.blob();
  }).then((blob) => {
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = "all_images.zip";

      downloadLink.click();
  }).catch((error) => {
      console.error("Error during bulk image download:", error);
  });      
}