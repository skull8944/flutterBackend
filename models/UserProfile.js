const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  height: {
    type: String,
    required: true
  },
  weight: {
    type: String,
    required: true
  },
  birthdate: {
    type: String,
    required: true
  },
  headshot: {
    type: String,
  },
});

userProfileSchema.post('save', function(doc, next) {
  console.log('user profile was updated', doc);
  next();
});

userProfileSchema.pre('save', async function(next) {
  const userProfile = await UserProfile.findOne({ userName: this.name });
  if(userProfile) {
    throw Error('Repeat UserProfile');
  } else {
    next();
  }  
});

const UserProfile = mongoose.model('userProfile', userProfileSchema);

module.exports = UserProfile;