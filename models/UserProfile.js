const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  userId: {
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
  console.log('user profile was updeted', doc);
  next();
});

const UserProfile = mongoose.model('userProfile', userProfileSchema);

module.exports = UserProfile;