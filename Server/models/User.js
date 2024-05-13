const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true,
        select: false
    },
    name: {
        type: String,
        require: true
    },
    bio: {
        type: String,
    },
    avatar: {
        publicId: String,
        url: String,
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        }
    ],
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        }
    ]
}, {
    timestamps: true
})

module.exports = mongoose.model('user', userSchema)