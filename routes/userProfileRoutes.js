const { Router } = require('express');
const userProfileController = require('../controllers/userProfileController');
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./headshots");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname + ".jpg");
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 6,
  },
});

const router = Router();

router.get('/user_profile/:userName', userProfileController.userProfile_get);
router.post('/user_profile/:userName', userProfileController.userProfile_post);
router.patch('/user_profile/addimg/:userName', upload.single('img'), userProfileController.userProile_addimg);
router.post('/user_profile/height_edit/:userName', userProfileController.height_edit);
router.post('/user_profile/weight_edit/:userName', userProfileController.weight_edit);
router.post('/user_profile/sex_edit/:userName', userProfileController.sex_edit);
router.post('/user_profile/birthdate_edit/:userName', userProfileController.birthdate_edit);

module.exports = router;