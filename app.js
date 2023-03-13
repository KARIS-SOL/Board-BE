const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

// 서버에게 명령 (view engine으로는 ejs 를 가져다 쓸거다)
app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static('public')); // static 설정
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// router 불러오기
const mainRouter = require('./routes');
const userRouter = require('./routes/users');
const boardRouter = require('./routes/board');

// 서버한테 알려주기 (main 으로 들어오는건 mainRouter 에서, user 로 들어오는건 userRouter 에서 처리한다고 선언)
app.use('/', mainRouter);
app.use('/users', userRouter);
app.use('/board', boardRouter);
// error 받아주기
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode);
  res.send(err.message);
});

// 서버최초실행
app.listen(PORT, () => {
  console.log(`서버는 ${PORT}번 포트에서 실행 중입니다`);
});
