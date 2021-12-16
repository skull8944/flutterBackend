const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const runRecordSchema = new mongoose.Schema({
  userName: String,
  distance: String,
  time: String,
  calories: String,
  marks: Array
}, {
  timestamps: { createdAt: 'created_at' }
});

runRecordSchema.post('save', async function(doc, next){
  next();
});

const RunRecord = mongoose.model('run_record', runRecordSchema);

module.exports = RunRecord;