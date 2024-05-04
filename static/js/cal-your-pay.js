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

const minPayWrap = document.querySelector('.min-pay-wrap');
const selectBoxs = document.querySelectorAll('select');
const payInput = document.querySelector('.your-pay');
const rangeInput = document.querySelector('input[type="range"]');
const paymentType = document.querySelector(".payment-type");
const resultType = document.querySelector(".result-type");
const datePerWeek = document.querySelector(".date-per-week");
const taxType = document.querySelector(".tax-type");

const taxTypeTxt = document.querySelector(".tax-type-txt");
let payTypeTxt = document.querySelector(".pay-type-txt");

const hour = document.querySelector(".hour");
let selectedHour = document.querySelector(".hour-txt");
selectedHour.textContent = hour.value;

const doCalBtn = document.querySelector(".do-cal-btn");
const clearBtn = document.querySelector(".clear-btn");

const overtimeWrap = document.querySelector('.overtime-wrap');
const overtimeValWrap = document.querySelector('.overtime-val-wrap');
const paymentWrap = document.querySelector('.my-pay-wrap');
const allowanceWrap = document.querySelector('.allowance-wrap');
const taxWrap = document.querySelector('.tax-wrap')
let payWithoutAllowance = document.querySelector(".without-allowance");
let allowance = document.querySelector(".allowance");
const overtime = document.querySelector(".overtime")
let totalTax = document.querySelector(".total-tax");
let totalPayment = document.querySelector(".total-payment");


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

      for(i of selectBoxs){
        i.classList.remove('dark');
      }
      minPayWrap.classList.remove('dark');
      payInput.classList.remove('dark');
      rangeInput.classList.remove('dark');
      doCalBtn.classList.remove('dark');
      clearBtn.classList.remove('dark');
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

      for(i of selectBoxs){
        i.classList.add('dark');
      }
      minPayWrap.classList.add('dark');
      payInput.classList.add('dark');    
      rangeInput.classList.add('dark');
      doCalBtn.classList.add('dark');
      clearBtn.classList.add('dark');
    }
  };
});

clearBtn.addEventListener('click', function(){
  location.reload(true);
});

paymentType.addEventListener("change", function () {
  const selectedPaymentType = paymentType.value;
  resultType.innerHTML = "";

  // 선택된 payment-type에 따라 결과 타입 옵션을 동적으로 생성
  if (selectedPaymentType === "시급") {
    resultType.innerHTML += `
      <option>일급</option>
      <option>주급</option>
      <option>월급</option>
      <option>연봉</option>
  `;
  } else if (selectedPaymentType === "일급") {
    resultType.innerHTML += `
      <option>시급</option>
      <option>주급</option>
      <option>월급</option>
      <option>연봉</option>
  `;
    payTypeTxt.textContent = "일급";
  } else if (selectedPaymentType === "주급") {
    resultType.innerHTML += `
      <option>시급</option>
      <option>일급</option>
      <option>월급</option>
      <option>연봉</option>
  `;
    payTypeTxt.textContent = "주급";
  } else if (selectedPaymentType === "월급") {
    resultType.innerHTML += `
      <option>시급</option>
      <option>일급</option>
      <option>주급</option>
      <option>연봉</option>
  `;
    payTypeTxt.textContent = "월급";
  } else if (selectedPaymentType === "연봉") {
    resultType.innerHTML += `
      <option>시급</option>
      <option>일급</option>
      <option>주급</option>
      <option>월급</option>
  `;
    payTypeTxt.textContent = "연봉";
  }
});

resultType.addEventListener('change', function(){
  if(resultType.value === '일급'){
    overtimeWrap.style.display = 'none';
  } else{
      overtimeWrap.style.display = 'block';
  }
});

hour.addEventListener("input", function () {
  selectedHour.textContent = hour.value;
});

doCalBtn.addEventListener("click", function () {
  const pay = document.querySelector(".your-pay").value.trim();

  if (isNaN(pay) || pay === "") {
    alert("유효한 숫자를 입력하세요.");
    return; // 숫자가 아닌 경우 함수를 여기서 종료합니다.
  }

  const selectedPaymentType = paymentType.value;
  const selectedResultType = resultType.value;
  const hourPerDay = hour.value;
  const selectedWorkDay = datePerWeek.value;
  const selectedTaxType = taxType.value;
  const overtimeSelector = document.querySelector('.overtime-selector');

  let payVal = 0;
  let allowanceVal = 0;
  let overtimeVal = 0;
  let totalPayVal = 0;

  switch (selectedPaymentType) {
    case "시급":
      if (selectedResultType === "일급") {
        payVal = Math.round(pay * hourPerDay);
        payWithoutAllowance.textContent = payVal;
        totalPayment.textContent = payVal;
      } else {
        if (selectedResultType === "주급") {
          payVal = Math.round(pay * hourPerDay) * selectedWorkDay;
        } else if (selectedResultType === "월급") {
          payVal = Math.round(pay * hourPerDay) * selectedWorkDay * 4.345;
        } else {
          payVal =
            Math.round(pay * hourPerDay) * selectedWorkDay * 52.143;
        }

        if (hourPerDay * selectedWorkDay >= 15) {
          switch (selectedResultType) {
            case "주급":
              allowanceVal =
                (pay / 40) * (hourPerDay * selectedWorkDay) * 8;
              break;
            case "월급":
              allowanceVal =
                (pay / 40) * (hourPerDay * selectedWorkDay) * 8 * 4.345;
              break;
            case "연봉":
              allowanceVal =
                (pay / 40) * (hourPerDay * selectedWorkDay) * 8 * 52.143;
              break;
          }
        }
        overtimeVal = pay * overtimeSelector.value * 1.5;
        console.log(overtimeVal)
      }
      switch (selectedTaxType) {
        case "적용안함":
          if(overtimeVal !== 0){
            totalPayVal = payVal + allowanceVal + overtimeVal;
          } else{
            totalPayVal = payVal + allowanceVal;
          }
          break;
        case "4대보험(9.32%)":
          if(overtimeVal !== 0){
            totalPayVal = Math.round(((payVal + allowanceVal + overtimeVal) / 10000) * 9068);
          } else{
            totalPayVal = Math.round(((payVal + allowanceVal) / 10000) * 9068);
          }
          break;
        case "소득세(3.3%)":
          if(overtimeVal !== 0){
            totalPayVal = Math.round(((payVal + allowanceVal + overtimeVal) / 1000) * 967);
          } else{
            totalPayVal = Math.round(((payVal + allowanceVal) / 1000) * 967);
          }
          break;
      }
      break;
    case "일급":
      if (selectedResultType === "시급") {
        switch (selectedTaxType) {
          case "적용안함":
            payVal = Math.round(pay / hourPerDay);
            break;
          case "4대보험(9.32%)":
            payVal = Math.round((pay / hourPerDay / 10000) * 9068);
            break;
          case "소득세(3.3%)":
            payVal = Math.round((pay / hourPerDay / 1000) * 967);
            break;
        }
        payWithoutAllowance.textContent = payVal;
        totalPayment.textContent = payVal;
      } else {
        switch (selectedResultType) {
          case "주급":
            payVal = Math.round(pay * selectedWorkDay);
            break;
          case "월급":
            payVal = Math.round(pay * selectedWorkDay) * 4.345;
            break;
          case "연봉":
            payVal = Math.round(pay * selectedWorkDay) * 52.143;
            break;
        }

        if (hourPerDay * selectedWorkDay >= 15) {
          switch (selectedResultType) {
            case "주급":
              allowanceVal = (pay / 40) * selectedWorkDay * 8;
              break;
            case "월급":
              allowanceVal = (pay / 40) * selectedWorkDay * 8 * 4.345;
              break;
            case "연봉":
              allowanceVal = (pay / 40) * selectedWorkDay * 8 * 52.143;
              break;
          }
        }

        switch (selectedTaxType) {
          case "적용안함":
            totalPayVal = payVal + allowanceVal;
            break;
          case "4대보험(9.32%)":
            totalPayVal = Math.round(
              ((payVal + allowanceVal) / 10000) * 9068
            );
            break;
          case "소득세(3.3%)":
            totalPayVal = Math.round(
              ((payVal + allowanceVal) / 1000) * 967
            );
            break;
        }
      }
      break;
    case "주급":
      if (selectedResultType === "시급") {
        payVal = Math.round(pay / (hourPerDay * selectedWorkDay));
        payWithoutAllowance.textContent = payVal;
        totalPayment.textContent = payVal;
      } else if (selectedResultType === "일급") {
        payVal = pay / selectedWorkDay;
        payWithoutAllowance.textContent = payVal;
        totalPayment.textContent = payVal;
      } else {
        switch (selectedResultType) {
          case "월급":
            payVal = pay * 4.345;
            break;
          case "연봉":
            payVal = pay * 52.143;
            break;
        }

        if (hourPerDay * selectedWorkDay >= 15) {
          switch (selectedResultType) {
            case "주급":
              allowanceVal = (pay / 40) * 8;
              break;
            case "월급":
              allowanceVal = (pay / 40) * 8 * 4.345;
              break;
            case "연봉":
              allowanceVal = (pay / 40) * 8 * 52.143;
              break;
          }
        }
      }

      switch (selectedTaxType) {
        case "적용안함":
          totalPayVal = payVal + allowanceVal;
          break;
        case "4대보험(9.32%)":
          totalPayVal = Math.round(
            ((payVal + allowanceVal) / 10000) * 9068
          );
          break;
        case "소득세(3.3%)":
          totalPayVal = Math.round(
            ((payVal + allowanceVal) / 1000) * 967
          );
          break;
      }
      break;
    case "월급":
      switch (selectedResultType) {
        case "시급":
          payVal = Math.round(pay / selectedWorkDay / hourPerDay / 4.345);
          break;
        case "일급":
          payVal = Math.round(pay / selectedWorkDay / 4.345);
          break;
        case "주급":
          payVal = Math.round(pay / 4.345);
          break;
        case "연봉":
          payVal = Math.round(pay * 12);
          allowanceVal = (pay / 40) * 8 * 12;
          break;
      }

      switch (selectedTaxType) {
        case "적용안함":
          totalPayVal = payVal + allowanceVal;
          break;
        case "4대보험(9.32%)":
          totalPayVal = Math.round(
            ((payVal + allowanceVal) / 10000) * 9068
          );
          break;
        case "소득세(3.3%)":
          totalPayVal = Math.round(
            ((payVal + allowanceVal) / 1000) * 967
          );
          break;
      }
      break;
    case "연봉":
      switch (selectedResultType) {
        case "시급":
          payVal = Math.round(
            pay / selectedWorkDay / hourPerDay / 4.345 / 12
          );
          break;
        case "일급":
          payVal = Math.round(pay / selectedWorkDay / 4.345 / 12);
          break;
        case "주급":
          payVal = Math.round(pay / 4.345 / 12);
          break;
        case "월급":
          payVal = Math.round(pay / 12);
          break;
      }

      switch (selectedTaxType) {
        case "적용안함":
          totalPayVal = payVal;
          break;
        case "4대보험(9.32%)":
          totalPayVal = Math.round((payVal / 10000) * 9068);
          break;
        case "소득세(3.3%)":
          totalPayVal = Math.round((payVal / 1000) * 967);
          break;
      }
      break;
  }

  switch (selectedTaxType) {
    case "적용안함":
      taxTypeTxt.textContent = '';
      break;
    case "4대보험(9.32%)":
      taxTypeTxt.textContent = "4대보험(9.32%)"
      break;
    case "소득세(3.3%)":
      taxTypeTxt.textContent = "소득세(3.3%)"
      break;
  }

  payWithoutAllowance.textContent = payVal;
  allowance.textContent = allowanceVal;
  overtime.textContent = overtimeVal;
  totalTax.textContent = "-" + (payVal + allowanceVal + overtimeVal - totalPayVal);
  totalPayment.textContent = totalPayVal;

  if(allowance.textContent == 0){
    allowanceWrap.style.display = 'none';
  } else{
    allowanceWrap.style.display = 'flex';
  }

  if(overtime.textContent == 0){
    overtimeValWrap.style.display = 'none';
  } else{
    overtimeValWrap.style.display = 'flex';
  }

  if(totalTax.textContent == 0){
    taxWrap.style.display = 'none';
  } else{
    taxWrap.style.display = 'flex';
  }

  paymentWrap.style.display = 'block';
});

// 연장수당 select option 생성
const select = document.querySelector('.overtime-selector');

let value = 0.5;

while (value <= 60) {
  const hours = Math.floor(value / 1);
  const minutes = (value % 1) * 60;

  const option = document.createElement('option');

  option.value = value.toString();
  if (hours === 0) {
    option.textContent = `${minutes}분`;
  } else if(minutes === 0){
    option.textContent = `${hours}시간`;
  } else {
    option.textContent = `${hours}시간 ${minutes}분`;
  }

  select.appendChild(option);
  value += 0.5;
}
