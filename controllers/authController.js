const User = require("../models/User");
const jwt = require("jsonwebtoken");

//handel errors
function handelErrors(err){
  console.log(err.message, err.code);
  let errors = { email: '', password: '' } 

  if(err.message === 'incorrect email'){
    errors.email = '此email未被註冊過';
  }

  if(err.message === 'incorrect password'){
    errors.password = '密碼不正確';
  }

  //重複錯誤
  if(err.code == 11000){
    errors.email = '該email已經被註冊了';
  }

  //validation errors
  if(err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({properties}) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};


function createToken(id){
  return jwt.sign({ id }, 'secret');
}

module.exports.signup_get = (req, res) => {
  res.send('signup');
};

module.exports.login_get = (req, res) => {
  res.send('login');
};

module.exports.signup_post = async (req, res) => {
  console.log(req.body);
  const { email, password, name } = req.body;
  try{
    const user = await User.create({ email, password, name });
    res.status(201).json({ user: user._id });
  }catch(err){
    const errors = handelErrors(err);
    res.status(404).json({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try{
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ user: user._id, name: user.name }); 
  }catch(err){
    const errors = handelErrors(err);
    res.status(404).json({ errors });
  }
};

module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
};