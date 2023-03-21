const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://soleee90:wlsthf11@cluster0.iv78wqp.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: false,
  serverApi: ServerApiVersion.v1,
});

async function main() {
  await client.connect();
  const test = client.db('kdt5').collection('test');

  const deleteManyResult = await test.deleteMany({});
  if (!deleteManyResult.acknowledged) return '삭제에러발생';

  // const insertOneResult = await test.insertOne({ name: 'pororo', age: 5 });
  // if (!insertOneResult.acknowledged) return '데이터삽입 에러 발생';
  // console.log(insertOneResult);
  const insertManyResult = await test.insertMany([
    { name: 'pororo', age: 5 },
    { name: 'crong', age: 4 },
    { name: 'loopy', age: 6 },
  ]);
  if (!insertManyResult.acknowledged) return '데이터삽입 에러 발생';
  // const updateManyResult = await test.updateMany(
  //   { age: { $gte: 5 } },
  //   { $set: { name: '5살 이상' } },
  // );
  // console.log(updateManyResult);
  const findCursor = test.find({ age: { $gte: 5 } });
  const dataArr = await findCursor.toArray();
  console.log(dataArr);
}

main();

// try ,catch 문일때는 if 문을 생략해줘도 됨
// async function main() {
//   try {

//     await client.connect();
//     const test = client.db('kdt5').collection('test');

//     await test.deleteMany({});
//     await test.insertOne({ name: 'pororo', age: 5 });
//   } catch (err) {
//     console.error(err);
//   }
//
// main();

// // insertOne
// client.connect((err) => {
//   const test = client.db('kdt5').collection('test');

//   test.deleteMany({}, (deleteErr, deleteResult) => {
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
