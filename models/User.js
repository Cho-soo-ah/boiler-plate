const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
// 스키마 정의
const userSchema = mongoose.Schema({
  name: { type: String, maxlength: 50 },
  email: { type: String, trim: true, unique: 1 },
  password: { type: String, minlength: 5 },
  lastname: { type: String, maxlength: 50 },
  role: { type: Number, default: 0 },
  image: { type: String },
  token: { type: String },
  tokenExp: { type: Number },
});

userSchema.pre("save", function (next) {
  // 유저모델에 저장하기 전 실행

  var user = this;

  // 비밀번호가 변환될 때만 암호화해준다.
  if (user.isModified("password")) {
    // salt를 이용해서 비밀번호를 암호화 시킨다.
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        // hash : 암호화된 비밀번호
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// 암호화된 비밀번호 체크
userSchema.methods.comparePassword = function (plainPassword, cb) {
  // plainPassword 123456 === 암호화된 비밀번호 $2b$10$OgIUZNfXGQk0iV3DqwaLB.qrwv56FxsOHg4o7wMl1eJRTdu.GQY8i
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// 토큰 생성
userSchema.methods.generateToken = function (cb) {
  var user = this;
  console.log("user_id", user._id);
  // jsonwebtoken으로 token 생성하기
  var token = jwt.sign(user._id.toHexString(), "secretToken");
  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
