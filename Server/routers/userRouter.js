const userController = require('../controller/userController');
const requireUser = require("../middelware/requireUser")
const router = require('express').Router();

router.post("/follow", requireUser, userController.followOrUnfollowUserController)
router.get('/getPostsOfFollowing', requireUser, userController.getPostsOfFollowingController)
router.get('/getMyPosts', requireUser, userController.getMyPostsController);
router.get('/getUserPosts', requireUser, userController.getUserPostsController);
router.delete('/', requireUser, userController.deleteMyProfileController);
router.get('/getMyInfo', requireUser, userController.getMyInfoController);

router.put('/',requireUser,userController.updateUserProfileController)
router.get('/getUserProfile',requireUser,userController.getUserProfileController)
module.exports = router;