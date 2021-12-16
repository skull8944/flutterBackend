const RunRecord = require("../models/RunRecord");

module.exports.run_get = async (req, res) =>  {
  const userName = req.params.userName;
  const runRecordList = [];
  const runRecords = await RunRecord.find(
    { userName }
  ).sort({'created_at': 'desc'});;
  if(runRecords) {
    for(var i = 0; i < runRecords.length; i++) {
      runRecordList.push(runRecords[i]);
    }
    res.status(200).json(runRecordList);
  } else{
    res.status(404).send('no records');
  }
};

module.exports.run_post = async (req, res) => {
  const { userName, distance, time, calories, marks } = req.body;
  try {
    const runRecord = await RunRecord.create({
      userName, distance, time, calories, marks
    });
    if(runRecord) {
      res.status(201).send('success');
    } else {
      res.status(404).send('fail');
    }
    
  } catch(error) {
    console.log(error);
    res.status(404).json('fail');
  }  
};

module.exports.run_delete = async(req, res) => {
  const recordID = req.params.recordID;
  try {
    const record = await RunRecord.deleteOne({ _id: postID });
    console.log(record);
    res.status(201).send('success');
  } catch(err) {
    res.status(404).send('fail');
  }
}