window.onload = function () {
  // const rouletteItemWrapper = document.querySelector('.roulette-item-wrapper');
  // const lineWrapper = document.querySelector(".line-wrapper");

  const itemContainer = document.querySelector(".item-container");
  const addItemBtn = document.createElement("button");
  let cnt = 2;
  let trycount = 0;
  let items = ["1", "2"]; // number of items and default text content
  let degreeArr = [];
  let allResult = [];

  const closeModalBtn = document.querySelector(".close-modal-btn");
  function createRoulette() {
    const rouletteItemWrapper = document.querySelector(
      ".roulette-item-wrapper"
    );
    const lineWrapper = document.querySelector(".line-wrapper");
    const itemContainer = document.querySelector(".item-container");
    rouletteItemWrapper.innerHTML = "";
    lineWrapper.innerHTML = "";
    itemContainer.innerHTML = "";

    for (let i = 0; i < items.length; i++) {
      const spinBtn = document.createElement("button");
      const rouletteItem = document.createElement("div");
      const lineItem = document.createElement("div");
      rouletteItem.classList.add("roulette-item");
      lineItem.classList.add("line");
      if(!isActive){
        lineItem.classList.add("dark");
      }
      spinBtn.setAttribute("type", "button");
      spinBtn.classList.add("spin-btn");
      spinBtn.textContent = "Go!";
      spinBtn.addEventListener("click", function () {
        trycount++;
        spinBtn.disabled = true;
        const roulette = document.querySelector(".roulette");
        let styleTag = document.createElement("style");
        let randomNum = Math.floor(Math.random() * degreeArr.length) + 1;

        let finalRotate = 3600 - degreeArr[randomNum - 1];
        styleTag.innerHTML += `
            @keyframes spin {
              0% {
                transform: rotate(0deg); 
              }
              100% {
                transform: rotate(${finalRotate}deg);
              }
            } 

            .rotating {
              animation: spin 5s linear ;
              animation-timing-function: ease-out;
            }
          `;
        document.head.appendChild(styleTag);

        roulette.classList.add("rotating");

        // const resultModal = document.querySelector(".modal");
        // const resulth3 = document.querySelector(".modal-content h3");
        // resulth3.textContent = "결과: " + items[randomNum - 1];
        // roulette.style.transform = `rotate(${finalRotate}deg)`;

        const ul = document.querySelector('.all-result-container ul');
        const li = document.createElement('li');

        const tryCnt = document.createElement('div');
        const val = document.createElement('div');

        tryCnt.classList.add('cnt');
        val.classList.add('val');

        if(!isActive){
          li.classList.add('dark');
          tryCnt.classList.add('dark');
        }

        li.append(tryCnt, val);

        allResult.push(items[randomNum - 1]);
        setTimeout(function () {
          document.querySelector('.now-result span').textContent = items[randomNum - 1];

          // resultModal.style.display = "block";
          spinBtn.disabled = false;

          tryCnt.textContent = trycount;
          val.textContent = items[randomNum - 1];
          ul.appendChild(li);
        }, 5000);
        // closeModalBtn.addEventListener("click", function () {
        //   resultModal.style.display = "none";
        //   roulette.classList.remove("rotating");
        //   roulette.style.transform = `rotate(0deg)`;
        // });
      });

      const itemWrapper = document.createElement("div");
      const itemInput = document.createElement("input");
      const deleteItemBtn = document.createElement("button");
      const degree = 360 / items.length;
      if (i === 0) {
        rouletteItem.style.transform = "rotate(0deg)";
        lineItem.style.transform = "rotate(" + degree / 2 + "deg)";
        degreeArr.push(0);
      } else {
        rouletteItem.style.transform = "rotate(" + degree * i + "deg)";
        lineItem.style.transform =
          "rotate(" + (degree / 2 + degree * i) + "deg)";
        degreeArr.push((360 / items.length) * i);
      }
      rouletteItem.textContent = items[i];
      rouletteItemWrapper.appendChild(rouletteItem);
      rouletteItemWrapper.appendChild(spinBtn);
      if (items.length > 1) {
        lineWrapper.appendChild(lineItem);
      }

      itemWrapper.classList.add("item-wrapper");
      itemInput.classList.add("item");
      if(!isActive){
        itemInput.classList.add('dark');
      }
      itemInput.value = items[i];
      itemInput.addEventListener("keyup", function (event) {
        const rouletteItems = document.querySelectorAll(".roulette-item");
        const input = event.target;
        const itemWrappers = document.querySelectorAll(".item-wrapper");
        // let index;

        itemWrappers.forEach((wrapper, i) => {
          if (wrapper.contains(input)) {
            // index = i;
            items[i] = input.value;
            rouletteItems[i].textContent = input.value;
          }
        });
      });

      deleteItemBtn.classList.add("delete-item-btn");
      deleteItemBtn.textContent = "삭제";
      deleteItemBtn.addEventListener("click", function (e) {
        if (cnt > 1) {
          cnt--;
          const btn = e.target;
          const itemWrappers = document.querySelectorAll(".item-wrapper");
          itemWrappers.forEach((wrapper, i) => {
            if (wrapper.contains(btn)) {
              // index = i;
              items.splice(i, 1);
              degreeArr = [];
              createRoulette();
            }
          });
        }
      });
      itemWrapper.appendChild(itemInput);
      itemWrapper.appendChild(deleteItemBtn);
      itemContainer.appendChild(itemWrapper);
    }
    addItemBtn.className = "add-item-btn";
    if(!isActive){
      addItemBtn.classList.add('dark');
    }
    addItemBtn.textContent = "추가하기";
    itemContainer.appendChild(addItemBtn);
  }
  createRoulette();

  addItemBtn.className = "add-item-btn";
  if(!isActive){
    addItemBtn.classList.add('dark');
  }
  addItemBtn.textContent = "추가하기";
  itemContainer.appendChild(addItemBtn);
  addItemBtn.addEventListener("click", function () {
    if(items.length < 12){
      cnt++;
      items.push(cnt);
      degreeArr = [];
      createRoulette();
    } else{
      document.querySelector('.alert-modal').style.display = 'block';
      setTimeout(() => {
        document.querySelector('.alert-modal').style.display = 'none';
      }, 2000);
    }
  });
};

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

const rouletteOuter = document.querySelector('.roulette-outer');
const roulette = document.querySelector('.roulette');
const itemInputs = document.querySelectorAll('.item');
const deleteBtns = document.querySelectorAll('delete-item-btn');
// const modalContent = document.querySelector('.modal-content');
// const closeModalBtn = document.querySelector('.close-modal-btn');
const ul = document.querySelector('.all-result-container ul');
const li = document.querySelectorAll('.all-result-container ul li');
const liFirstDiv = document.querySelectorAll('.all-result-container ul li > div:nth-child(1)');
const alertMadalContent = document.querySelector('.alert-modal-content');

var isActive = true;
// 다크모드
toggleList.forEach(($toggle) => {
  $toggle.onclick = () => {

    const lines = document.querySelectorAll('.line');
    const inputs = document.querySelectorAll('.item-container .item-wrapper input');
    const addItemBtn = document.querySelector('.add-item-btn');
    isActive = $toggle.classList.contains("active");
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

      rouletteOuter.classList.remove('dark');
      roulette.classList.remove('dark');
      for(i of lines){
        i.classList.remove('dark');
      }
      for(i of itemInputs){
        i.classList.remove('dark');
      }
      for(i of deleteBtns){
        i.classList.remove('dark');
      }
      for(i of inputs){
        i.classList.remove('dark');
      }
      addItemBtn.classList.remove('dark');
      // modalContent.classList.remove('dark');
      // closeModalBtn.classList.remove('dark');

      ul.classList.remove('dark');
      for(i of li){
        i.classList.remove('dark');
      }
      for(i of liFirstDiv){
        i.classList.remove('dark');
      }

      alertMadalContent.classList.remove('dark');
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

      rouletteOuter.classList.add('dark');
      roulette.classList.add('dark');
      for(i of lines){
        i.classList.add('dark');
      }
      for(i of itemInputs){
        i.classList.add('dark');
      }
      for(i of deleteBtns){
        i.classList.add('dark');
      }
      for(i of inputs){
        i.classList.add('dark');
      }
      addItemBtn.classList.add('dark');
      // modalContent.classList.add('dark');
      // closeModalBtn.classList.add('dark');

      ul.classList.add('dark');
      for(i of li){
        i.classList.add('dark');
      }
      for(i of liFirstDiv){
        i.classList.add('dark');
      }

      alertMadalContent.classList.add('dark');
    }
  };
});