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

// const mongoClient = require('./mongoConnect');

// const userDB = {
//   // 중복회원 찾기
//   userCheck: async (userID) => {
//     try {
//       const client = await mongoClient.connect();
//       const user = client.db('kdt5').collection('user');
//       const findUser = await user.findOne({ id: userID });
//       // findUser 에 undefined 가 되어야 중복확인 가능
//       return findUser;
//     } catch (err) {
//       console.error(err);
//     }
//   },

//   // 회원가입하기
//   registerUser: async (newUser) => {
//     try {
//       const client = await mongoClient.connect();
//       const user = client.db('kdt5').collection('user');

//       await user.insertOne(newUser);
//       return true;
//     } catch (err) {
//       console.error(err);
//     }
//   },
// };
// module.exports = userDB;

// Code Refactoring
const mongoClient = require('./mongoConnect');

const UNEXPECTED_MSG =
  '알 수 없는 문제 발생 <br><a href="/register">회원가입으로 이동</a>';
const DUPLICATED_MSG =
  '동일한 ID를 가지는 회원이 존재합니다 <br><a href="/register">회원가입으로 이동</a>';

const SUCCESS_MSG =
  '회원가입 성공 <br><a href="/register">로그인 페이지로 이동</a>';

const UNEXPECTED_MSG_LOGIN =
  '알 수 없는 문제 발생 <br><a href="/login">로그인으로 이동</a>';

const LOGIN_NOTREGISTERED_MSG =
  '입력하신 ID를 가지는 회원이 존재하지않습니다 <br><a href="/register">회원가입으로 이동</a>';

const LOGIN_WRONGPASSWORD_MSG =
  '비밀번호가 틀렸습니다 <br><a href="/login">로그인 이동</a>';

const registerUser = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const user = client.db('kdt5').collection('user');
    // 중복 확인
    const duplicatedUser = await user.findOne({ id: req.body.id });
    if (duplicatedUser) return res.status(400).send(DUPLICATED_MSG);
    // return 에서 종료되면 insertOne req.body 에서 회원가입시키면됨
    await user.insertOne(req.body);
    res.status(200).send(SUCCESS_MSG);
  } catch (err) {
    console.error(err);
    res.status(500).send(UNEXPECTED_MSG);
  }
};

const loginUser = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const user = client.db('kdt5').collection('user');

    const findUser = await user.findOne({ id: req.body.id });
    if (!findUser) return res.status(400).send(LOGIN_NOTREGISTERED_MSG);
    if (findUser.password !== req.body.password)
      return res.status(400).send(LOGIN_WRONGPASSWORD_MSG);

    req.session.login = true;
    req.session.userId = req.body.id;

    res.cookie('user', req.body.id, {
      maxAge: 1000 * 30,
      httpOnly: true,
      signed: true,
    });
    res.status(200);
    res.redirect('/dbBoard');
  } catch (err) {
    console.error(err);
    res.status(500).send(UNEXPECTED_MSG_LOGIN);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
