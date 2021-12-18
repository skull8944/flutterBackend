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
  console.log('post');
  const { userName, distance, time, calories, marks } = req.body;
  console.log(userName, distance, time, calories, marks)
  try {
    const runRecord = await RunRecord.create({
      userName, distance, time, calories, marks
    });
    console.log(runRecord)
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
  const runRecordID = req.params.runRecordID;
  try {
    const runRecord = await RunRecord.deleteOne({ _id: runRecordID });
    if(runRecord) {
      console.log('deleted record')
      res.status(201).send('success');
    } else {
      res.status(404).send('fail');
    }
  } catch(err) {
    res.status(404).send('fail');
  }
}

module.exports.marks_get = async(req, res) => {
  const runRecordID = req.params.runRecordID;
  console.log(runRecordID)
  try {
    const runRecord = await RunRecord.findOne({ _id: runRecordID });
    if(runRecord) {
      res.status(200).json(runRecord.marks);
    } else {
      res.status(404).send('fail');
    }
  } catch(err) {
    console.log(err);
    res.status(404).send('fail');
  }
}