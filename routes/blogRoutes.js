const { Router } = require('express');
const blogController = require('../controllers/blogController');
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./blogPhotos");
  },
  filename: (req, file, cb) => {
    var now = new Date;
    var today = now.getFullYear().toString() + (now.getMonth() + 1).toString() + now.getDate().toString() + now.getHours().toString() + now.getMinutes().toString();
    cb(null, req.params.postID + today  + file.originalname + ".jpg");
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 6,
  },
});

const router = Router();

router.get('/myblog/:userName', blogController.myblog_get)
router.get('/blog/:userName', blogController.blog_get);
router.post('/blog/:userName', blogController.blog_post);
router.patch('/blog/:postID', upload.array('imgs', 6), blogController.blog_patch);

module.exports = router;