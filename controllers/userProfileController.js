const UserProfile = require("../models/UserProfile");

module.exports.userProfile_get = async (req, res) => {
  try {
    userId = req.params.token;
    const userProfile = await UserProfile.findOne(userId);
    res.status(200).json({ 
      sex: userProfile.sex, 
      height: userProfile.height, 
      weight: userProfile.weight,  
      birthdate: userProfile.birthdate,
      headshot: userProfile.headshot
    });
  }
  catch(err) {
    res.status(404).send(err);
  }
};

module.exports.userProfile_post = async (req, res) => {
  var userId = req.params.token;
  console.log(userId);
  const { sex, height, weight, birthdate } = req.body;
  try{
    const userProfile = await UserProfile.create({
      userId, sex,  height, weight, birthdate, headshot: ''
    });
    res.status(201).json({ 
      sex: userProfile.sex, 
      height: userProfile.height, 
      weight: userProfile.weight,  
      birthdate: userProfile.birthdate
    });
  }catch(err){
    res.status(404).send(err);
  }
};

module.exports.userProile_addimg = async (req, res) => {
  try {
    UserProfile.findByIdAndUpdate(
      { userId: req.params.token },
      {
        $set: {
          headshot: req.file.path,
        },
      },
      { new: true },
      (err, profile) => {
        if (err) 
          return res.status(500).send(err);
        const response = {
          message: "image added successfully updated",
          data: profile,
        };
        return res.status(200).send(response);
      }
    );
  } catch(err) {
    console.log(err);
  }
}