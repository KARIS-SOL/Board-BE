const express = require('express');

const router = express.Router();

const ARTICLE = [
  {
    title: 'title1',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ex mollitia consequuntur veritatis cupiditate pariatur facilis soluta facere iure reiciendis voluptas odit animi, eos ipsam, tempore nostrum dignissimos necessitatibus maiores.',
  },
  {
    title: 'title2',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ex mollitia consequuntur veritatis cupiditate pariatur facilis soluta facere iure reiciendis voluptas odit animi, eos ipsam, tempore nostrum dignissimos necessitatibus maiores.',
  },
];

// localhost:4000/board/

// 글 전체 목록 보여주기
router.get('/', (req, res) => {
  res.render('board', { ARTICLE, articleCounts: ARTICLE.length });
});

// 글 쓰기 모드로 이동
router.get('/write', (req, res) => {
  res.render('board_write');
});

// 글 추가
router.post('/write', (req, res) => {
  if (req.body.title && req.body.content) {
    const newArticle = {
      title: req.body.title,
      content: req.body.content,
    };
    ARTICLE.push(newArticle);
    res.redirect('/board');
  } else {
    const err = new Error('폼 입력을 확인해 주세요!');
    err.statusCode = 400;
    throw err;
  }
});

// 글 수정
// 글 수정 모드로 이동
router.get('/modify/:title', (req, res) => {
  // 글 제목을 통해서 수정하기 위해 modyfy 뒤에 title 파라미터 입력
  const arrIndex = ARTICLE.findIndex(
    (article) => req.params.title === article.title,
  );
  const selectedArticle = ARTICLE[arrIndex];
  res.render('board_modify', { selectedArticle });
});

router.post('/modify/:title', (req, res) => {
  if (req.body.title && req.body.content) {
    // 주소에 넘어온 param title 과 배열의 title 일치하는 index 찾기
    const arrIndex = ARTICLE.findIndex(
      (article) => article.title === req.params.title,
    );
    // 배열에 해당 index에 가서 내용을 바꿔주기
    ARTICLE[arrIndex].title = req.body.title;
    ARTICLE[arrIndex].content = req.body.content;
    res.redirect('/board'); // 목록 보여주기
  } else {
    const err = new Error('폼 입력을 확인해 주세요!');
    err.statusCode = 400;
    throw err;
  }
});

// 글 삭제
router.delete('/delete/:title', (req, res) => {
  // 주소에 넘어온 param title 과 배열의 title 일치하는 index 찾기
  const arrIndex = ARTICLE.findIndex(
    (article) => article.title === req.params.title,
  );
  // 배열에 해당 index에 가서 splice 로 해당 순서부터 1개 삭제하기
  ARTICLE.splice(arrIndex, 1);
  res.send('삭제 완료!');
  // res.redirect('/board'); // 이건 여기서 먹히지 않음 (redirect 는 router의 메소드를 따라가기 때문에 delete를 따라간다.)
});

module.exports = router;
