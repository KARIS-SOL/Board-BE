// DB와 관련된 Board의 모든 기능을 가지는 라우터

const express = require('express');
const {
  getAllArticles,
  writeArticle,
  getArticle,
  modifyArticle,
  deleteArticle,
} = require('../controllers/boardController');

const router = express.Router();

// 로그인 확인용 미들웨어
const isLogin = (req, res, next) => {
  if (req.session.login || req.signedCookies.user) {
    next();
  } else {
    res.status(404);
    res.send(
      '로그인이 필요한 서비스 입니다 </br><a href="/login">로그인 페이지로 이동 </a>',
    );
  }
};

// 게시판 페이지 호출
router.get('/', isLogin, getAllArticles);

// 글쓰기 모드로 이동
router.get('/write', (req, res) => {
  res.render('db_board_write');
});

// 글쓰기
router.post('/write', isLogin, writeArticle);

// 글 수정모드로 이동
router.get('/modify/:id', isLogin, getArticle);

// 글수정
router.post('/modify/:id', isLogin, modifyArticle);

// 글삭제
router.delete('/delete/:id', isLogin, deleteArticle);

// 미들웨어 작성

// router.get('/', isLogin, (req, res) => {
//   boardDB.getAllArticles((data) => {
//     const ARTICLE = data;
//     const articleCounts = ARTICLE.length;
//     // user ID 를 구조분해 할당으로, ID가 동일한사람만 삭제와 수정이 가능하게
//     const { userId } = req.session;
//     res.render('db_board', { ARTICLE, articleCounts, userId });
//   });
// });

// // 글쓰기 페이지 호출
// router.get('/write', (req, res) => {
//   res.render('db_board_write');
// });

// // 데이터베이스에 글쓰기
// router.post('/write', isLogin, (req, res) => {
//   // console.log(req.body); // 파라미터가 아닌 form 으로 넘기니 req.body로 받아야 함
//   if (req.body.title && req.body.content) {
//     const newArticle = {
//       id: req.session.userId,
//       title: req.body.title,
//       content: req.body.content,
//     };
//     boardDB.writeArticle(req.body, (data) => {
//       // console.log(data);
//       if (data.affectedRows >= 1) {
//         res.status(200);
//         res.redirect('/dbBoard');
//       } else {
//         // 사용자가 요청을 제대로 했지만 서버에서 오류난케이스
//         const err = new Error('글쓰기 실패');
//         err.statusCode = 500;
//         throw err;
//       }
//     });
//   } else {
//     // 사용자가 요청을 잘못한경우
//     const err = new Error('글 제목 또는 내용이 없습니다');
//     err.statusCode = 400;
//     throw err;
//   }
// });
// // 글 수정 모드로 이동
// router.get('/modify/:id', isLogin, (req, res) => {
//   boardDB.getArticle(req.params.id, (data) => {
//     if (data.length > 0) {
//       res.render('db_board_modify', { selectedArticle: data[0] });
//     } else {
//       const err = new Error('해당 ID 값을 가지는 게시글이 없습니다 !');
//       err.statusCode = 500;
//       throw err;
//     }
//   });
// });

// // 글 수정하기
// router.post('/modify/:id', isLogin, (req, res) => {
//   if (req.body.title && req.body.content) {
//     boardDB.modifyArticle(req.params.id, req.body, (data) => {
//       if (data.affectedRows >= 1) {
//         res.redirect('/dbBoard');
//       } else {
//         // affectedRows가 1 이 아닐때
//         const err = new Error('글 수정 실패');
//         err.statusCode = 500;
//         throw err;
//       }
//     });
//   } else {
//     const err = new Error('글 제목 또는 내용이 없습니다');
//     err.statusCode = 400;
//     throw err;
//   }
// });

// // 글 삭제
// router.delete('/delete/:id', isLogin, (req, res) => {
//   // console.log('왔니?@@@@@@@@@@@@@@@@@@@@@@2');
//   // console.log(req.params.id);
//   boardDB.deleteArticle(req.params.id, (data) => {
//     if (data.affectedRows >= 1) {
//       res.send('삭제완료');
//       // res.status(200).send('삭제완료');
//     } else {
//       const err = new Error('삭제실패');
//       err.statusCode = 500;
//       throw err;
//     }
//   });
// });

// router.get('/getAll', (req, res) => {
//   boardDB.getAllArticles((data) => {
//     res.send(data);
//   });
// });

module.exports = router;
