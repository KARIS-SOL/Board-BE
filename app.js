// ----------------- 패키지 -----------------
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');

require('dotenv').config();

// --------------- 중요 정보 -----------------
const app = express(); // express 서버를 실행해서 app 변수에 넣어주기
const PORT = 4000; // 포트 번호 설정. 3000번 대 이상 수 중 아무 숫자나 포트 번호로 설정 (3000번은 안쓰는 게 좋음)

// --------------- 서버 설정 ---------------
app.use(cors()); // cors 패키지를 써라
app.set('view engine', 'ejs'); // 뷰엔진으로 ejs 를 쓸거다(ejs 가 설치되어 있어야 됨)
app.use(express.static('public')); // app.use 를 사용하여 static 폴더 사용을 서버에 알려주기 (괄호 안은 지정할 폴더명)
// 이미지 삽입
app.use('/uploads', express.static('uploads'));
// bodyparser 를 위한 코드 2줄
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('tetz'));
app.use(
  session({
    secret: '1234',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  }),
);

// --------------- 라우터 ---------------
const mainRouter = require('./routes');
const userRouter = require('./routes/users');
const boardRouter = require('./routes/board');
const dbRouter = require('./routes/db');
const dbBoardRouter = require('./routes/dbBoard');
const cookieRouter = require('./routes/cookie');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');

app.use('/', mainRouter); // '/' 이 주소로 요청이 들어오면 app.js 가 다루지 않고 mainRouter에게 하청을 맡김
app.use('/users', userRouter); // 서버야 /users 라는 url로 요청이 들어오면 userRouter 에게 담당시켜 라고 담당자 지정
app.use('/board', boardRouter);
app.use('/db', dbRouter);
app.use('/dbBoard', dbBoardRouter);
app.use('/cookie', cookieRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);

// --------------- 미들웨어 ---------------

// 기본 주소에 들어왔을 시 처리 할 미들웨어
app.get('/', (req, res) => {
  res.send('어서와 Express는 처음이지?');
});

// --------------- 에러 처리 ---------------
// 인자 4개를 입력해야만 err 를 받을 수 있다
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode);
  res.send(err.message);
});

app.listen(PORT, () => {
  console.log(`서버는 ${PORT}번 포트에서 실행 중입니다!`); // 서버를 최초 실행시켜주는 메소드  인자(어느 포트에서 , 서버가 제대로 실행되었을 때 실행시킬 콜백함수)
});
