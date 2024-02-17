
const body = document.querySelector("body");
const nav = document.querySelector("nav");

const toggleList = document.querySelectorAll(".toggleSwitch");
const toggleImg = document.querySelector(".display_mode_icon");

const menuBtn = document.querySelector(".menu_btn");
const menu = document.querySelector(".menu");
// const htu = document.querySelectorAll(".how_to_use");
// const descH3 = document.querySelectorAll(".htu_h3");
// const description = document.querySelectorAll(".description");

const menuLink = document.querySelectorAll(".menu_container a");

const footer = document.querySelector("footer");

let fileInput = document.getElementById("fileInput");
const uploadAreaDiv = document.querySelector(".upload-area");
const convertAllBtn = document.querySelector(".convert-all-btn");

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

      menuBtn.classList.remove("menu_btn_dark");
      menu.classList.remove("menu_dark");
      for(item of menuLink){
        item.classList.remove("link_dark");
      }
      uploadAreaDiv.classList.remove("dark");
      for(i of fileNameDivs){i.classList.remove('dark')}
      convertAllBtn.classList.remove('dark');
    //   for(item of htu){
    //   	item.classList.remove("htu_dark");
    //   }
	// 		for(item of descH3){
    //   	item.classList.remove("htu_h3_dark");
    //   }
    //   for(item of description){
    //   	item.classList.remove("desc_dark");
    //   }

      footer.classList.remove("footer_dark");
    } else {
      $toggle.classList.add("active");
      toggleImg.setAttribute("src", "/images/moon.png");
      body.classList.add("dark");

      nav.classList.add("nav_dark");

      menuBtn.classList.add("menu_btn_dark");
      menu.classList.add("menu_dark");
      for(item of menuLink){
        item.classList.add("link_dark");
      }
      uploadAreaDiv.classList.add("dark");
      for(i of fileNameDivs){i.classList.add('dark');}
      convertAllBtn.classList.add('dark');
    //   for(item of htu){
    //   	item.classList.add("htu_dark");
    //   }
	// 		for(item of descH3){
    //   	item.classList.add("htu_h3_dark");
    //   }
    //   for(item of description){
    //   	item.classList.add("desc_dark");
    //   }

      footer.classList.add("footer_dark");
      console.log(fileNameDivs.length)
    }
  };
});


function handleClick(event) {
  existingFile = Array.from(fileInput.files);
  console.log(existingFile);
  if (event.target.id == "uploadArea" || event.target.id == "addImg") {
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

    console.log(fileInput.files);

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

  const image = document.createElement("img");
  image.src = URL.createObjectURL(file);
  thumbnail.appendChild(image);

  const fileName =
    file.name.length > 10 ? file.name.substring(0, 10) + "..." : file.name;
  const downloadBtn = document.createElement("button");
  downloadBtn.className = "download-btn";
  downloadBtn.textContent = "다운로드";
  downloadBtn.addEventListener("click", () => convertToPDF(file));
  thumbnail.appendChild(downloadBtn);

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
      downloadLink.download = "all_converted.pdf";
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
    convertAllBtn.style.visibility = "visible";
  } else {
    addImgDiv.style.display = "flex";
    convertAllBtn.style.visibility = "hidden";
  }
}
