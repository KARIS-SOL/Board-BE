const express = require('express');

const userDB = require('../Controllers/userController');

const router = express.Router();

// get : 페이지를 열어줌
router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', (req, res) => {
  // console.log(req.body); // teminal ! 페이지자체는 안나옴
  userDB.userCheck(req.body.id, (data) => {
    if (data.length === 0) {
      // 진행 시켜
      userDB.registerUser(req.body, (result) => {
        if (result.affectedRows >= 1) {
          res.status(200);
          res.send('회원가입성공 <br><a href="/login">로그인으로 이동 </a>');
        } else {
          res.status(500);
          res.send(
            '회원가입실패, 알수없는 문제 발생 <br><a href="/register">회원 가입으로 이동 </a>',
          );
        }
      });
    } // 중복된 회원이 있을떄
    else {
      res.status(400);
      res.send(
        '동일한 ID를 가진 회원이 존재합니다 <br><a href="/login">회원 가입으로 이동 </a>',
      );
    }
  });
});

module.exports = router;
