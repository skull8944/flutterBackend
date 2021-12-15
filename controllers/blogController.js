const Blog = require('../models/Blog');
const Friend = require('../models/Friend');

module.exports.blog_get = async (req, res) => {
  const userName = req.params.userName;
  const friendList = [];
  console.log(userName);
  const friends = await Friend.find(
    { recipient: userName, status: 3 }, 
  );
  if(friends) {
    for(var i = 0; i < friends.length; i++) {
      friendList.push(friends[i].requester);
    }
    const friendBlog = await Blog.find(
      { userName: { $in: friendList } }
    ).sort({'created_at': 'desc'})

    if(friendBlog) {
      res.status(200).json(friendBlog);
    } else {
      res.status(404).send('no blog');
    }    
  } else {
    console.log('no friends');
    res.status(404).send('no friends');
  }
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
    const blog = await Blog.find({ userName }).sort({'created_at': 'desc'});
    if(blog) {
      res.status(200).json(blog);
    }
  } catch(err) {
    console.log(err)
  }
};

module.exports.myblog_delete = async(req, res) => {
  const postID = req.params.postID;
  try {
    const blog = await Blog.deleteOne({ _id: postID });
    console.log(blog);
    res.status(201).send('success');
  } catch(err) {
    res.status(404).send('fail');
  }
}

module.exports.collect = async(req, res) => {
  const postID = req.params.postID;
  console.log(postID, req.body.collect)
  try {
    Blog.findOneAndUpdate(
      { _id: postID },
      {
        $set: {
          collect: req.body.collect,
        },
      },
      { new: true },
      (err, profile) => {
        if (err) {
          console.log(err);
          return res.status(500).send('fail');
        }          
        return res.status(200).send('success');
      }
    );
  } catch(err) {
    console.log(err);
  }
};

module.exports.favorite_blog_get = async (req, res) => {
  const userName = req.params.userName;
  const friendList = [];
  console.log(userName);
  const friends = await Friend.find(
    { recipient: userName, status: 3 }, 
  );
  if(friends) {
    for(var i = 0; i < friends.length; i++) {
      friendList.push(friends[i].requester);
    }
    const favoriteBlog = await Blog.find(
      { 
        userName: { $in: friendList },
        collect: 'true'
      }
    )
    if(favoriteBlog) {
      res.status(200).json(favoriteBlog);
    } else {
      res.status(404).send('no favorite blog');
    }    
  } else {
    console.log('no friends');
    res.status(404).send('no friends');
  }
};