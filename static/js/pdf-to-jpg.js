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

const dropArea = document.querySelector(".drop-file");
const fileInput = document.getElementById("pdfInput");
const here = document.querySelector('.here');
const convertBtn = document.querySelector('.do-convert');

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

      dropArea.classList.remove('dark');
      convertBtn.classList.remove('dark');

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
      dropArea.classList.add('dark');
      convertBtn.classList.add('dark');
      
      footer.classList.add("footer_dark");
      helpIcon.setAttribute('src', '/images/help-white.svg');
      modalContent.classList.add('dark');
      closeModalBtn.setAttribute('src', '/images/deletebtn-white.svg');
    }
  };
});


// 드래그 앤 드롭 이벤트 처리
dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.style.backgroundColor = "#eee";
});

dropArea.addEventListener("dragleave", () => {
  dropArea.style.backgroundColor = "#fff";
});

dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dropArea.style.backgroundColor = "#fff";
  handleFiles(e.dataTransfer.files);
  showUploadedFile(e.dataTransfer.files[0]);
});

// 파일 입력 필드 변경 이벤트 처리
fileInput.addEventListener("change", () => {
  fileInput.file = fileInput.files[0];
  showUploadedFile(fileInput.files[0]);
});

// 클릭 이벤트 처리
dropArea.addEventListener("click", () => {
  fileInput.click();
});

function handleFiles(files) {
  if (files.length === 0) {
    return;
  }

  // Update fileInput.files directly
  fileInput.files = files;
}

function showUploadedFile(file) {
  dropArea.innerHTML = '';
  const fileDiv = document.createElement('div');
  const fileIcon = document.createElement('img');
  const fileName = document.createElement('span');
  const size = document.createElement('span');

  fileDiv.className = 'file-div';
  fileIcon.className = 'pdf-icon';
  fileName.className = 'file-name';
  size.className = 'file-size';

  fileName.textContent = file.name;
  if(file.size/1024/1024 >= 1){
    size.textContent = Math.round(file.size/1024/1024) + 'GB';
  } else if(file.size/1024 >= 1){
    size.textContent = Math.round(file.size/1024) + 'KB';
  } else{
    size.textContent = file.size + 'Byte';
  }

  fileIcon.setAttribute('src', '/images/pdf-icon.png');

  fileDiv.appendChild(fileIcon);
  fileDiv.appendChild(fileName);
  fileDiv.appendChild(size)
  dropArea.appendChild(fileDiv);

  convertBtn.style.display = "block";
}

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

function convertAndDownload() {
  const pdfInput = document.getElementById("pdfInput");

  if (!pdfInput.files || pdfInput.files.length === 0) {
    alert("pdf 파일을 업로드하세요.");
    return;
  }

  const pdfFile = pdfInput.files[0];

  pdfjsLib
    .getDocument(URL.createObjectURL(pdfFile))
    .promise.then((pdf) => {
      const totalPages = pdf.numPages;
      const zip = new JSZip();

      // Convert each page to JPG
      for (let i = 1; i <= totalPages; i++) {
        pdf.getPage(i).then((page) => {
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          const viewport = page.getViewport({ scale: 1.5 });

          canvas.width = viewport.width;
          canvas.height = viewport.height;

          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };

          page.render(renderContext).promise.then(() => {
            // Convert canvas to data URL
            const imageDataURL = canvas.toDataURL("image/jpeg");

            // Add image to zip file
            zip.file(`page${i}.jpg`, imageDataURL.split(",")[1], {
              base64: true,
            });

            // If all pages are processed, create and download the zip file
            if (i === totalPages) {
              zip.generateAsync({ type: "blob" }).then((blob) => {
                const zipFileName = pdfFile.name.replace(
                  ".pdf",
                  "_converted.zip"
                );
                const downloadLink = document.createElement("a");
                downloadLink.href = URL.createObjectURL(blob);
                downloadLink.download = zipFileName;
                downloadLink.click();
              });
            }
          });
        });
      }
    });
}