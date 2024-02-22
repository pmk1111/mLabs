const express = require('express');
const serverless = require("serverless-http");
const path = require('path');

const fs = require('fs');
const PDFDocument  = require('pdfkit');
const multer = require('multer'); // multer 모듈을 require
const sharp = require('sharp');
const axios = require('axios');

const fetch = require('node-fetch');


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
api.get('/pdf-convert', (req, res) => {
  res.render('pdf-convert');
});
api.get('/pdf-to-jpg', (req, res) =>{
  res.render('pdf-to-jpg');
});
api.get('/color-picker', (req, res) => {
  res.render('color-picker');
});
api.get('/youtube-thumbnail', (req, res) => {
  res.render('youtube-thumbnail');
});

// 파일 업로드를 위한 multer 설정
const upload = multer();

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

// convert img
api.post('/convert-image', upload.single('image'), async (req, res) => {
  try {
    const { format } = req.body;

    // 이미지 변환 (sharp 모듈 사용)
    const convertedImageBuffer = await sharp(req.file.buffer).toFormat(format).toBuffer();

    // HTTP 응답mlabolatories 헤더 설정
    res.setHeader('Content-Type', `image/${format}`);
    res.setHeader('Content-Disposition', `attachment; filename=converted_image.${format}`);

    // 변환된 이미지 응답
    res.send(convertedImageBuffer);
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