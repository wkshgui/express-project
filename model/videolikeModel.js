const mongoose = require("mongoose");
const baseModel = require("./baseModel");

const videocommentSchema = new mongoose.Schema({
    user: {
        type: mongoose.ObjectId,
        required: true,
        ref: "User"
    },
    video: {
        type: mongoose.ObjectId,
        required: true,
        ref: "Video"
    },
    like: {
        type: Number,
        enum: [1, -1],
        require: true
    },
    ...baseModel
});

module.exports = videocommentSchema;