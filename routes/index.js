const express = require('express');

const router = express.Router();

// localhost:4000
router.get('/', (req, res) => {
  // res.send('여기는 메인 라우터 입니다');
  // render 로 가져오고 싶은 ejs 파일 적기
  // msg 를 ejs 에서 받기
  res.render('index', { msg: '이 데이터는 백엔드가 보냈어요' });
});

// 모듈 먼저 설저해놓고 위에 코드 짜기
module.exports = router;
