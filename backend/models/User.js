const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePhoto: { 
        type: Buffer, 
        required: false 
    },
    resumes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Resume',
            required: true,
        }
    ],
}, { timestamps: true });

// UserSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next();
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

module.exports = mongoose.model('User', UserSchema);