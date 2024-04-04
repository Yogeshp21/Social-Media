const userController= require('../controller/userController');
const requireUser = require("../middelware/requireUser")
const router = require('express').Router();

router.post("/follow",requireUser,userController.followOrUnfollowUserController)
router.get('/getPostsOfFollowing',requireUser,userController.getPostsOfFollowingController)
router.get('/myPosts', requireUser, userController.getMyPostsController);

module.exports = router; 