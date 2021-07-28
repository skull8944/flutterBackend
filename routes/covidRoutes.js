const { Router } = require('express');
const covidController = require('../controllers/covidController');

const router = Router();

router.get('/covid', covidController.covid_get);

module.exports = router;