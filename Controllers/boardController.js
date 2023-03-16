const connection = require('./dbConnect');

const boardDB = {
  // 모든 게시글 가져오기

  getAllArticles: (cb) => {
    // 데이터를 갖기 위한 콜백 함수를 갖고 있음

    connection.query('SELECT * from mydb.board', (err, data) => {
      // 데이터베이스 커넥션으로부터 쿼리 전달
      if (err) throw err; // 에러 있으면 던지기
      console.log(data); // 데이터 잘 들어왔는지 찍어보기
      cb(data); // 콜백함수의 인자로써 받아온 데이터를 날려줌
    });
  },

  // 게시글 추가하기
  writeArticle: (newArticle, cb) => {
    connection.query(
      `INSERT INTO mydb.board (TITLE, CONTENT) values ('${newArticle.title}', '${newArticle.content}');`,
      (err, data) => {
        if (err) throw err;
        cb(data);
      },
    );
  },
  // 특정 ID 값을 가지는 게시글 찾기
  getArticle: (id, cb) => {
    connection.query(
      `SELECT * FROM mydb.board WHERE ID_PK = ${id};`,
      (err, data) => {
        if (err) throw err;
        cb(data);
      },
    );
  },
  // 특정을 ID를 가지는 게시글을 수정하는 컨트롤러
  modifyArticle: (id, modifyArticle, cb) => {
    connection.query(
      `UPDATE mydb.board SET TITLE = '${modifyArticle.title}', CONTENT = '${modifyArticle.content}' WHERE ID_PK = ${id};`,
      (err, data) => {
        if (err) throw err;
        cb(data);
      },
    );
  },
  // 특정 ID를 가지는 게시글을 삭제하는 컨트롤러
  deleteArticle: (id, cb) => {
    connection.query(
      `DELETE FROM mydb.board WHERE ID_PK = ${id};`,
      (err, data) => {
        if (err) throw err;
        cb(data);
      },
    );
  },
};

module.exports = boardDB;
