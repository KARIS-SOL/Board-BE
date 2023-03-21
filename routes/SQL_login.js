const express = require('express');
const userDB = require('../controllers/userController');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', (req, res) => {
  userDB.userCheck(req.body.id, (data) => {
    if (data.length === 1) {
      // unique 로 줬기때문에 0또는 1 만 가능
      if (data[0].PASSWORD === req.body.password) {
        req.session.login = true;
        req.session.userId = req.body.id;
        // 쿠키발행
        res.cookie('user', req.body.id, {
          maxAge: 1000 * 10,
          httpOnly: true,
          signed: true,
        });
        res.status(200);
        res.redirect('/dbBoard');
      } else {
        // 아이디는 있는데 비번이 다를때
        res.status(400);
        res.send(
          '비밀번호가 다릅니다 </br><a href="/login"> 로그인으로 이동 </a>',
        );
      }
    } else {
      res.status(400);
      res.send(
        '해당 ID 가 존재하지 않습니다 </br><a href="/register"> 회원가입으로 이동 </a>',
      );
    }
  });
});

// 로그아웃
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.clearCookie('user');
    res.redirect('/');
  });
});

module.exports = router;
