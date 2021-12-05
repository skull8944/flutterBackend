const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const runRecordSchema = new mongoose.Schema({
  userName: String,
  distance: String,
  time: String,
  calories: String
}, {
  timestamps: { createdAt: 'created_at' }
});

runRecordSchema.post('save', async function(doc, next){
  next();
});

const RunRecord = mongoose.model('run_record', friendSchema);

module.exports = RunRecord;