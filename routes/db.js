// 데이터베이스에 관련된 것들을 컨트롤 하기 위한 라우터

const express = require('express');
const userDB = require('../controllers/userController');

const router = express.Router();

// get 방식으로 요청받기
router.get('/', (req, res) => {
  userDB.getUsers((data) => {
    res.send(data);
  });
});

module.exports = router; // 모듈로 빼주기
