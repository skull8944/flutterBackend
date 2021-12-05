const RunRecord = require("../models/RunRecord");

module.exports.run_get = async (req, res) =>  {
  const userName = req.params.userName;
  const runRecordList = [];
  const runRecords = await RunRecord.find(
    { userName }
  );
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
  var userName = req.params.userName;
  const { distance, time, calories } = req.body;
  try {
    const runRecord = await RunRecord.create({
      userName, distance, time, calories
    })
    res.status(201).send('success');
  } catch(error) {
    res.status(404).json('fail');
  }  
};