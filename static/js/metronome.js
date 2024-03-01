import Timer from "./timer.js";

const tempoDisplay = document.querySelector(".tempo");
const bpmText = document.querySelector(".bpm");
const tempoText = document.querySelector(".tempo-text");
const decreaseTempoBtn = document.querySelector(".decrease-tempo");
const increaseTempoBtn = document.querySelector(".increase-tempo");
const tempoSlider = document.querySelector(".tempo-slider");
const selectedCntWrapper = document.querySelector(".selected-cnt-wrapper");
const startStopBtn = document.querySelector(".start-stop");
const subtrackBeats = document.querySelector(".subtrack-beats");
const addBeats = document.querySelector(".add-beats");
const measureCount = document.querySelector(".measure-count");
const beatsPerMeasureText = document.querySelector(".beats-per-measure-text");

const click1 = new Audio("/audio/click1.mp3");
const click2 = new Audio("/audio/click2.mp3");

let bpm = 140;
let cnt = 0;
let selectedNow = 0;
let beatsPerMeasure = 4;
let isPlaying = false;
let tempoTextStr = "Medium";
let selectedCnts = [];

const body = document.querySelector("body");
const nav = document.querySelector("nav");
const logoImg = document.querySelector('.logo');
const title = document.querySelector('.title');
const apps = document.querySelector('.app-icon');
const toggleList = document.querySelectorAll(".toggleSwitch");
const toggleImg = document.querySelector(".display_mode_icon");

const menuBtn = document.querySelector(".menu_btn");
const menu = document.querySelector(".menu");

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
      logoImg.setAttribute('src', '/images/logo_black.svg');
      title.style.color = 'black';
      apps.setAttribute('src','images/apps-black.svg');
      main.classList.remove("main_dark");

      menuBtn.classList.remove("menu_btn_dark");
      menu.classList.remove("menu_dark");
      for(let i=0;i<menuLink.length;i++){
        menuLink[i].classList.remove("link_dark");
      }
      
      tempoDisplay.classList.remove("tempo-dark");
      bpmText.classList.remove("bpm-dark");
      tempoText.classList.remove("tempo-text-dark");
      tempoSlider.classList.remove("tempo-slider-dark");
      decreaseTempoBtn.classList.remove("decrease-tempo-dark");
      increaseTempoBtn.classList.remove("increase-tempo-dark");
      startStopBtn.classList.remove("start-stop-dark");
      subtrackBeats.classList.remove("subtrack-beats-dark");
			addBeats.classList.remove("add-beats-dark");
			measureCount.classList.remove("measure-count-dark");
			beatsPerMeasureText.classList.remove("beats-per-measure-text-dark");

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
      for(let i=0;i<menuLink.length;i++){
        menuLink[i].classList.add("link_dark");
      }
      
      tempoDisplay.classList.add("tempo-dark");
      bpmText.classList.add("bpm-dark");
      tempoText.classList.add("tempo-text-dark");
      tempoSlider.classList.add("tempo-slider-dark");
      decreaseTempoBtn.classList.add("decrease-tempo-dark");
      increaseTempoBtn.classList.add("increase-tempo-dark");
      startStopBtn.classList.add("start-stop-dark");
      subtrackBeats.classList.add("subtrack-beats-dark");
			addBeats.classList.add("add-beats-dark");
			measureCount.classList.add("measure-count-dark");
			beatsPerMeasureText.classList.add("beats-per-measure-text-dark");
      
      footer.classList.add("footer_dark");
      helpIcon.setAttribute('src', '/images/help-white.svg');
      modalContent.classList.add('dark');
      closeModalBtn.setAttribute('src', '/images/deletebtn-white.svg');
    }
  }
});




//metronome function start
function addCntDots() {
  selectedCnts = [];
  selectedCntWrapper.innerHTML = "";
  for (let i = 0; i < beatsPerMeasure; i++) {
    let selectedCnt = document.createElement("div");
    selectedCnt.classList.add("selected-cnt");
    selectedCntWrapper.append(selectedCnt);
    selectedCnts.push(selectedCnt);
  }
}
addCntDots();
tempoSlider.value = bpm;

startStopBtn.addEventListener("click", () => {
  cnt = 0;
  if (!isPlaying) {
    metronome.start();
    isPlaying = true;
    startStopBtn.textContent = "STOP";
    startStopBtn.classList.add("running");
  } else {
    metronome.stop();
    isPlaying = false;
    startStopBtn.textContent = "START";
    startStopBtn.classList.remove("running");
    
    selectedCnts[0].classList.remove("cnt-first");
    for(let i=1;i<selectedCnts.length;i++){
        selectedCnts[i].classList.remove("cnt-rest");
    }
  }
});

decreaseTempoBtn.addEventListener("click", () => {
  bpm--;
  validateTempo();
  updateMetronome();
});
increaseTempoBtn.addEventListener("click", () => {
  bpm++;
  validateTempo();
  updateMetronome();
});
tempoSlider.addEventListener("input", () => {
  bpm = tempoSlider.value;
  updateMetronome();
});
subtrackBeats.addEventListener("click", () => {
  if (beatsPerMeasure <= 1) {return;}
  beatsPerMeasure--;
  measureCount.textContent = beatsPerMeasure;
  cnt = 0;
  addCntDots();
});
addBeats.addEventListener("click", () => {
  if (beatsPerMeasure >= 12) {return;}
  beatsPerMeasure++;
  measureCount.textContent = beatsPerMeasure;
  cnt = 0;
  addCntDots();
});

function updateMetronome() {
  tempoDisplay.textContent = bpm;
  tempoSlider.value = bpm;
  metronome.timeInterval = 60000 / bpm;
  if (bpm <= 40) {tempoTextStr = "You're too sloowwww";}
  if (bpm >= 40 && bpm <= 50) {tempoTextStr = "Largo";}
  if (bpm >= 40 && bpm <= 60) {tempoTextStr = "Larghetto";}
  if (bpm >= 60 && bpm <= 70) {tempoTextStr = "Adagio";}
  if (bpm >= 70 && bpm <= 80) {tempoTextStr = "Andante";}
  if (bpm >= 80 && bpm <= 100) {tempoTextStr = "Andante Moderato";}
  if (bpm >= 100 && bpm <= 120) {tempoTextStr = "Allegro moderato";}
  if (bpm >= 120 && bpm <= 140) {tempoTextStr = "Allegro";}
  if (bpm >= 140 && bpm <= 150) {tempoTextStr = "Allegrissimo";}
  if (bpm >= 150 && bpm <= 170) {tempoTextStr = "Vivace";}
  if (bpm >= 170 && bpm <= 180) {tempoTextStr = "Vivacissimo";}
  if (bpm >= 180 && bpm <= 200) {tempoTextStr = "Presto";}
  if (bpm > 200 && bpm <= 300) {tempoTextStr = "Prestissimo";}

  tempoText.textContent = tempoTextStr;
}
function validateTempo() {
  if (bpm <= 20 || bpm >= 300) {return;}
}

function playClick() {
  if (cnt === beatsPerMeasure) {cnt = 0;}
  if (cnt === 0) {
    click1.play();
    click2.currentTime = 0;
  } else {
    click2.play();
    click2.currentTime = 0;
  }
  addDotsBg(cnt);
  cnt++;
}

function addDotsBg(cnt){
    if(cnt === 0){
        selectedCnts[0].classList.add("cnt-first");
        selectedCnts[selectedCnts.length - 1].classList.remove("cnt-rest");
    } else{
        if (selectedCnts[0].classList.contains("cnt-first")) {
            selectedCnts[0].classList.remove("cnt-first");
          }
          selectedCnts[cnt].classList.add("cnt-rest");
          selectedCnts[cnt - 1].classList.remove("cnt-rest");
    }
}
const metronome = new Timer(playClick, 60000 / bpm, {immediate: true});

openHelp.addEventListener('click', function(){
  helpModal.style.display = 'block';
});

closeModalBtn.addEventListener('click', function(){
  helpModal.style.display = 'none';
});

modalOverlay.addEventListener('click', function(){
  helpModal.style.display = 'none';
});