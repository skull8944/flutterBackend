const User = require("../models/User");

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
    res.status(200).json({ user: user._id, name: user.name, email: user.email }); 
  }catch(err){
    const errors = handelErrors(err);
    res.status(404).json({ errors });
  }
};

module.exports.user_get = async (req, res) => {
  const _id = req.params.token;
  try {
    const user = await User.findById(_id);
    if(user) {
      res.status(200).json({ token: user._id, name: user.name, email: user.email });
    } else {
      res.status(404).send("Can't find the user!");
    }
  } catch(err) {
    res.status(404).send('Something went wrong!');
  }
}