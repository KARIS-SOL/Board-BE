const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://soleee90:wlsthf11@cluster0.iv78wqp.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: false,
  serverApi: ServerApiVersion.v1,
});

module.exports = client;
