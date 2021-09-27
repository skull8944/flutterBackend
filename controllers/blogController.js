const Blog = require('../models/Blog');

module.exports.blog_get = async (req, res) => {

};

module.exports.blog_post = async (req, res) => {
  const { userName, distance, time } = req.body;
  try {
    const blog = await Blog.create({
      userName,
      distance,
      time,
      collect: 'false'
    });
    res.status(201).json({
      postID: blog._id,
      userName: blog.userName,
      distance: blog.distance,
      time: blog.time,
      collect: blog.collect
    });
  } catch(err) {
    res.status(404).send(err);
  }
};

module.exports.blog_patch = async (req, res) => {
  const filesPaths = [];
  for(var i = 0; i < req.files.length; i++) {
    console.log(req.files[i].path);
    filesPaths.push(req.files[i].path);
  }
  console.log(filesPaths)
  try {
    Blog.findOneAndUpdate(
      { _id: req.params.postID },
      {
        $addToSet: {
          images: filesPaths,
        },
      },
      { new: true },
      (err, profile) => {
        if (err) 
          return res.status(500).send(err);
        const response = {
          message: "image added successfully",
          data: profile,
        };
        return res.status(200).send(response);
      }
    );
  } catch(err) {
    console.log(err);
  }
};

module.exports.myblog_get = async (req, res) => {
  const userName = req.params.userName;
  console.log(userName);
  try {
    const blog = await Blog.find({ userName });
    if(blog) {
      res.status(200).json(blog);
    }
  } catch(err) {
    console.log(err)
  }
};
