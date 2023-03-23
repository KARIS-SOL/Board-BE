const mongoose = require('mongoose');
const { Schema } = mongoose;

// 외우는게 좋은 부분
const userSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'mongoose-user',
  },
);
// User (대문자 U)라는 이름으로 외부에서 호출
module.exports = mongoose.model('User', userSchema);
