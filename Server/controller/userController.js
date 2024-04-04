const User = require("../models/User");
const Post = require("../models/Post")
const { error, success } = require("../utills/responseWrapper");


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
        

        const postsIds = curUser.posts;
        const posts = await Post.find({
            '_id':{
                '$in' : curUser.posts
            }
        })

        if (!posts) {
            return res.send(error(404, "Post not found"));
        }

        return res.send(success(200, { posts }))
    }
    catch (e) {
        return res.send(error(500, e.message))
    }
}

module.exports = {
    followOrUnfollowUserController,
    getPostsOfFollowingController,
    getMyPostsController,
    //getuserposts
    //deletemyprofile
}