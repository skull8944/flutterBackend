const { Router } = require('express');
const runController = require('../controllers/runController');

const router = Router();

router.get('/run/:userName', runController.run_get);
router.post('/run', runController.run_post);
router.delete('run', runController.run_delete);

module.exports = router;