const txtInput = document.querySelector(".text-input");
const resultTextArea = document.querySelector(".result");
const encodeBtn = document.querySelector(".do-encode-btn");
const types = document.querySelectorAll('.type input[type="radio"]');

types.forEach((radio) => {
  radio.addEventListener("change", (e) => {
    const current = e.currentTarget;
    if (current.id === "url") {
      document.querySelector(".url-encode-decode").style.display = "block";
      document.querySelector(".encode-decode").style.display = "none";
    } else {
      document.querySelector(".url-encode-decode").style.display = "none";
      document.querySelector(".encode-decode").style.display = "block";
    }
  });
});

function doConvert() {
  const checkedType = document.querySelector(
    '.type input[type="radio"]:checked'
  );
  const selector = document.querySelector(
    '.encode-decode input[type="radio"]:checked'
  );
  const URLSelector = document.querySelector(
    '.url-encode-decode input[type="radio"]:checked'
  );
  const textVal = txtInput.value;

  switch (checkedType.id) {
    case "base64":
      if (selector.id === "encode") {
        //base64 인코딩을 수행하는 btoa 함수는 Latin1(ISO-8859-1) 문자셋에 있는 문자만을 처리할 수 있기 때문에
        //한글과 같은 Unicode 문자를 직접 처리할 수 없어서 encodeURIComponent 를 이용해 유니코드를 utf-8로 먼저 인코딩한 다음 btoa를 사용
        const base64Encode = btoa(unescape(encodeURIComponent(textVal)));
        resultTextArea.value = base64Encode;
      } else {
        try {
          if (/^[A-Za-z0-9+/]*={0,2}$/.test(textVal)) {
            const decodedText = decodeURIComponent(escape(atob(textVal)));
            resultTextArea.value = decodedText;
          } else {
            throw new Error("올바른 base64 문자열이 아닙니다.");
          }
        } catch (error) {
          alert(error.message);
          console.error(error.message);
        }
      }
      break;
    case "base32":
      if (selector.id === "encode") {
        const textBuffer = new TextEncoder().encode(textVal);
        const base32Encoded = encodeBase32(textBuffer);
        resultTextArea.value = base32Encoded;
      } else {
        const base32Encoded = decodeBase32(textVal);
        resultTextArea.value = base32Encoded;
      }
      break;
    case "url":
      switch (URLSelector.id) {
        case "encodeUrl":
          const encodedUrl = encodeURI(textVal);
          resultTextArea.value = encodedUrl;
          break;
        case "decodeUrl":
          const decodedUrl = decodeURI(textVal);
          resultTextArea.value = decodedUrl;
          break;
        case "encodeUrlComponent":
          const encodedURIComponent = encodeURIComponent(textVal);
          resultTextArea.value = encodedURIComponent;
          break;
        case "decodeUrlComponent":
          const decodedURIComponent = decodeURIComponent(textVal);
          resultTextArea.value = decodedURIComponent;
          break;
        case "escape":
          const escapeTxt = escape(textVal);
          resultTextArea.value = escapeTxt;
          break;
        case "unescape":
          const unescapeTxt = unescape(textVal);
          resultTextArea.value = unescapeTxt;
          break;
      }
      break;
  }
}

function encodeBase32(buffer) {
  const base32Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

  let result = "";
  let bits = 0;
  let currentByte = 0;

  for (let i = 0; i < buffer.length; i++) {
    currentByte = (currentByte << 8) | buffer[i];
    bits += 8;

    while (bits >= 5) {
      bits -= 5;
      const index = (currentByte >>> bits) & 31;
      result += base32Alphabet[index];
    }
  }

  // Handle any remaining bits
  if (bits > 0) {
    currentByte <<= 5 - bits;
    const index = currentByte & 31;
    result += base32Alphabet[index];
  }

  // Add padding if needed
  while (result.length % 8 !== 0) {
    result += "=";
  }

  return result;
}

function decodeBase32(encodedData) {
  const base32Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

  let bits = 0;
  let currentByte = 0;
  let result = "";

  for (let i = 0; i < encodedData.length; i++) {
    const char = encodedData.charAt(i);

    if (char === "=") {
      // Skip padding character
      continue;
    }

    const charIndex = base32Alphabet.indexOf(char);

    if (charIndex === -1) {
      throw new Error("Invalid base32 encoded data");
    }

    currentByte = (currentByte << 5) | charIndex;
    bits += 5;

    if (bits >= 8) {
      bits -= 8;
      result += String.fromCharCode((currentByte >>> bits) & 255);
    }
  }

  const uint8Array = new Uint8Array(result.length);
  for (let i = 0; i < result.length; i++) {
    uint8Array[i] = result.charCodeAt(i);
  }

  const decodedString = new TextDecoder("utf-8").decode(uint8Array);

  return decodedString;
}

function copyResult() {
  let textarea = document.createElement("textarea");

  document.body.appendChild(textarea);

  textarea.value = resultTextArea.value;
  textarea.select();

  document.execCommand("copy");
  document.body.removeChild(textarea);
  alert('결과값 복사 완료.')
}
function clearBoth() {
    txtInput.value = '';
    resultTextArea.value = '';
}
