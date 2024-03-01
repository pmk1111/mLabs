const body = document.querySelector("body");
const nav = document.querySelector(".nav_bar");
const logoImg = document.querySelector('.logo');
const title = document.querySelector('.title');
const apps = document.querySelector('.app-icon');

const toggleList = document.querySelectorAll(".toggleSwitch");
const toggleImg = document.querySelector(".display_mode_icon");

const lottoContainer = document.querySelector(".lotto_machine_container");
const LottogenerateBtn = document.querySelector(".num_generate_btn");
const lottoNumWrap = document.querySelectorAll(".lotto_num_wrap");
const lottoNum = document.querySelectorAll(".lotto_num");

const generateTxtDiv = document.querySelector(".top_bg");
const lottoNumContainer = document.querySelector(".lotto_num_container");
const topBgSpan = document.querySelector(".top_bg span");
const th = document.querySelectorAll("table tr th");
const td = document.querySelectorAll("table tr td");

const footer = document.querySelector("footer");
const menuBtn = document.querySelector(".menu_btn");
const menu = document.querySelector(".menu");
const menuLink = document.querySelectorAll(".menu_container a");

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

      LottogenerateBtn.classList.remove("btn_dark");
      LottogenerateBtn.classList.add("btn_lite");

      generateTxtDiv.classList.remove("top_bg_dark");
      lottoNumContainer.classList.remove("lotto_num_container_dark");
      topBgSpan.classList.remove("span_dark");
      for(item of th){
        item.classList.remove("th_dark");
      }
      for(item of td){
        item.classList.remove("td_dark");
      }

      menuBtn.classList.remove("menu_btn_dark");
      menu.classList.remove("menu_dark");
      for(item of menuLink){
        item.classList.remove("link_dark");
      }

      footer.classList.remove("footer_dark");
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

      LottogenerateBtn.classList.remove("btn_lite");
      LottogenerateBtn.classList.add("btn_dark");

      generateTxtDiv.classList.add("top_bg_dark");
      lottoNumContainer.classList.add("lotto_num_container_dark");
      topBgSpan.classList.add("span_dark");
      for(item of th){
        item.classList.add("th_dark");
      }
      for(item of td){
        item.classList.add("td_dark");
      }

      menuBtn.classList.add("menu_btn_dark");
      menu.classList.add("menu_dark");
      for(item of menuLink){
        item.classList.add("link_dark");
      }

      footer.classList.add("footer_dark");
    }
  };
});

let generating = false; // 생성 중인지 여부를 나타내는 플래그

LottogenerateBtn.addEventListener("click", async function () {
  if (generating) {
    return;
  }
  generating = true; // 생성 중 플래그를 활성화
  let lottoNumGroup = document.createElement('div');
  lottoNumGroup.classList.add('lotto-num-group')
  lottoNumContainer.appendChild(lottoNumGroup);

  let lottoNum = [document.createElement('div'), document.createElement('div'), document.createElement('div'), 
                  document.createElement('div'), document.createElement('div'), document.createElement('div')];
  for(item of lottoNum){
    item.classList.add('lotto_num_wrap');
    lottoNumGroup.appendChild(item);
  }
  lottoContainer.classList.add("vibration");
  // Set을 사용하여 중복을 방지하고 유일한 숫자를 저장
  let createdLottoNum = new Set();
  // lottoNumWrap[0].classList.remove("fade-in");
  await sleep(100);

  // 기존 로또 번호 초기화
  // for (let i = 0; i < 6; i++) {
  //   lottoNumWrap[i].style.backgroundColor = "";
  //   lottoNumWrap[i].classList.remove("fade-in");
  //   lottoNum[i].textContent = "";
  // }

  // 중복을 피하면서 유일한 숫자를 생성
  while (createdLottoNum.size < 6) {
    let ran = Math.floor(Math.random() * 45) + 1;
    createdLottoNum.add(ran);
  }
  // Set을 배열로 변환
  const sortedArray = [...createdLottoNum].sort((a, b) => a - b);

  // 정렬된 배열을 다시 Set으로 변환 (중복 제거를 위해)
  const sortedLottoSet = new Set(sortedArray);

  // Set에서 숫자를 꺼내서 화면에 출력
  let index = 0;
  // for (let num of sortedLottoSet) {
  //   if (num <= 10) {
  //     lottoNumWrap[index].style.backgroundColor = "#FFC107";
  //   } else if (num <= 20) {
  //     lottoNumWrap[index].style.backgroundColor = "#007BFF";
  //   } else if (num <= 30) {
  //     lottoNumWrap[index].style.backgroundColor = "#DC3545";
  //   } else if (num <= 40) {
  //     lottoNumWrap[index].style.backgroundColor = "grey";
  //   } else {
  //     lottoNumWrap[index].style.backgroundColor = "#28A745";
  //   }
  //   lottoNum[index].textContent = num;
  //   lottoNumWrap[index].classList.add("fade-in");
  //   index++;
  //   await sleep(500);
  // }

  for (let num of sortedLottoSet) {
    if (num <= 10) {
      lottoNum[index].style.backgroundColor = "#FFC107";
    } else if (num <= 20) {
      lottoNum[index].style.backgroundColor = "#007BFF";
    } else if (num <= 30) {
      lottoNum[index].style.backgroundColor = "#DC3545";
    } else if (num <= 40) {
      lottoNum[index].style.backgroundColor = "grey";
    } else {
      lottoNum[index].style.backgroundColor = "#28A745";
    }
    lottoNum[index].textContent = num;
    lottoNum[index].classList.add("fade-in");
    index++;
    await sleep(500);
  }
  lottoContainer.classList.remove("vibration");
  generating = false; // 생성 완료 후 플래그를 비활성화
});

function shareTwitter() {
  var sendText = "복권번호생성기"; // 전달할 텍스트
  var sendUrl = "https://lotto-generate.netlify.app/"; // 전달할 URL
  window.open("https://twitter.com/intent/tweet?text=" + sendText + "&url=" + sendUrl);
}

function shareFacebook() {
  var sendUrl = "https://lotto-generate.netlify.app/"; // 전달할 URL
  window.open("http://www.facebook.com/sharer/sharer.php?u=" + sendUrl);
}

function shareKakao() {

  // 사용할 앱의 JavaScript 키 설정
  Kakao.init('6f5ea40ee55ec91e85fefece59d53254');

  // 카카오링크 버튼 생성
  Kakao.Link.createDefaultButton({
    container: '#btnKakao', // 카카오공유버튼ID
    objectType: 'feed',
    content: {
      title: "로또번호생성기", // 보여질 제목
      description: "자동으로 로또번호를 생성하세요!", // 보여질 설명
      imageUrl: "https://lotto-generate.netlify.app/", // 콘텐츠 URL
      link: {
         mobileWebUrl: "https://lotto-generate.netlify.app/",
         webUrl: "https://lotto-generate.netlify.app/"
      }
    }
  });
}
function shareNaver() {
  let url = "https://lotto-generate.netlify.app/";
  let title = "로또번호생성기";
  let shareURL = "https://share.naver.com/web/shareView?url=" + url + "&title=" + title;
  document.location = shareURL;
}


