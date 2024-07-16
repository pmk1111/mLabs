const express = require('express');
const serverless = require("serverless-http");
const path = require('path');

const fs = require('fs');
const PDFDocument  = require('pdfkit');
const multer = require('multer'); // multer 모듈을 require
const sharp = require('sharp');
const axios = require('axios');
const FormData = require('form-data');

const fetch = require('node-fetch');
const archiver = require("archiver");
const crypto = require('crypto');
const sha512 = require('sha.js/sha512');
const SHA3 = require('sha3');
const { keccak512, keccak384, keccak256, keccak224, shake_256, shake_128 } = require('js-sha3');
const crc = require('crc');

const uglify = require('uglify-js');
const htmlMinifier = require('html-minifier').minify;
const csso = require('csso');

// 파일 업로드를 위한 multer 설정
const upload = multer();

const router = express.Router();
const api = express();
const port = 9500;


// EJS 템플릿 엔진 설정
api.set('view engine', 'ejs');
api.set('views', path.join(__dirname, 'views'));

api.use(express.static(path.join(__dirname, 'static')));
api.use(express.json());

api.get('/', (req, res) => {
  res.render(path.join(__dirname, 'index'));
});
api.get('/sitemap.xml', (req, res) => {
  res.sendFile(path.join(__dirname, 'sitemap.xml'));
});
api.get('/ads.txt', (req, res) => {
  res.sendFile(path.join(__dirname, 'ads.txt'));
});
api.get('/frequency', (req, res) => {
  res.render('frequency'); 
});
api.get('/barcode', (req, res) => {
  res.render('barcode'); 
});
api.get('/bokkli', (req, res) => {
  res.render('bokkli'); 
});
api.get('/cal', (req, res) => {
  res.render('cal'); 
});
api.get('/img-convert', (req, res) => {
  res.render('img-convert'); 
});
api.get('/lotto', (req, res) => {
  res.render('lotto'); 
});
api.get('/metronome', (req, res) => {
  res.render('metronome'); 
});
api.get('/myip', (req, res) => {
  res.render('myip'); 
});
api.get('/server-time', (req, res) => {
  res.render('server-time'); 
});
api.get('/memo', (req, res) => {
  res.render('memo');
});
api.get('/img-to-pdf', (req, res) => {
  res.render('img-to-pdf');
});
api.get('/pdf-to-jpg', (req, res) =>{
  res.render('pdf-to-jpg');
});
api.get('/html-color-picker', (req, res) => {
  res.render('html-color-picker');
});
api.get('/youtube-thumbnail', (req, res) => {
  res.render('youtube-thumbnail');
});
api.get('/gcd-lcm', (req, res) => {
  res.render('gcd-lcm');
});
api.get('/encoder-decoder', (req, res) => {
  res.render('encoder-decoder');
});
api.get('/hash', (req, res) => {
  res.render('hash');
});
api.get('/base-convert', (req, res) => {
  res.render('base-convert')
});
api.get('/roulette', (req, res) => {
  res.render('roulette');
});
api.get('/dice', (req, res) => {
  res.render('dice');
});
api.get('/minify', (req, res) => {
  res.render('minify');
});
api.get('/time-zone', (req, res) => {
  res.render('time-zone');
});
api.get('/cal-your-pay', (req, res) => {
  res.render('cal-your-pay');
});

api.post('/do-minify', (req, res) => {
  const originalCode = req.body.originalCode;
  const codeType =req.body.checkedCodeType;
  let result = '';
  if(codeType === 'html'){
    result = htmlMinifier(originalCode, {
      collapseWhitespace: true,
      removeComments: true
    });
  } else if(codeType === 'css'){
      result = csso.minify(originalCode).css;
  } else{
      result = uglify.minify(originalCode);
  }

  res.json({ minifiedCode: result });
});


api.get('/get-hash-text', (req, res) => {
  let result;
  const originalTxt = req.query.text;
  const hashType = req.query.hashType;
  const detailOption = req.query.detail;

  switch(hashType){
    case 'sha':
      switch(detailOption){
        case '512':
          result = crypto.createHash('sha512').update(originalTxt).digest('hex');
          break;
        case '384':
          result = crypto.createHash('sha384').update(originalTxt).digest('hex');
          break;
        case '256':
          result = crypto.createHash('sha256').update(originalTxt).digest('hex');
          break;
        case '224':
          result = crypto.createHash('sha224').update(originalTxt).digest('hex');
          break;
        case '512/256':
          result = new sha512().update(originalTxt).digest('hex').substring(0, 64);
          break;
        case '512/224':
          result = new sha512().update(originalTxt).digest('hex').substring(0, 56);
          break;
      }
      break;
    case 'sha3':
      switch(detailOption){
        case '512':
          result = new SHA3.SHA3Hash(512).update(originalTxt).digest('hex');
          console.log('sha3 실행 되나??')  
          break;
        case '384':
          result = new SHA3.SHA3Hash(384).update(originalTxt).digest('hex');
          break;
        case '256':
          result = new SHA3.SHA3Hash(256).update(originalTxt).digest('hex');
          break;
        case '224':
          result = new SHA3.SHA3Hash(224).update(originalTxt).digest('hex');
          break;
      }
      break;
    case 'sha1':
      result = crypto.createHash('sha1').update(originalTxt).digest('hex');
      break;
    case 'shake':
      switch(detailOption){
        case '256':
          result = shake_256(originalTxt, 256);    
          console.log("shake 실행 결과: " + result) 
          break;
        case '128':
          result = shake_128(originalTxt, 128);
          break;
      }
      break;
    // case 'md':
    //   switch(detailOption){
    //     case '5':
    //       result = crypto.createHash('md5').update(originalTxt).digest('hex');
    //       break;
    //     case '4':
    //       // result = md4(originalTxt)
    //       break;
    //     case '2':
    //       // result = 2(originalTxt)
    //       break;
    //   }
    //   break;
    case 'crc':
      switch(detailOption){
        case '32':
          result = crc.crc32(originalTxt).toString(16);;
          break;
        case '16':
          result = crc.crc16(originalTxt).toString(16);
          break;
      }
      break;
    case 'keccak':
      switch(detailOption){
        case '512':
          result = keccak512(originalTxt);
          break;
        case '384':
          result = keccak384(originalTxt);
          break;
        case '256':
          result = keccak256(originalTxt);
          break;
        case '224':
          result = keccak224(originalTxt);
          break;
      }
      break;
  }
  res.json({ result });
})

api.post('/download-thumbnail', async (req, res) => {
  try {
    const imgUrl = req.body.imgUrl;

    // 이미지 다운로드
    const response = await fetch(imgUrl);
    const imageBuffer = await response.arrayBuffer();

    // 이미지를 클라이언트에 전송
    res.set('Content-Type', 'image/jpeg');
    res.set('Content-Disposition', 'attachment; filename=image.jpg');
    res.send(Buffer.from(imageBuffer));
  } catch (error) {
    console.error('Error during image download:', error);
    res.status(500).send('Internal Server Error');
  }
});

api.post("/download-all-thumbnail", async (req, res) => {
  try {
    const imageUrls = req.body.imageUrls;

    const archive = archiver("zip", {
      zlib: { level: 9 }, 
    });

    archive.pipe(res);

    for (let i = 0; i < imageUrls.length; i++) {
      const imageUrl = imageUrls[i];
      const response = await fetch(imageUrl);
      const imageBuffer = await response.buffer();
      
      const uniqueFilename = `image_${i + 1}.jpg`;
      
      archive.append(imageBuffer, { name: uniqueFilename });
    }

    archive.finalize();
  } catch (error) {
    console.error("이미지 일괄 다운로드 중 오류 발생:", error);
    res.status(500).send('서버 내부 오류');
  }
});


api.post('/convert-all-img', upload.array('image[]'), async (req, res) => {
  try {
    const { format } = req.body;
    const archive = archiver('zip', { zlib: { level: 9 } });
    
    // Iterate through each uploaded file
    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];

      // Use await to ensure that toBuffer() completes before proceeding
      const convertedImageBuffer = await sharp(file.buffer).toFormat(format).toBuffer();

      archive.append(convertedImageBuffer, { name: `image_${i + 1}.${format}` });
    }

    // Set HTTP response headers for the zip file
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename=converted_images.zip`);

    // Pipe the zip file to the response stream
    archive.pipe(res);

    // Finalize the archive and send the response
    await new Promise((resolve) => {
      archive.finalize();
      archive.on('end', resolve);
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


// 서버 시간 가져오기
api.post('/get-server-time', async (req, res) => {
  try {
    const serverTime = new Date().toUTCString();
    res.status(200).json({ serverTime });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: '서버 에러가 발생했습니다.' });
  }
});

api.post('/convert-to-pdf', upload.single('image'), async (req, res) => {
  if (!req.file) {
      return res.status(400).send('No file uploaded.');
  }

  try {
      const imageBuffer = await sharp(req.file.buffer).toBuffer();
      const imageSize = await sharp(req.file.buffer).metadata();
      const pdfDoc = new PDFDocument({ autoFirstPage: false });
      const pdfStream = res.type('application/pdf');

      pdfDoc.addPage({
          size: [imageSize.width, imageSize.height],
          margin: 0,
      });

      pdfDoc.image(imageBuffer, 0, 0, { width: imageSize.width, height: imageSize.height });

      const pdfBuffer = [];
      pdfDoc.on('data', chunk => pdfBuffer.push(chunk));
      pdfDoc.on('end', () => {
          const resultBuffer = Buffer.concat(pdfBuffer);
          res.type('application/pdf').send(resultBuffer);
      });

      pdfDoc.end();
  } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
  }
});

api.post('/convert-all-to-pdf', upload.array('image[]'), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send('No files uploaded.');
  }
  try {
    const pdfDoc = new PDFDocument({ autoFirstPage: false });
    const pdfStream = res.type('application/pdf');

    for (const file of req.files) {
      const imageBuffer = await sharp(file.buffer).toBuffer();
      const imageSize = await sharp(file.buffer).metadata();

      pdfDoc.addPage({
        size: [imageSize.width, imageSize.height],
        margin: 0,
      });

      pdfDoc.image(imageBuffer, 0, 0, { width: imageSize.width, height: imageSize.height });
    }

    const pdfBuffer = [];
    pdfDoc.on('data', chunk => pdfBuffer.push(chunk));
    pdfDoc.on('end', () => {
      const resultBuffer = Buffer.concat(pdfBuffer);
      res.type('application/pdf').send(resultBuffer);
    });

    pdfDoc.end();
  } catch (error) {

  }
});



// 서버 시작
api.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});

api.use("/.netlify.functions/api", router);

module.exports.handler = serverless(api);