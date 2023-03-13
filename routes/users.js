const express = require('express');

const router = express.Router();

// localhost:4000/users/
router.get('/', (req, res) => {
  // res.send('여기는 유저 라우터입니다');
  // render 로 가져오고 싶은 ejs 파일 적기
  res.render('users', { user: '진솔' });
});

module.exports = router;
