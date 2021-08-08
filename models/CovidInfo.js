const mongoose = require('mongoose');

const covidInfoSchema = new mongoose.Schema({
  date:{
    type: String,
    require: true,
  },
  totalConfirmed: {
    type: String,
    required: true,
  },
  localConfirmed: {
    type: String,
    required: true,
  },
  newTotalConfirmed: {
    type: String,
    required: true,
  },
  newLocalConfirmed: {
    type: String,
    required: true,
  },
  totalDeath: {
    type: String,
    required: true,
  },
  newDeath: {
    type: String,
    required: true,
  },
  injection: {
    type: String,
    required: true,
  },
  newInjection: {
    type: String,
    required: true,
  },
}, {
  timestamps: { createdAt: 'created_at' }
});

//fire a function after doc saved to db
covidInfoSchema.post('save', function(doc, next) {
  console.log('new covidInfo was created & saved', doc);
  next();
});

const CovidInfo = mongoose.model('covidInfo',covidInfoSchema);

module.exports = CovidInfo;