const { success, error } = require("../utills/responseWrapper");
const User = require('../models/User')
const Post = require('../models/Post')
const cloudinary =require('cloudinary').v2;

const getAllPostsController = async (req, res) => {
    const posts = await Post.find()

    // return res.send("These are all the posts");
    return res.send(success(200, {
        posts
    }))
};

const createPostController = async (req, res) => {
    try {
        const { caption,postImg } = req.body;
        if(!caption  || !postImg){
            return res.send(error(400,"Caption is required"))
        }
        const cloudImg = await cloudinary.uploader.upload(postImg,{
            folder : 'postImg'
        })
        const owner = req._id;

        const user = await User.findById(req._id);

        const post = await Post.create({
            owner,
            caption,
            image: {
                publicId : cloudImg.publicId,
                url : cloudImg.url 
            }
        })

        user.posts.push(post._id);
        await user.save();


        return res.json(success(200, { post }));
    }
    catch (e) {
        console.log(e);
        return res.send(error(500, e.message))
    }
}

const likeAndUnlikePostController = async (req, res) => {
    try {
        const { postId } = req.body;
        const curUserId = req._id;

        const post = await Post.findById(postId);

        if (!post) {
            res.send(error(404, 'Post not found'));
        }

        if (post.likes.includes(curUserId)) {
            const index = post.likes.indexOf(curUserId);
            post.likes.splice(index, 1)

            await post.save();

            return res.send(success(200, "Post Unliked"));
        }
        else {
            post.likes.push(curUserId);
            await post.save();

            return res.send(success(200, "Post liked"))
        }
    }
    catch (e) {
        return res.send(error(500, e.message));
    }
}

const updatePostController = async (req, res) => {
    try {

        const { postId, caption } = req.body;
        const curUserId = req._id;

        const post = await Post.findById(postId);

        if (!post) {
            return res.send(error(404, "Post not found"));
        }

        if (post.owner.toString() !== curUserId) {
            return res.send(error(403, "Only owner can update their posts"));
        }

        if (caption) {
            post.caption = caption;
        }

        await post.save();

        return res.send(success(200, { post }))

    }
    catch (e) {
        return res.send(error(500, e.message))
    }
}

const deletePost = async (req, res) => {
    try {
        const { postId } = req.body;
        const curUserId = req._id;

        const post = await Post.findById(postId);
        const curUser = await User.findById(curUserId);
        if (!post) {
            return res.send(error(404, "Post not found"));
        }

        if (post.owner.toString() !== curUserId) {
            return res.send(error(403, 'Only owner can delete their posts'))
        }

        const index = curUser.posts.indexOf(postId);
        curUserId.posts.splice(index, 1);
        await curUser.save();
        await post.remove();

        return res.send(success(200, "Post deleted successfully"));
    }
    catch (e) {
        return res.send(error(500, e.message))
    }
}

module.exports = {
    getAllPostsController,
    createPostController,
    likeAndUnlikePostController,
    updatePostController,
    deletePost
}