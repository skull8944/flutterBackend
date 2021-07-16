const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  userToken: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  images: {
    data: Buffer,
    contentType: String,
  },
  content: {    
    type: String,
    required: [true, '請輸入貼文內容'],
  },
  updatedTime: {
    type: String,
    required: true,
  }
});

blogSchema.post('save', async function(doc, next){
  console.log(log);
  next();
});

const Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;