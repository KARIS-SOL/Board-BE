const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://soleee90:wlsthf11@cluster0.iv78wqp.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: false,
  serverApi: ServerApiVersion.v1,
});

async function main() {
  try {
    await client.connect();
    const member = client.db('kdt5').collection('member');

    await member.deleteMany({});
    await member.insertMany([
      { name: '신상아', age: 24 },
      { name: '김호준', age: 29 },
      { name: '홍성범', age: 32 },
      { name: '구슬기', age: 30 },
    ]);

    await member.insertOne({ name: '이효석', age: 39 });
    await member.deleteOne({ name: '신상아' });
    await member.updateOne(
      { name: '이효석' },
      { $set: { name: '신상아', age: 24 } },
    );

    const findCursor = member.find({ age: { $gte: 25 } });
    const dataArr = await findCursor.toArray();
    console.log(dataArr);
  } catch (err) {
    console.error(err);
  }
}

main();
