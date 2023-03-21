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

const mongoClient = require('./mongoConnect');

const userDB = {
  // 중복회원 찾기
  userCheck: async (userID) => {
    try {
      const client = await mongoClient.connect();
      const user = client.db('kdt5').collection('user');
      const findUser = await user.findOne({ id: userID });
      // findUser 에 undefined 가 되어야 중복확인 가능
      return findUser;
    } catch (err) {
      console.error(err);
    }
  },

  // 회원가입하기
  registerUser: async (newUser) => {
    try {
      const client = await mongoClient.connect();
      const user = client.db('kdt5').collection('user');

      await user.insertOne(newUser);
      return true;
    } catch (err) {
      console.error(err);
    }
  },
};
module.exports = userDB;
