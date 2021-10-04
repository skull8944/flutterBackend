const UserProfile = require("../models/UserProfile");

module.exports.userProfile_get = async (req, res) => {
  try {
    var userName = req.params.userName;
    const userProfile = await UserProfile.findOne({userName});
    if(userProfile) {
      res.status(200).json({ 
        userName: userProfile.userName,
        sex: userProfile.sex, 
        height: userProfile.height, 
        weight: userProfile.weight,  
        birthdate: userProfile.birthdate,
        headshot: userProfile.headshot
      });
    } else {
      res.status(404).send("Can't find the profile of the user!")
    }    
  }
  catch(err) {
    console.log(err);
    res.status(404).send(err);
  }
};

module.exports.userProfile_post = async (req, res) => {
  var userName = req.params.userName;
  console.log(userName);
  const { sex, height, weight, birthdate } = req.body;
  try{
    const userProfile = await UserProfile.create({
      userName, sex,  height, weight, birthdate, headshot: 'headshots/iltbb.png'
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
    UserProfile.findOneAndUpdate(
      { userName: req.params.userName },
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

module.exports.height_edit = async (req, res) => {
  try {
    console.log(req.body.height);
    UserProfile.findOneAndUpdate(
      { userName: req.params.userName },
      {
        $set: {
          height: req.body.height,
        },
      },
      { new: true },
      (err, profile) => {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        }          
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

module.exports.weight_edit = async (req, res) => {
  try {
    UserProfile.findOneAndUpdate(
      { userName: req.params.userName },
      {
        $set: {
          weight: req.body.weight,
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

module.exports.sex_edit = async (req, res) => {
  try {
    UserProfile.findOneAndUpdate(
      { userName: req.params.userName },
      {
        $set: {
          sex: req.body.sex,
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

module.exports.birthdate_edit = async (req, res) => {
  try {
    UserProfile.findOneAndUpdate(
      { userName: req.params.userName },
      {
        $set: {
          birthdate: req.body.birthdate,
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

module.exports.suggestions_get = async(req, res) => {
  console.log(req.params.query);
  const userProfile = await UserProfile.find({
    userName: { $regex: req.params.query, $options: 'i' }
  })

  if(userProfile) {
    console.log(userProfile[0].userName);
    res.status(201).json({
      userProfile
    })
  } else {
    res.status(404).send('no users found');
  }
}