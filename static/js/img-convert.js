const body = document.querySelector("body");
const nav = document.querySelector("nav");
const logoImg = document.querySelector('.logo');
const title = document.querySelector('.title');
const apps = document.querySelector('.app-icon');
const toggleList = document.querySelectorAll(".toggleSwitch");
const toggleImg = document.querySelector(".display_mode_icon");
const footer = document.querySelector("footer");
const menuBtn = document.querySelector(".menu_btn");
const menu = document.querySelector(".menu");
const menuLink = document.querySelectorAll(".menu_container a");

var uploadAreaDiv = document.querySelector(".upload-area");
var imageInput = document.querySelector(".upload-img-btn");
const convertArea = document.querySelector('.convert_wrap');
const formatSelector = document.querySelector('.format-selector');
const uploadBtn = document.querySelector(".upload-img-btn");
const convertAllBtn = document.querySelector(".convert-all-btn");

const htu = document.querySelector(".how_to_use");
const htuH3 = document.querySelector(".htu_h3");
const step = document.querySelector(".step");
const desc = document.querySelectorAll(".step p");

var isActive = true;
// 다크모드
toggleList.forEach(($toggle) => {
  $toggle.onclick = () => {
    isActive = $toggle.classList.contains("active");
    const thumbnailItems = document.querySelectorAll('.thumbnail img');
    if (isActive) {
      $toggle.classList.remove("active");
      toggleImg.setAttribute("src", "/images/sun.png");
      body.classList.remove("dark");
      body.classList.add("lite");

      nav.classList.remove("nav_dark");
      logoImg.setAttribute('src', '/images/logo_black.svg');
      title.style.color = 'black';
      apps.setAttribute('src','images/apps-black.svg');
      menuBtn.classList.remove("menu_btn_dark");
      menu.classList.remove("menu_dark");
      for (item of menuLink) {
        item.classList.remove("link_dark");
      }
      uploadAreaDiv.classList.remove('dark');
      convertArea.classList.remove('dark');
      uploadBtn.classList.remove("dark");
      formatSelector.classList.remove('dark');
      convertAllBtn.classList.remove("dark");
      for(item of thumbnailItems){
        item.classList.remove('dark');
      }

      footer.classList.remove("footer_dark");
    } else {
      $toggle.classList.add("active");
      toggleImg.setAttribute("src", "/images/moon.png");
      body.classList.remove("lite");
      body.classList.add("dark");

      nav.classList.add("nav_dark");
      logoImg.setAttribute('src', '/images/logo_white.svg');
      title.style.color = 'white';
      apps.setAttribute('src','images/apps-white.svg');
      menuBtn.classList.add("menu_btn_dark");
      menu.classList.add("menu_dark");
      for (item of menuLink) {
        item.classList.add("link_dark");
      }
      uploadAreaDiv.classList.add('dark');
      convertArea.classList.add('dark');
	    uploadBtn.classList.add("dark");
      formatSelector.classList.add('dark');
      convertAllBtn.classList.add("dark");
      for(item of thumbnailItems){
        item.classList.add('dark');
      }

      footer.classList.add("footer_dark");
    }
  };
});


function handleClick(event) {
  existingFile = Array.from(fileInput.files);
  console.log(existingFile);
  if (event.target.classList.contains('upload-area') || event.target.id == "addImg" || event.target.classList.contains('upload-img-btn')) {
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
  const uploadArea = document.querySelector(".upload-area");
  const thumbnails = uploadArea.querySelectorAll(".thumbnail");
  thumbnails.forEach((thumbnail) => thumbnail.remove());
  for (const file of files) {
    const thumbnail = createThumbnail(file);
    uploadArea.appendChild(thumbnail);
  }
  // if(convertAllBtn.style.display == 'none'){
  //   convertAllBtn.style.display = 'block';
  // }
}

function createThumbnail(file) {
  const thumbnail = document.createElement("div");
  thumbnail.className = "thumbnail";

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

function isFileExist(fileInput) {
  const addImgDiv = document.querySelector(".here");

  if (fileInput.length > 0) {
    addImgDiv.style.display = "none";
    convertAllBtn.style.display = 'block';
  } else {
    addImgDiv.style.display = "flex";
    convertAllBtn.style.display = 'none';
  }
}

function cancelUpload(thumbnail) {
  const thumbnails = document.querySelectorAll(".thumbnail");
  const index = Array.from(thumbnails).indexOf(thumbnail);
  const uploadArea = document.querySelector(".upload-area");

  const remainingFiles = Array.from(fileInput.files);
  remainingFiles.splice(index, 1);

  const updatedFiles = new DataTransfer();
  remainingFiles.forEach((file) => updatedFiles.items.add(file));

  fileInput.files = updatedFiles.files;

  uploadArea.removeChild(thumbnail);
  isFileExist(fileInput.files);
}

function convertAllImage() {
  if (fileInput.files.length === 0) {
    alert('파일을 업로드하세요.');
  } else {
    const formData = new FormData();
    const format = document.querySelector('.format-selector option:checked').value;

    for (let i = 0; i < fileInput.files.length; i++) {
      formData.append('image[]', fileInput.files[i]);
    }
    formData.append('format', format);

    fetch('/convert-all-img', {
      method: 'POST',
      body: formData,
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.blob();
    })
    .then(blob => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'converted_images.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch(error => {
      console.error('Fetch error:', error);
      alert('다운로드 중 오류가 발생했습니다.');
    });
  }
}




// 드래그 앤 드롭 이벤트 핸들러
// uploadAreaDiv.addEventListener("dragenter", function (e) {
//   e.preventDefault();
//   uploadAreaDiv.classList.add("dragover");
// });

// uploadAreaDiv.addEventListener("dragover", function (e) {
//   e.preventDefault();
//   uploadAreaDiv.classList.add("dragover");
// });

// uploadAreaDiv.addEventListener("dragleave", function () {
//   uploadAreaDiv.classList.remove("dragover");
// });

// uploadAreaDiv.addEventListener("drop", function (e) {
//   e.preventDefault();
//   uploadAreaDiv.classList.remove("dragover");
  
//   let preview = document.getElementById("preview");
//   let noImg = document.querySelector(".no_img");
//   let dropTxt = document.querySelector(".drop_img_here");
//   var reader = new FileReader();

//   reader.onload = function () {
//     noImg.style.display = "none";
//     dropTxt.style.display = "none";
//     preview.style.display = "block";
//     document.getElementById("preview").src = reader.result;
//   };

//   if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//     reader.readAsDataURL(e.dataTransfer.files[0]);
//     imageInput.files = e.dataTransfer.files; // 드롭한 파일을 input에 반영
//   }
// });

// Input 변경 이벤트 핸들러
// imageInput.addEventListener("change", function (event) {
//   var input = event.target;
//   var preview = document.getElementById("preview");
//   let noImg = document.querySelector(".no_img");
//   let dropTxt = document.querySelector(".drop_img_here");

//   var reader = new FileReader();

//   reader.onload = function () {
//     noImg.style.display = "none";
//     dropTxt.style.display = "none";
//     preview.style.display = "block";
//     preview.src = reader.result;
//   };

//   if (input.files && input.files[0]) {
//     reader.readAsDataURL(input.files[0]);
//   }
// });

// document.querySelector(".upload-img-btn").addEventListener("change", function (event) {
//     var input = event.target;
//     var preview = document.getElementById("preview");

//     var reader = new FileReader();

//     reader.onload = function () {
//       preview.src = reader.result;
//     };

//     if (input.files && input.files[0]) {
//       reader.readAsDataURL(input.files[0]);
//     }
//   });

// function convertImage() {
//   const inputElement = document.querySelector('input[type="file"]');
//   const outputFormat = document.querySelector('select[name="format"]').value;
//   const downloadWrap = document.querySelector(".download_wrap");
//   const download = document.querySelector(".download");

//   const file = inputElement.files[0];

//   if (file) {
//     const formData = new FormData();
//     formData.append("format", outputFormat);
//     formData.append("image", file);

//     // GIF 또는 TIFF가 선택된 경우 서버에 요청
//     if (outputFormat === "gif" || outputFormat === "tiff") {
//       fetch("/convert-image", {
//         method: "POST",
//         body: formData,
//       })
//         .then((response) => response.blob())
//         .then((blob) => {
//           const url = URL.createObjectURL(blob);

//           // 다운로드 링크 업데이트
//           downloadWrap.style.display = "block";
//           download.href = url;
//           download.download = `converted_image.${outputFormat}`;
//         })
//         .catch((error) => console.error(error));
//     } else {
//       // 다른 확장자는 클라이언트 측에서 변환
//       const reader = new FileReader();
//       reader.onload = function (e) {
//         const img = new Image();
//         img.src = e.target.result;

//         img.onload = function () {
//           const canvas = document.createElement("canvas");
//           canvas.width = img.width;
//           canvas.height = img.height;
//           const ctx = canvas.getContext("2d");
//           ctx.drawImage(img, 0, 0);

//           const dataURL = canvas.toDataURL(`image/${outputFormat}`);

//           // 다운로드 링크 업데이트
//           download.href = dataURL;
//           download.download = `converted_image.${outputFormat}`;
//           downloadWrap.style.display = "block";
//         };
//       };
//       reader.readAsDataURL(file);
//     }
//     downloadLink.textContent = outputFormat + "(으)로 다운로드";
//   }
// }
