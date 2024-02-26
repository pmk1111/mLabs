
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

const btnArea = document.querySelector('.btn-container');
const btns = document.querySelectorAll('.btn-container button');
let fileInput = document.getElementById("fileInput");
const uploadAreaDiv = document.querySelector(".upload-area");
const convertAllBtn = document.querySelector(".convert-all-btn");

const openHelp = document.querySelector('.open-help');
const helpIcon = document.querySelector('.help-icon');
const helpModal = document.querySelector('.help-modal');
const modalOverlay = document.querySelector(".modal-overlay");
const modalContent = document.querySelector('.modal-content');
const closeModalBtn = document.querySelector('.close-modal');

var isActive = true;
// 다크모드
toggleList.forEach(($toggle) => {
  $toggle.onclick = () => {

    isActive = $toggle.classList.contains("active");
    const fileNameDivs = document.querySelectorAll('.file-name-div');
    const thumnailImgs = document.querySelectorAll('.thumbnail img');
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
      btnArea.classList.remove('dark');
      for(item of btns){
        item.classList.remove('dark');
      }
      for(item of thumnailImgs){
        item.classList.remove('dark');
      }
      uploadAreaDiv.classList.remove("dark");
      for(i of fileNameDivs){i.classList.remove('dark')}
      convertAllBtn.classList.remove('dark');
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

      menuBtn.classList.add("menu_btn_dark");
      menu.classList.add("menu_dark");
      for(item of menuLink){
        item.classList.add("link_dark");
      }
      btnArea.classList.add('dark');
      for(item of btns){
        item.classList.add('dark');
      }
      for(item of thumnailImgs){
        item.classList.add('dark');
      }
      uploadAreaDiv.classList.add("dark");
      for(i of fileNameDivs){i.classList.add('dark');}
      convertAllBtn.classList.add('dark');
      footer.classList.add("footer_dark");

      helpIcon.setAttribute('src', '/images/help-white.svg');
      modalContent.classList.add('dark');
      closeModalBtn.setAttribute('src', '/images/deletebtn-white.svg');
    }
  };
});


function handleClick(event) {
  existingFile = Array.from(fileInput.files);
  console.log(existingFile);
  if (event.target.id == "uploadArea" || event.target.id == "addImg" || event.target.className == 'upload-img-btn') {
    fileInput.click();
  }
  return false;
}

function handleFileSelect() {
  const emptyFileList = new DataTransfer().files;
  const newFiles = Array.from(fileInput.files);
  if (newFiles.length + existingFile.length <= 28) {
    const filesArray = existingFile.concat([...newFiles]);

    const mergedFiles = new DataTransfer();
    filesArray.forEach((file) => mergedFiles.items.add(file));

    fileInput.files = emptyFileList;
    fileInput.files = mergedFiles.files;

    console.log(fileInput.files);

    handleFiles(fileInput.files);
    isFileExist(fileInput.files);
  } else {
    alert("최대 28개 까지 업로드 가능합니다.");
  }
}

function handleDrop(event) {
  event.preventDefault();
  const emptyFileList = new DataTransfer().files;
  const newFiles = event.dataTransfer.files;

  const existingFiles = Array.from(fileInput.files);
  if (newFiles.length + existingFiles.length <= 28) {
    const filesArray = existingFiles.concat([...newFiles]);

    const mergedFiles = new DataTransfer();
    filesArray.forEach((file) => mergedFiles.items.add(file));

    fileInput.files = emptyFileList;
    fileInput.files = mergedFiles.files;

    handleFiles(fileInput.files);
    isFileExist(fileInput.files);
  } else {
    alert("최대 28개 까지 업로드 가능합니다.");
  }
}

function handleDragOver(event) {
  event.preventDefault();
}

function handleFiles(files) {
  const uploadArea = document.getElementById("uploadArea");
  const thumbnails = uploadArea.querySelectorAll(".thumbnail");
  thumbnails.forEach((thumbnail) => thumbnail.remove());
  for (const file of files) {
    const thumbnail = createThumbnail(file);
    uploadArea.appendChild(thumbnail);
  }
}

function createThumbnail(file) {
  const thumbnail = document.createElement("div");
  thumbnail.className = "thumbnail";
  thumbnail.addEventListener("click", () => convertToPDF(file));

  const image = document.createElement("img");
  image.src = URL.createObjectURL(file);
  thumbnail.appendChild(image);

  const fileName = file.name.length > 10 ? file.name.substring(0, 10) + "..." : file.name;

  const originalFileName = file.name;
  const originalNameInput = document.createElement("input");
  originalNameInput.classList.add("original-file-name");
  originalNameInput.value = originalFileName;
  originalNameInput.style.display = "none";
  thumbnail.appendChild(originalNameInput);

  const cancelBtn = document.createElement("button");
  cancelBtn.className = "cancel-btn";
  cancelBtn.addEventListener("click", () => cancelUpload(thumbnail));

  const cancelBtnImg = ``;
  cancelBtn.innerHTML = "❌";
  thumbnail.appendChild(cancelBtn);

  const fileNameDiv = document.createElement("div");
  fileNameDiv.className = "file-name-div";
  if(!isActive){
    fileNameDiv.classList.add('dark')
  }
  const fineNameSpan = document.createElement("span");
  fineNameSpan.textContent = fileName;
  fileNameDiv.appendChild(fineNameSpan);
  thumbnail.appendChild(fileNameDiv);

  return thumbnail;
}

function convertToPDF(file) {
  console.log(fileInput.files);
  const formData = new FormData();
  formData.append("image", file);

  fetch("/convert-to-pdf", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.blob())
    .then((blob) => {
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download =
        file.name.replace(/\.[^/.]+$/, "") + "_converted.pdf";
      downloadLink.click();
    })
    .catch((error) => console.error("Error:", error));
  console.log(fileInput.files);
}

function convertAll() {
  console.log(fileInput.files);
  const formData = new FormData();
  for (let i = 0; i < fileInput.files.length; i++) {
    formData.append("image[]", fileInput.files[i]);
  }
  for (const entry of formData.entries()) {
    console.log(entry);
  }

  fetch("/convert-all-to-pdf", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.blob())
    .then((blob) => {
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = "mlabs_pdfconvert.pdf";
      downloadLink.click();
    })
    .catch((error) => console.error("Error:", error));
}

function cancelUpload(thumbnail) {
  const thumbnails = document.querySelectorAll(".thumbnail");
  const index = Array.from(thumbnails).indexOf(thumbnail);
  const uploadArea = document.getElementById("uploadArea");

  const remainingFiles = Array.from(fileInput.files);
  remainingFiles.splice(index, 1);

  const updatedFiles = new DataTransfer();
  remainingFiles.forEach((file) => updatedFiles.items.add(file));

  fileInput.files = updatedFiles.files;

  console.log(fileInput.files);

  uploadArea.removeChild(thumbnail);
  isFileExist(fileInput.files);
}
function isFileExist(fileInput) {
  const addImgDiv = document.querySelector(".here");

  if (fileInput.length > 0) {
    addImgDiv.style.display = "none";
    convertAllBtn.style.display = "block";
  } else {
    addImgDiv.style.display = "flex";
    convertAllBtn.style.display = "none";
  }
}

openHelp.addEventListener('click', function(){
  helpModal.style.display = 'block';
});

closeModalBtn.addEventListener('click', function(){
  helpModal.style.display = 'none';
});

modalOverlay.addEventListener('click', function(){
  helpModal.style.display = 'none';
});