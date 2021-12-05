const { Router } = require('express');
const runController = require('../controllers/runController');

const router = Router();

router.get('/run/:userName', runController.run_get);
router.post('/run/:userName', runController.run_post);

module.exports = router;