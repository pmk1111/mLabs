const express = require('express');
const path = require('path');
const multer = require('multer'); // multer 모듈을 require
const sharp = require('sharp');
const axios = require('axios');

const app = express();
const port = 9500;

// EJS 템플릿 엔진 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'static')));
app.use(express.json());

app.get('/mlabs', (req, res) => {
  res.render('index'); 
});
app.get('/mlabs/frequency', (req, res) => {
  res.render('frequency'); 
});
app.get('/mlabs/barcode', (req, res) => {
  res.render('barcode'); 
});
app.get('/mlabs/bokkli', (req, res) => {
  res.render('bokkli'); 
});
app.get('/mlabs/cal', (req, res) => {
  res.render('cal'); 
});
app.get('/mlabs/img-convert', (req, res) => {
  res.render('img-convert'); 
});
app.get('/mlabs/lotto', (req, res) => {
  res.render('lotto'); 
});
app.get('/mlabs/metronome', (req, res) => {
  res.render('metronome'); 
});
app.get('/mlabs/myip', (req, res) => {
  res.render('myip'); 
});
app.get('/mlabs/server-time', (req, res) => {
  res.render('server-time'); 
});

// 파일 업로드를 위한 multer 설정
const upload = multer();

// convert img
app.post('/mlabs/convert-image', upload.single('image'), async (req, res) => {
  try {
    const { format } = req.body;

    // 이미지 변환 (sharp 모듈 사용)
    const convertedImageBuffer = await sharp(req.file.buffer).toFormat(format).toBuffer();

    // HTTP 응답 헤더 설정
    res.setHeader('Content-Type', `image/${format}`);
    res.setHeader('Content-Disposition', `attachment; filename=converted_image.${format}`);

    // 변환된 이미지 응답
    res.send(convertedImageBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/mlabs/get-server-time', async (req, res) => {
  try {
      const targetUrl = req.body.url;

      if (!targetUrl) {
          return res.status(400).json({ error: 'URL이 제공되지 않았습니다.' });
      }

      // 서버에서 targetUrl로 GET 요청을 보내 응답 헤더의 Date를 추출
      const response = await axios.post(targetUrl);
      const serverTime = response.headers.date;

      if (!serverTime) {
          return res.status(500).json({ error: '서버 시간을 가져올 수 없습니다.' });
      }

      res.send(serverTime);
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: '서버 에러가 발생했습니다.' });
  }
});


// 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
