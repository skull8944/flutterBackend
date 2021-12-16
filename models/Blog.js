const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    required: true
  },
  distance: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  collect: {
    type: String,
    required: true
  },
  runRecordID: {
    type: String,
    required: true
  }
}, {
  timestamps: { createdAt: 'created_at' }
});

blogSchema.post('save', async function(doc, next){
  next();
});

const Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;