const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const friendSchema = new mongoose.Schema({
  requester: { type: String, ref: 'Users'},
  recipient: { type: String, ref: 'Users'},
  status: {
    type: Number,
    enums: [
        0,    //'add friend',
        1,    //'requested',
        2,    //'pending',
        3,    //'friends'
    ]
  }
}, {
  timestamps: { createdAt: 'created_at' }
});

friendSchema.post('save', async function(doc, next){
  next();
});

const Friend = mongoose.model('friend', friendSchema);

module.exports = Friend;