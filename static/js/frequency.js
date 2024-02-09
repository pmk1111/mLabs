const body = document.querySelector("body");
const nav = document.querySelector("nav");

const toggleList = document.querySelectorAll(".toggleSwitch");
const toggleImg = document.querySelector(".display_mode_icon");

const menuBtn = document.querySelector(".menu_btn");
const menu = document.querySelector(".menu");
const menuLink = document.querySelectorAll(".menu_container a");

const waveLabels = document.querySelectorAll(".custom-radio + label");
const range = document.querySelector("#bar_frequency");
const frequencyInput = document.querySelector("#span_frequency");
const generateBtn = document.querySelector("#btn");

const htu = document.querySelector(".how_to_use");
const descH3 = document.querySelector(".htu_h3");
const description = document.querySelector(".description");

const autoCheckBox = document.querySelector('label[for="auto_increment"]');
const th = document.querySelectorAll("th");
const td = document.querySelectorAll("td");

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
      body.classList.add("lite");

      menuBtn.classList.remove("menu_btn_dark");
      menu.classList.remove("menu_dark");
      for(item of menuLink){
        item.classList.remove("link_dark");
      }

      nav.classList.remove("nav_dark");

      for (let label of waveLabels) {
        label.classList.remove("label_dark");
      }
      range.classList.remove("range_dark");
      frequencyInput.classList.remove("input_dark");
      generateBtn.classList.remove("btn_dark");

      htu.classList.remove("htu_dark");
      descH3.classList.remove("htu_h3_dark");
      description.classList.remove("desc_dark");

      autoCheckBox.classList.remove("check_dark");

      for(let item of th){
        item.classList.remove("th_dark");
      }
      for(let item of td){
        item.classList.remove("td_dark");
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
      for(item of menuLink){
        item.classList.add("link_dark");
      }

      for (let label of waveLabels) {
        label.classList.add("label_dark");
      }
      range.classList.add("range_dark");
      frequencyInput.classList.add("input_dark");
      generateBtn.classList.add("btn_dark");
      
      htu.classList.add("htu_dark");
      descH3.classList.add("htu_h3_dark");
      description.classList.add("desc_dark");

      autoCheckBox.classList.add("check_dark");
      for(let item of th){
        item.classList.add("th_dark");
      }
      for(let item of td){
        item.classList.add("td_dark");
      }

      footer.classList.add("footer_dark");
    }
  };
});

// 주파수 관련 동작
// 1. AudioContext 생성
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// 2. 소스 Node(OscillatorNode) 변수 생성
let oscillatorNode = null;

// 3. 작업Node(GainNode: 볼륨 설정) 생성: 볼륨을 0.5로 설정 (0~1 사이)
const gainNode = audioContext.createGain();
gainNode.gain.value = 0.5;


let autoIncrementInterval;
let originalFrequencyValue; // 추가된 변수
// 재생여부 변수
let isPlaying = false;

// 재생/정지 버튼 이벤트
document.getElementById("btn").onclick = (event) => {
  // 사용자 제스처가 있어야만 audioContext가 작동하기 때문에, 여기서 재가동해준다.
  audioContext.resume();

  if (!isPlaying) {
    // OscillatorNode는 1회만 재생 가능하기 때문에
    // 새로 재생할 때마다 새로 OscillatorNode를 생성해주어야 한다.
    oscillatorNode = audioContext.createOscillator();

    oscillatorNode.frequency.value = document.querySelector("#bar_frequency").value;
    oscillatorNode.type = document.querySelector('input[name="wave"]:checked').value;
    oscillatorNode.connect(gainNode).connect(audioContext.destination);

    if (document.getElementById("auto_increment").checked) {
      // 자동 증가 시작 시 현재 주파수 값 저장
      originalFrequencyValue = parseInt(document.getElementById("span_frequency").value);
      startAutoIncrement();
    }

    oscillatorNode.start();
    isPlaying = true;
  } else {
    // 정지
    oscillatorNode.stop();
    stopAutoIncrement();
    isPlaying = false;
  }
};

function updateFrequency() {
	let frequencyVal = document.querySelector("#bar_frequency").value;
  const spanFrequencyInput = document.getElementById("span_frequency");
	
  if (document.getElementById("auto_increment").checked) {
    // 자동 증가 중일 때는 spanFrequencyInput.value를 사용
    if(oscillatorNode){
      oscillatorNode.frequency.value = parseInt(spanFrequencyInput.value);
      document.getElementById("bar_frequency").value = oscillatorNode.frequency.value; 
    }
  } else {
    // 자동 증가 중이 아니면 bar_frequency의 값을 사용
    if(oscillatorNode){
      oscillatorNode.frequency.value = parseInt(document.getElementById("bar_frequency").value);
    }
  }
	spanFrequencyInput.value = frequencyVal;
  // 현재 주파수 표시
  if(oscillatorNode){
    spanFrequencyInput.value = oscillatorNode.frequency.value;
  }
}

function updateBarFrequency() {
  // span_frequency의 현재 값 가져오기
  let frequencyInput = document.getElementById("span_frequency").value;

   // 자동 증가 중일 때는 spanFrequencyInput.value를 사용
   if(oscillatorNode){
    oscillatorNode.frequency.value = parseInt(spanFrequencyInput.value);
    document.getElementById("bar_frequency").value = oscillatorNode.frequency.value; 
  }

  // bar_frequency 업데이트
  document.getElementById("bar_frequency").value = frequencyInput;

  // 현재 주파수 표시 업데이트
  document.getElementById("display_frequency").innerText = frequencyInput;
}

// 파형 조정 이벤트(재생 중)
document.querySelectorAll("input.radio_wave").forEach((el, idx) => {
  el.addEventListener("click", (event) => {
    if (oscillatorNode) {
      oscillatorNode.type = el.value;
    }
  });
});

function startAutoIncrement() {
  //console.log("auto increment");
  autoIncrementInterval = setInterval(() => {
    // 10밀리초마다 span_frequency의 값을 1씩 증가
    const spanFrequencyInput = document.getElementById("span_frequency");
    spanFrequencyInput.value = parseInt(spanFrequencyInput.value) + 1;

    // 주파수 값 갱신
    updateFrequency();
  }, 10);
}

function stopAutoIncrement() {
  //console.log("stop auto increment");
  clearInterval(autoIncrementInterval);

  // 타이머가 멈춘 후 주파수 값 갱신
  updateFrequency();
}

function toggleAutoIncrement() {
  const autoIncrementCheckbox = document.getElementById("auto_increment");

  if (autoIncrementCheckbox.checked && isPlaying) {
    // 자동 증가 체크된 경우, 재생 중일 때만 자동 증가 시작
    startAutoIncrement();
  } else {
    // 자동 증가 체크가 해제되거나 재생 중이 아닌 경우 자동 증가 중지
    stopAutoIncrement();
  }
}

document.getElementById("auto_increment").onchange = toggleAutoIncrement;


// share
function shareTwitter() {
  var sendText = "가청 주파수 테스트"; // 전달할 텍스트
  var sendUrl = "https://frequecny.netlify.app/"; // 전달할 URL
  window.open("https://twitter.com/intent/tweet?text=" + sendText + "&url=" + sendUrl);
}

function shareFacebook() {
  var sendUrl = "https://frequecny.netlify.app/"; // 전달할 URL
  window.open("http://www.facebook.com/sharer/sharer.php?u=" + sendUrl);
}

function shareKakao() {

  // 사용할 앱의 JavaScript 키 설정
  Kakao.init('df11cb3c0ed9347deca09278ead995c7');

  // 카카오링크 버튼 생성
  Kakao.Link.createDefaultButton({
    container: '#btnKakao', // 카카오공유버튼ID
    objectType: 'feed',
    content: {
      title: "가청 주파수 테스트", // 보여질 제목
      description: "내 가청범위를 테스트 및 음향 장비 테스트를 위해 사용하세요.", // 보여질 설명
      imageUrl: "https://frequecny.netlify.app/", // 콘텐츠 URL
      link: {
         mobileWebUrl: "https://frequecny.netlify.app/",
         webUrl: "https://frequecny.netlify.app/"
      }
    }
  });
}

function shareNaver() {
  let url = "https://frequecny.netlify.app/";
  let title = "가청 주파수 테스트";
  let shareURL = "https://share.naver.com/web/shareView?url=" + url + "&title=" + title;
  document.location = shareURL;
}