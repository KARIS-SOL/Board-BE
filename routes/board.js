const express = require('express');

const router = express.Router();

const ARTICLE = [
  {
    title: 'title1',
    content: 'Happy Monday',
  },
  {
    title: 'title2',
    content: 'Happy Friday',
  },
];

// localhost:4000/board
// 글 전체 목록 보여주기
router.get('/', (req, res) => {
  res.render('board', { ARTICLE, articleCounts: ARTICLE.length });
});

// 글쓰기
// 글 쓰기 모드로 이동
router.get('/write', (req, res) => {
  res.render('board_write');
});

// 글 추가 - form 으로 작성된 글을 추가
// object 하기 전에 console.log 로 body 값을 터미널에서 확인.
router.post('/write', (req, res) => {
  if (req.body.title && req.body.content) {
    const newArticle = {
      title: req.body.title,
      content: req.body.content,
    };

    ARTICLE.push(newArticle);
    res.redirect('/board');
  } else {
    const err = new Error('폼 입력을 확인하세요');
    err.statusCode = 400;
    throw err;
  }
});

// 글수정
// 글수정 모드로 이동 - param으로 어떤 title의 글을 수정할 지 알아야하니깐 :title 선언
// 원하는 값과 같은 값을 찾아서 변경 해줘야함.
router.get('/modify/:title', (req, res) => {
  const arrIndex = ARTICLE.findIndex(
    (article) => req.params.title === article.title
  );
  const selectedArticle = ARTICLE[arrIndex];
  res.render('board_modify', { selectedArticle });
});

router.post('/modify/:title', (req, res) => {
  if (req.body.title && req.body.content) {
    const arrIndex = ARTICLE.findIndex(
      (article) => article.title === req.params.title
    );
    ARTICLE[arrIndex].title = req.body.title;
    ARTICLE[arrIndex].content = req.body.content;
    res.redirect('/board');
  } else {
    const err = new Error('폼 입력을 확인하세요');
    err.statusCode = 400;
    throw err;
  }
});

//글삭제
router.delete('/delete/:title', (req, res) => {
  const arrIndex = ARTICLE.findIndex(
    (article) => article.title === req.params.title
  );
  ARTICLE.splice(arrIndex, 1);
  // res.redirect('/board'); - 여기서 안먹힘 왜? 여기선 redirect가 delete 를 따라가길 때문.
  res.send('삭제완료');
});

module.exports = router;
