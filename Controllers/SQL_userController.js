// // Mysql 과 접속할 수 있는 모듈 만들기
// const connection = require('./dbConnect');

// const userDB = {
//   getUsers: (cb) => {
//     connection.query('SELECT * FROM mydb.user;', (err, data) => {
//       if (err) throw err;
//       console.log(data);
//       cb(data);
//     });
//   },
// };
// 콜백을 쓰는 이유는 데이터를 읽고 나서 데이터를 리턴해주면 콜백에 담아서 전다해줘야 하기 때문에

// 회원가입 및 로그인

const connection = require('./dbConnect');

const userDB = {
  // 중복회원 찾기
  userCheck: (userID, cb) => {
    connection.query(
      `SELECT * FROM mydb.user WHERE USERID = '${userID}';`,
      (err, data) => {
        if (err) throw err;
        console.log(data);
        cb(data);
      },
    );
  },
  // 회원가입하기
  registerUser: (newUser, cb) => {
    connection.query(
      `INSERT INTO mydb.user (USERID, PASSWORD) values ( '${newUser.id}', '${newUser.password}' );`,
      (err, data) => {
        if (err) throw err;
        cb(data);
      },
    );
  },
};

module.exports = userDB;
