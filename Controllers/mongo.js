// const { MongoClient, ServerApiVersion } = require('mongodb');

// const uri =
//   'mongodb+srv://soleee90:wlsthf11@cluster0.iv78wqp.mongodb.net/?retryWrites=true&w=majority';

// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: false,
//   serverApi: ServerApiVersion.v1,
// });

// client.connect((err) => {
//   const test = client.db('kdt5').collection('test');

//   test.deleteMany({}, (deleteErr, deleteResult) => {
//     // 빈 객체는 전부 지워준다.
//     if (deleteErr) throw deleteErr;
//     console.log(deleteResult);

//     test.insertOne(
//       {
//         name: 'pororo',
//         age: 5,
//       },
//       (insertErr, insertResult) => {
//         if (insertErr) throw insertErr;
//         console.log(insertResult);
//       },
//     );
//   });
// });

// deleteOne 쿼리
// const { MongoClient, ServerApiVersion } = require('mongodb');

// const uri =
//   'mongodb+srv://soleee90:wlsthf11@cluster0.iv78wqp.mongodb.net/?retryWrites=true&w=majority';

// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: false,
//   serverApi: ServerApiVersion.v1,
// });

// client.connect((err) => {
//   const test = client.db('kdt5').collection('test');

//   test.deleteMany({}, (deleteErr, deleteResult) => {
//     // 빈 객체는 전부 지워준다.
//     if (deleteErr) throw deleteErr;
//     test.insertMany(
//       [
//         { name: 'pororo', age: 5 },
//         { name: 'loopy', age: 6 },
//         { name: 'crong', age: 4 },
//       ],
//       (insertErr, insertResult) => {
//         if (insertErr) throw insertErr;
//         console.log(insertResult);

//         test.deleteMany(
//           { age: { $gte: 5 } },
//           (deleteManyErr, deleteManyResult) => {
//             console.log(deleteManyResult);
//           },
//         );
//       },
//     );
//   });
// });

// update query
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://soleee90:wlsthf11@cluster0.iv78wqp.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: false,
  serverApi: ServerApiVersion.v1,
});

// client.connect((err) => {
//   const test = client.db('kdt5').collection('test');

//   test.deleteMany({}, (deleteErr, deleteResult) => {
//     // 빈 객체는 전부 지워준다.
//     if (deleteErr) throw deletErr;
//     test.insertMany(
//       [
//         { name: 'pororo', age: 5 },
//         { name: 'loopy', age: 6 },
//         { name: 'crong', age: 4 },
//       ],
//       (insertErr, insertResult) => {
//         if (insertErr) throw insertErr;
//         console.log(insertResult);

//         test.updateMany(
//           { age: { $gte: 5 } },
//           { $set: { name: '5살 이상인 친구들' } },
//           (updateErr, updateResult) => {
//             if (updateErr) throw updateErr;
//             console.log(updateResult);
//           },
//         );
//       },
//     );
//   });
// });

// 검색 Query

client.connect((err) => {
  const test = client.db('kdt5').collection('test');

  test.deleteMany({}, (deleteErr, deleteResult) => {
    if (deleteErr) throw deletErr;
    test.insertMany(
      [
        { name: 'pororo', age: 5 },
        { name: 'loopy', age: 6 },
        { name: 'crong', age: 4 },
      ],
      (insertErr, insertResult) => {
        if (insertErr) throw insertErr;
        // nameL'loopy' 대신 {} 적으면 All 이라는 뜻
        const findCursor = test.find({ name: 'loopy' });
        console.log(findCursor);
        findCursor.toArray((toArrErr, toArrData) => {
          if (toArrErr) throw toArrErr;
          console.log(toArrData);
        });
      },
    );
  });
});
