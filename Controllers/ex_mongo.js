const {
  MongoClient,
  ServerApiVersion,
  TopologyDescriptionChangedEvent,
} = require('mongodb');

const uri =
  'mongodb+srv://soleee90:wlsthf11@cluster0.iv78wqp.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: false,
  serverApi: ServerApiVersion.v1,
});

client.connect((err) => {
  const member = client.db('kdt5').collection('member');

  member.deleteMany({}, (deleteManyErr, deleteManyResult) => {
    if (deleteManyErr) throw deleteManyErr;

    member.insertMany(
      [
        { name: '신상아', age: 24 },
        { name: '김호준', age: 29 },
        { name: '홍성범', age: 32 },
        { name: '구슬기', age: 30 },
      ],
      (insertManyErr, insertManyResult) => {
        if (insertManyErr) throw insertManyErr;

        member.insertOne(
          { name: '이효석', age: 39 },
          (insertOneErr, insertOneReuslt) => {
            if (insertOneErr) throw insertOneErr;

            member.deleteOne(
              { name: '신상아' },
              (deleteOneErr, deleteOneResult) => {
                if (deleteOneErr) throw deleteOneErr;

                member.updateOne(
                  { name: '이효석' },
                  { $set: { name: '신상아', age: 24 } },
                  (updateOneErr, updateOneResult) => {
                    if (updateOneErr) throw updateOneErr;

                    const oldCursor = member.find({ age: { $gte: 25 } });

                    oldCursor.toArray((toArrErr, toArrData) => {
                      if (toArrErr) throw toArrErr;
                      console.log(toArrData);
                    });
                  },
                );
              },
            );
          },
        );
      },
    );
  });
});
