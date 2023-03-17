const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('cookie');
});

router.get('/cook', (req, res) => {
  // console.log('왔니?');
  // cookie-parser 을 express 에 넣어놨기 때문에 res.cookie 로 사용가능
  res.cookie('alert', true, {
    maxAge: 1000 * 5,
    httpOnly: false,
  });
  // res.send('쿠키 다굽');
  // status code 200 : 성공! json 형태로 메시지를 실어서 보내야 cookie 가 실행된다
  res.status(200).json('쿠키굽기 성공');
  // console.log('쿠키 만듬');
});

module.exports = router;
