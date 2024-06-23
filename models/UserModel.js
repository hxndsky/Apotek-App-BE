// src/models/UserModel.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "User"
    },
    img_url: {
        type: String,
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpire: {
        type: Date
    }
},
{
    timestamps: true
});

const User = mongoose.model('User', UserSchema);
export default User;
