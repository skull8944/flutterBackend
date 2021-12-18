const User = require("../models/User");
const Friend = require("../models/Friend");


module.exports.add_friend = async (req, res) => {
  const user1 = req.params.user1;
  const user2 = req.params.user2;
  console.log('add',user1, user2);
  try {
    const doc1 = await Friend.findOneAndUpdate(
      { requester: user1, recipient: user2 },
      { $set: { status: 1 }},
      { upsert: true, new: true },
    )
    const doc2 = await Friend.findOneAndUpdate(
      { recipient: user1, requester: user2 },
      { $set: { status: 2 }},
      { upsert: true, new: true },
    )
    const updateUser1 = await User.findOneAndUpdate(
      { name: user1 },
      { $push: { friends: user2 }},
    )
    const updateUser2 = await User.findOneAndUpdate(
      { name: user2 },
      { $push: { friends: user1 }},
    );
    res.status(200).send('success');
  } catch(err) {
    console.log(err);
    res.status(404).send('fail');
  }  
};

module.exports.accept_request = async (req, res) => {
  const user1 = req.params.user1;
  const user2 = req.params.user2;
  console.log('accept'+user1+user2);
  try{
    await Friend.findOneAndUpdate(
      { requester: user1, recipient: user2 },
      { $set: { status: 3 }}
    );
    await User.findOneAndUpdate(
      { name: user1 },
      { 
        $push: {
          friends: user2
        } 
      },
      { new: true },
    );
    await Friend.findOneAndUpdate(
      { recipient: user1, requester: user2 },
      { $set: { status: 3 }}
    );
    await User.findOneAndUpdate(
      { name: user2 },
      { 
        $push: {
          friends: user1
        } 
      },
      { new: true },
    );
    res.status(200).send('success');
  } catch(err) {
    console.log('accept error: '+err);
    res.status(404).send('fail')
  }
  
};

module.exports.reject_request = async (req, res) => {
  const user1 = req.params.user1;
  const user2 = req.params.user2;
  console.log('reject');
  try {
    const doc1 = await Friend.findOneAndRemove(
      { requester: user1, recipient: user2 },
    );
    const doc2 = await Friend.findOneAndRemove(
      { recipient: user1, requester: user2 },
    );
    const updateUser1 = await User.findOneAndUpdate(
      { name: user1 },
      { $pull: { friends: user2 }},
    );
    const updateUser2 = await User.findOneAndUpdate(
      { name: user2 },
      { $pull: { friends: user1 }},
    );
    console.log('success')
    res.status(200).send('success');
  } catch(err) {
    console.log('fail')
    res.status(404).send('fail')
  }
  
};

module.exports.friend_request_get = async (req, res) => {
  const name = req.params.name;
  console.log(name)
  const friendRequests = await Friend.find(
    { recipient: name, status: 1 },
  )
  if (friendRequests) {
    console.log(friendRequests)
    res.status(200).json(friendRequests);
  } else {
    res.status(404).send('no friend requests')
  }
};

module.exports.friends_get = async (req, res) => {
  const name = req.params.name;
  const friends = await Friend.find(
    { recipient: name, status: 3 }, 
  );
  if(friends) {
    console.log(friends);
    res.status(200).json(friends);
  } else {
    res.status(404).send('no friends');
  }
};

module.exports.friend_status_get = async(req, res) => {
  const user1 = req.params.user1;
  const user2 = req.params.user2;
  console.log(user1, user2)
  const friendStatus = await Friend.findOne(
    { requester: user1, recipient: user2 }
  );
  if (friendStatus) {
    console.log('status： ' + friendStatus);
    res.status(200).send((friendStatus.status).toString());
  } else {
    res.status(404).send('0');
  }  
};