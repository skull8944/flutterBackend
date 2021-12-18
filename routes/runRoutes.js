const { Router } = require('express');
const runController = require('../controllers/runController');

const router = Router();

router.get('/run/:userName', runController.run_get);
router.post('/run', runController.run_post);
router.delete('/run/:runRecordID', runController.run_delete);
router.get('/run/marks/:runRecordID', runController.marks_get);

module.exports = router;