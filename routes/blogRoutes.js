const { Router } = require('express');
const blogController = require('../controllers/blogController');

const router = Router();

router.get('/blog', blogController.blog_get);

module.exports = router;