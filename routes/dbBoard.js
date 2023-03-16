// DB와 관련된 Board의 모든 기능을 가지는 라우터

const express = require('express');
const boardDB = require('../controllers/boardController');

const router = express.Router();

// 게시판 페이지 호출
router.get('/', (req, res) => {
  boardDB.getAllArticles((data) => {
    const ARTICLE = data;
    const articleCounts = ARTICLE.length;
    res.render('db_board', { ARTICLE, articleCounts });
  });
});

// 미들웨어 작성

// 글쓰기 페이지 호출
router.get('/write', (req, res) => {
  res.render('db_board_write');
});

// 데이터베이스에 글쓰기
router.post('/write', (req, res) => {
  // console.log(req.body); // 파라미터가 아닌 form 으로 넘기니 req.body로 받아야 함
  if (req.body.title && req.body.content) {
    boardDB.writeArticle(req.body, (data) => {
      console.log(data);
      if (data.affectedRows >= 1) {
        res.redirect('/dbBoard');
      } else {
        // 사용자가 요청을 제대로 했지만 서버에서 오류난케이스
        const err = new Error('글쓰기 실패');
        err.statusCode = 500;
        throw err;
      }
    });
  } else {
    // 사용자가 요청을 잘못한경우
    const err = new Error('글 제목 또는 내용이 없습니다');
    err.statusCode = 400;
    throw err;
  }
});
// 글 수정 모드로 이동
router.get('/modify/:id', (req, res) => {
  boardDB.getArticle(req.params.id, (data) => {
    if (data.length > 0) {
      res.render('db_board_modify', { selectedArticle: data[0] });
    } else {
      const err = new Error('해당 ID 값을 가지는 게시글이 없습니다 !');
      err.statusCode = 500;
      throw err;
    }
  });
});

// 글 수정하기
router.post('/modify/:id', (req, res) => {
  if (req.body.title && req.body.content) {
    boardDB.modifyArticle(req.params.id, req.body, (data) => {
      if (data.affectedRows >= 1) {
        res.redirect('/dbBoard');
      } else {
        // affectedRows가 1 이 아닐때
        const err = new Error('글 수정 실패');
        err.statusCode = 500;
        throw err;
      }
    });
  } else {
    const err = new Error('글 제목 또는 내용이 없습니다');
    err.statusCode = 400;
    throw err;
  }
});

// 글 삭제
router.delete('/delete/:id', (req, res) => {
  // console.log('왔니?@@@@@@@@@@@@@@@@@@@@@@2');
  // console.log(req.params.id);
  boardDB.deleteArticle(req.params.id, (data) => {
    if (data.affectedRows >= 1) {
      res.send('삭제완료');
      // res.status(200).send('삭제완료');
    } else {
      const err = new Error('삭제실패');
      err.statusCode = 500;
      throw err;
    }
  });
});

router.get('/getAll', (req, res) => {
  boardDB.getAllArticles((data) => {
    res.send(data);
  });
});

module.exports = router;
