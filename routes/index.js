const express = require('express');

const router = express.Router(); //   express 라우터를 실행시켜서 router 변수에 넣어주기

// '/' 이 주소로 요청받으면 코드를 실행시켜줘
// localhost:/4000
router.get('/', (req, res) => {
  res.render('index', { msg: '이 데이터는 백엔드가 보냈어요!' }); // render는 그리는 것, 이 주소로 요청이 들어오면 index.ejs 파일을 보여줌
});

module.exports = router; //  molude.exports 로 모듈로서 빼주어서 외부에서 사용 가능하게 해주기
