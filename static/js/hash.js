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

const typeContainer = document.querySelector('.type-container');
const typeRadios = document.querySelectorAll('.type-container input[type="radio"]');
const typeRadioLabels = document.querySelectorAll('.type-container input[type="radio"] + label');
const detailOptSelects = document.querySelectorAll('.type-detail-select')
const sourceTxtArea = document.querySelector(".source-txt");
const btns = document.querySelectorAll(".btn-container button");
const checkbox = document.querySelector('label[for="capitalize"]');

const textAreas = document.querySelectorAll('textarea');

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

      typeContainer.classList.remove('dark');
      for(i of typeRadioLabels){
        i.classList.remove('dark');
      }
      for(i of detailOptSelects){
        i.classList.remove('dark');
      }
      for(i of textAreas){
        i.classList.remove('dark');
      }
      for(i of btns){
        i.classList.remove('dark');
      }
      checkbox.classList.remove('dark');
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

      typeContainer.classList.add('dark');
      for(i of typeRadioLabels){
        i.classList.add('dark');
      }
      for(i of detailOptSelects){
        i.classList.add('dark');
      }
      for(i of textAreas){
        i.classList.add('dark');
      }
      for(i of btns){
        i.classList.add('dark');
      }
      checkbox.classList.add('dark');
    }
  };
});

btns[1].addEventListener('click', function(){
    for(i of textAreas){
        i.value = '';
    }
});

typeRadios.forEach((radio) => {
  radio.addEventListener('change', (e) => {
    const current = e.currentTarget;
    for(i of detailOptSelects){
      i.style.display = 'none';
    }
    switch(current.id){
      case 'sha':
        document.querySelector('.type-detail-select.sha').style.display = 'block';
        break;
      case 'sha3':
        document.querySelector('.type-detail-select.sha3').style.display = 'block';
        break;
      case 'sha1':
        document.querySelector('.type-detail-select.sha1').style.display = 'block';
        break;
      case 'shake':
        document.querySelector('.type-detail-select.shake').style.display = 'block';
        break;
      // case 'md':
      //   document.querySelector('.type-detail-select.md').style.display = 'block';
      //   break;
      case 'crc':
        document.querySelector('.type-detail-select.crc').style.display = 'block';
        break;
      case 'keccak':
        document.querySelector('.type-detail-select.keccak').style.display = 'block';
        break;
    }
  });
});

btns[0].addEventListener("click", function () {
  const capitalCheck = document.querySelector('#capitalize');
  const resultTxtArea = document.querySelector('.result-txt');
  const hashType = document.querySelector('.type-container input[type="radio"]:checked').id;
  const sourceTxt = sourceTxtArea.value;
  let detailOption;
  let convertToCapital;

  switch(hashType){
    case 'sha':
      let shaSelect= document.querySelector('.type-detail-select.sha');
      detailOption = shaSelect.options[shaSelect.selectedIndex].getAttribute('id');
      break;
    case 'sha3':
      let sha3Select= document.querySelector('.type-detail-select.sha3');
      detailOption = sha3Select.options[sha3Select.selectedIndex].getAttribute('id');
      break;
    case 'sha1':
      let sha1Select= document.querySelector('.type-detail-select.sha1');
      detailOption = sha1Select.options[sha1Select.selectedIndex].getAttribute('id');
      break;
    case 'shake':
      let shakeSelect= document.querySelector('.type-detail-select.shake');
      detailOption = shakeSelect.options[shakeSelect.selectedIndex].getAttribute('id');
      break;
    // case 'md':
    //   let mdSelect= document.querySelector('.type-detail-select.md');
    //   detailOption = mdSelect.options[mdSelect.selectedIndex].getAttribute('id');
    //   break;
    case 'crc':
      let crcSelect= document.querySelector('.type-detail-select.crc');
      detailOption = crcSelect.options[crcSelect.selectedIndex].getAttribute('id');
      break;
    case 'keccak':
      let keccakSelect= document.querySelector('.type-detail-select.keccak');
      detailOption = keccakSelect.options[keccakSelect.selectedIndex].getAttribute('id');
      break;
  }

  const url = `/get-hash-text?text=${encodeURIComponent(sourceTxt)}&hashType=${hashType}&detail=${detailOption}`;

  fetch(url, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("반환 결과: ", data.result);
      if(capitalCheck.checked){
        // for (let i = 0; i < data.result.length; i++) {
        //   const char = data.result[i];
        //   if (/[a-zA-Z]/.test(char)) {
        //     convertToCapital += char.toUpperCase();
        //   }
        // }

        resultTxtArea.value = data.result.toUpperCase();
      } else{
        resultTxtArea.value = data.result;
      }
    })
    .catch((error) => {
      console.error("에러 발생: ", error);
    });
});
