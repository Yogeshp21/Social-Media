const router = require('express').Router();
const postController = require("../controller/postsController")
const requireUser = require('../middelware/requireUser')

router.get('/all', requireUser, postController.getAllPostsController);
router.post('/', requireUser, postController.createPostController);
router.post('/like', requireUser, postController.likeAndUnlikePostController)
router.put('/', requireUser, postController.updatePostController);
router.delete('/', requireUser, postController.deletePost)
module.exports = router;