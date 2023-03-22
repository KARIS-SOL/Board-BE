const express = require('express');
const { loginUser } = require('../Controllers/userController');

const router = express.Router();
// 로그인 페이지로 이동
router.get('/', (req, res) => {
  res.render('login');
});

// 로그인처리
router.post('/', loginUser);

// 로그아웃
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.clearCookie('user');
    res.redirect('/');
  });
});

module.exports = router;
