const { ObjectId } = require('mongodb');

const mongoClient = require('./mongoConnect');
const UNEXPECTED_MSG = '<br><a href="/">메인페이지로 이동</a>';

const getAllArticles = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const board = client.db('kdt5').collection('board');

    //빈객체를 이용해서 전부를 가짐
    const allArticleCursor = board.find({});
    const ARTICLE = await allArticleCursor.toArray();
    res.render('db_board', {
      ARTICLE,
      articleCounts: ARTICLE.length,
      userId: req.session.userId,
    });
  } catch (err) {
    console.error(err);
    // 어떤 에러가 날지 모르니깐
    res.status(500).send(err.message + UNEXPECTED_MSG);
  }
};

// 새로운 글쓰기 컨트롤러
const writeArticle = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const board = client.db('kdt5').collection('board');

    console.log(req.file);

    const newArticle = {
      USERID: req.session.userId,
      TITLE: req.body.title,
      CONTENT: req.body.content,
      IMAGE: req.file ? req.file.filename : null,
    };
    await board.insertOne(newArticle);
    res.redirect('/dbBoard');
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message + UNEXPECTED_MSG);
  }
};

// 수정하기
const getArticle = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const board = client.db('kdt5').collection('board');

    const selectedArticle = await board.findOne({
      _id: ObjectId(req.params.id),
    });

    res.render('db_board_modify', { selectedArticle });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message + UNEXPECTED_MSG);
  }
};

// 버튼을 누르면 수정
const modifyArticle = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const board = client.db('kdt5').collection('board');
    const modify = {
      TITLE: req.body.title,
      CONTENT: req.body.content,
    };
    if (req.file) modify.IMAGE = req.file.filename;

    await board.updateOne(
      {
        _id: ObjectId(req.params.id),
      },
      { $set: modify },
    );

    res.status(200).redirect('/dbBoard');
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message + UNEXPECTED_MSG);
  }
};

const deleteArticle = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const board = client.db('kdt5').collection('board');

    await board.deleteOne({ _id: ObjectId(req.params.id) });
    res.status(200).json('삭제성공');
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message + UNEXPECTED_MSG);
  }
};

module.exports = {
  getAllArticles,
  writeArticle,
  getArticle,
  modifyArticle,
  deleteArticle,
};

// const boardDB = {
//   // 모든 게시글 가져오기

//   getAllArticles: (cb) => {
//     // 데이터를 갖기 위한 콜백 함수를 갖고 있음

//     connection.query('SELECT * from mydb.board', (err, data) => {
//       // 데이터베이스 커넥션으로부터 쿼리 전달
//       if (err) throw err; // 에러 있으면 던지기
//       console.log(data); // 데이터 잘 들어왔는지 찍어보기
//       cb(data); // 콜백함수의 인자로써 받아온 데이터를 날려줌
//     });
//   },

//   // 게시글 추가하기
//   writeArticle: (newArticle, cb) => {
//     boardDB.query(
//       `INSERT INTO mydb.board ( USERID, TITLE, CONTENT) VALUES ('${newArticle.id}','${newArticle.title}', '${newArticle.content}');`,
//       (err, data) => {
//         if (err) throw err;
//         cb(data);
//       },
//     );
//   },
//   // 특정 ID 값을 가지는 게시글 찾기
//   getArticle: (id, cb) => {
//     connection.query(
//       `SELECT * FROM mydb.board WHERE ID_PK = ${id};`,
//       (err, data) => {
//         if (err) throw err;
//         cb(data);
//       },
//     );
//   },
//   // 특정을 ID를 가지는 게시글을 수정하는 컨트롤러
//   modifyArticle: (id, modifyArticle, cb) => {
//     connection.query(
//       `UPDATE mydb.board SET TITLE = '${modifyArticle.title}', CONTENT = '${modifyArticle.content}' WHERE ID_PK = ${id};`,
//       (err, data) => {
//         if (err) throw err;
//         cb(data);
//       },
//     );
//   },
//   // 특정 ID를 가지는 게시글을 삭제하는 컨트롤러
//   deleteArticle: (id, cb) => {
//     connection.query(
//       `DELETE FROM mydb.board WHERE ID_PK = ${id};`,
//       (err, data) => {
//         if (err) throw err;
//         cb(data);
//       },
//     );
//   },
// };

// module.exports = boardDB;
