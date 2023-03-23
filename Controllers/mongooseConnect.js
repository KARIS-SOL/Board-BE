const mongoose = require('mongoose');

const { MONGO_DB_URI } = process.env;

// const MONGO_DB_URI =
//   'mongodb+srv://soleee90:wlsthf11@cluster0.iv78wqp.mongodb.net/?retryWrites=true&w=majority';

const connect = async () => {
  try {
    await mongoose.connect(MONGO_DB_URI, {
      // 설정값 지정
      dbName: 'kdt5',
      useNewUrlParser: true,
    });

    console.log('몽구스 접속 성공!');
    // catch err 랑 다름
    mongoose.connection.on('error', (err) => {
      console.error('몽고 디비 연결 에러', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.error('몽고 디비 연결이 끊어졌습니다. 연결을 재시도 합니다!');
      connect();
    });
  } catch (err) {
    console.error(err);
  }
};

connect();

module.exports = connect;
