const mongoose = require('mongoose')

const userScheme = mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    password: String,
    role: {
        type: String,
        enum: ['member', 'admin'],
        default: 'member',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
})

module.exports = mongoose.model('user', userScheme)