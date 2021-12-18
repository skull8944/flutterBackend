const { Router } = require('express');
const friendController = require('../controllers/friendController');

const router = Router();

router.get('/friend/friends/:name', friendController.friends_get);
router.get('/friend/friend_requests/:name', friendController.friend_request_get);
router.get('/friend/friend_status/:user1/:user2', friendController.friend_status_get);
router.post('/friend/accept/:user1/:user2', friendController.accept_request);
router.post('/friend/add/:user1/:user2', friendController.add_friend);
router.post('/friend/reject/:user1/:user2', friendController.reject_request);

module.exports = router;