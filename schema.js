import mongoose from "mongoose";

const UserSche = new mongoose.Schema({
    mobile: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export const User = mongoose.model('User', UserSche)