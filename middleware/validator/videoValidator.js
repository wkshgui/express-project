const { body } = require('express-validator');
const validate = require("./errorBack");
const { User } = require("../../model/index");

module.exports.videoValidator = validate([
    body("title")
        .notEmpty().withMessage("视频名不能为空").bail()
        .isLength({max: 20}).withMessage("视频名长度不能大于20").bail(),
        // .custom(async val => {}),
    body("vodvideoId")
        .notEmpty().withMessage("vod不能为空").bail(),
]);