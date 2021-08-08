const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, '請輸入email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, '請輸入有效的email']
  },
  password: {
    type: String,
    required: [true, '請輸入密碼'],
    unique: true,
    minLength: [6, '請輸入長度大於6的密碼']
  },
  name: {
    type: String,
    required: [true, '請輸入名字'],
    unique: false,
    maxLength: [8, '請輸入長度小於6的名字']
  },
});

//fire a function after doc saved to db
userSchema.post('save', function(doc, next) {
  console.log('new user was created & saved', doc);
  next();
});

//fire a function before doc saved to db
userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

//static method to login users
userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if(user){
    const auth = await bcrypt.compare(password, user.password);
    if(auth){
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};

const User = mongoose.model('user', userSchema);

module.exports = User;