const User = require("../models/User");
const Post = require("../models/Post")
const { error, success } = require("../utills/responseWrapper");
const { populate } = require("dotenv");
const { mapPostOutput } = require("../utills/utills");
const cloudinary = require('cloudinary').v2;

const followOrUnfollowUserController = async (req, res) => {
    try {
        const { userIdToFollow } = req.body;
        const curUserId = req._id;

        const userToFollow = await User.findById(userIdToFollow);
        const curUser = await User.findById(curUserId);

        if (curUserId === userIdToFollow) {
            return res.send(error(409, "Users cannot follow themseves"))
        }

        if (!userToFollow) {
            return res.send(error(404, "User to follow not found"))
        }

        // already followed 
        if (curUser.following.includes(userIdToFollow)) {
            const followingIndex = curUser.following.indexOf(userIdToFollow);
            curUser.following.splice(followingIndex, 1);

            const followerIndex = userToFollow.followers.indexOf(curUser);
            userToFollow.followers.splice(followerIndex, 1);

            await userToFollow.save()
            await curUser.save()

            return res.send(success(200, "User unfollowed"))
        }
        else {
            userToFollow.followers.push(curUserId);
            curUser.following.push(userIdToFollow);

            await userToFollow.save();
            await curUser.save();

            return res.send(success(200, "User Followed"))
        }
    }
    catch (e) {
        return res.send(error(500, e.message))
    }
}

const getPostsOfFollowingController = async (req, res) => {
    try {
        const curUserId = req._id;

        const curUser = await User.findById(curUserId);

        const posts = await Post.find({
            'owner': {
                '$in': curUser.following
            }
        })
        return res.send(success(200, posts))
    }
    catch (e) {
        return res.send(error(500, e.message))
    }
}

const getMyPostsController = async (req, res) => {
    try {
        const curUserId = req._id;
        const curUser = await User.findById(curUserId);

        const posts = await Post.find({
            '_id': {
                '$in': curUser.posts
            }
        }).populate('likes')

        if (!posts) {
            return res.send(error(404, "Post not found"));
        }

        return res.send(success(200, { posts }))
    }
    catch (e) {
        return res.send(error(500, e.message))
    }
}

const getUserPostsController = async (req, res) => {
    try {
        const userId = req.body.userId;

        if (!userId) {
            return res.send(error(400, 'userId is required'))
        }

        const allUserPosts = await Post.find({
            owner: {
                '$in': userId,
            }
        }).populate('likes')

        return res.send(success(200, { allUserPosts }));

    }
    catch (e) {
        return res.send(error(500, e.message))
    }
}

const deleteMyProfileController = async (req, res) => {
    try {
        const curUserId = req._id;
        const curUser = await User.findById(curUserId);

        await Post.deleteMany({
            owner: curUserId
        })

        // remove myself from followers followings
        curUser.followers.forEach(async (followerId) => {
            const follower = await User.findById(followerId);
            const index = follower.following.indexOf(curUserId);
            follower.following.splice(index, 1);

            await follower.save();
        })

        // remove myself from my followings followers
        curUser.following.forEach(async (followingId) => {
            const following = await User.findById(followingId);
            const index = following.followers.indexOf(curUserId);
            following.follower.splice(index, 1);

            await following.save();
        })

        //remove myself from all likes
        const allPosts = await Post.find();
        allPosts.forEach(async (post) => {
            const index = post.likes.indexOf(curUserId);
            post.likes.splice(index, 1);
            await post.save();
        })

        await curUser.deleteOne();

        res.clearCookie('jwt', {
            httpOnly: true,
            secure: true,
        })

        return res.send(success(200, 'User account removed successfully'))

    }
    catch (e) {
        console.log(e)
        return res.send(error(500, e.message))
    }
}

const getMyInfoController = async (req, res) => {
    try {
        const user = await User.findById(req._id)
        return res.send(success(200, { user }))

    } catch (e) {
        return res.send(error(500, e.message))
    }
}

const updateUserProfileController = async (req, res) => {
    try {
        const { name, bio, userImg } = req.body;
        const user = await User.findById(req._id);

        if(name){
            user.name = name;
        }
        if(bio){
            user.bio = bio;
        }
        if(userImg){
            const cloudImg = await cloudinary.uploader.upload(userImg,{
                folder: 'profileImg'
            })
            user.avatar = {
                url : cloudImg.secure_url,
                publicId : cloudImg.public_id
            }
        }
        await user.save();
        return res.send(success(200,{user}));
    }
    catch (e) {
        return res.send(error(500,e.message));
    }
}
const getUserProfileController = async (req, res) => {
    try {
        const userId = req.body.userId;
        console.log("user Id ",userId)
        const user = await User.findById(userId).populate({
            path: "posts",
            populate: {
                path: "owner",
            },
        });
        const fullPosts = user.posts; 
        const posts = fullPosts
            .map((item) => mapPostOutput(item, req._id))
            .reverse();

        return res.send(success(200, { ...user._doc, posts }));
    } catch (e) {
        console.log('error put', e);
        return res.send(error(500, e.message));
    }
}; 

module.exports = {
    followOrUnfollowUserController,
    getPostsOfFollowingController,
    getMyPostsController,
    getUserPostsController,
    deleteMyProfileController,
    getMyInfoController,
    updateUserProfileController,
    getUserProfileController,
}