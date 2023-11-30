const fs = require("fs");
const {promisify} = require('util');
const lodash = require("lodash");
const { User, Subscribe, Videocomment, Video } = require("../model/index");
const { createToken } = require("../util/jwt");

const rename = promisify(fs.rename);

// 注册
exports.register = async (req, res) => {
    const userModel = new User(req.body);
    const dbBack = await userModel.save();
    const user = dbBack.toJSON();
    delete user.password;
    res.status(201).json({
        user
    });
}

// 登录
exports.login = async(req, res) => {
    // 客户端数据验证
    // 链接数据库查询
    let dbBack = await User.findOne(req.body);
    if(!dbBack) {
        res.status(402).json({error: "邮箱或者密码不正确"});
        return;
    }

    dbBack = dbBack.toJSON();
    dbBack.token = await createToken(dbBack);
    res.status(200).json(dbBack);
}

// 列表
exports.list = async (req, res) => {
    res.send("/user-list");
}

// 删除
exports.delete = async (req, res) => {
    res.send("/user-delete")
}

// 更新用户信息
exports.update = async (req, res) => {
    const id = req.user.userInfo._id;
    const dbBack = await User.findByIdAndUpdate(id, req.body, {new: true});
    res.status(200).json({user: dbBack});
}

// 用户头像上传
exports.headimg = async(req, res) => {
    const fileArr = req.file.originalname.split(".");
    const filetype = fileArr[fileArr.length - 1];
    
    try {
        rename(
            "./public/"+req.file.filename,
            "./public/"+req.file.filename+"."+filetype
        )
        res.status(200).json({filepath: req.file.filename+"."+filetype});
    } catch (error) {
        res.status(500).json({err: error});
    }
}

// 关注频道
exports.subscribe = async(req,res)=>{
    const userId = req.user.userInfo._id;
    const channelId = req.params.userId;
    if(userId === channelId) {
        return res.status(401).json({err: "不能关注自己"});
    }

    const record = await Subscribe.findOne({
        user: userId,
        channel: channelId
    });
    if(!record) {
        await new Subscribe({
            user: userId,
            channel: channelId
        }).save();

        const user = await User.findById(channelId);
        user.subscribeCount++;
        await user.save();
        res.status(200).json({msg: "关注成功"});
    }else {
        res.status(401).json({err: "已经订阅了该频道"});
    }
}

// 取消关注
exports.unsubscribe = async(req, res)=>{
    const userId = req.user.userInfo._id;
    const channelId = req.params.userId;
    if(userId === channelId) {
        return res.status(401).json({err: "不能取消关注自己"});
    }

    const record = await Subscribe.findOne({
        user: userId,
        channel: channelId
    });
    if(record) {
        await record.remove();

        const user = await User.findById(channelId);
        user.subscribeCount--;
        await user.save();
        res.status(200).json(user);
    }else {
        res.status(401).json({err: "未订阅该频道"});
    }
}

// 获取频道信息
exports.getuser = async(req, res)=>{
    let isSubscribe = false;
    if(req.user){
        const record = await Subscribe.findOne({
            channel: req.params.userId,
            user: req.user.userInfo._id
        });
        if(record) {
            isSubscribe = true;
        }
    }

    const user = await User.findById(req.params.userId);
    user.isSubscribe = isSubscribe;
    res.status(200).json({
        ...lodash.pick(user, [
            '_id',
            "username",
            "image",
            "subscribeCount",
            "cover",
            "channeldes"
        ]),
        isSubscribe
    });
}

// 获取关注
exports.getsubscribe = async(req, res)=>{
    let subscribeList = await Subscribe.find({
        user: req.params.userId
    }).populate('channel');
    subscribeList = subscribeList.map(item=>{
        return lodash.pick(item.channel, [
            '_id',
            "username",
            "image",
            "subscribeCount",
            "cover",
            "channeldes"
        ]);
    })
    res.status(200).json(subscribeList);
}

// 获取频道
exports.getchannel = async(req, res)=>{
    let channelList = await Subscribe.find({
        channel: req.user.userInfo._id
    }).populate('user');
    channelList = channelList.map(item=>{
        return lodash.pick(item.user, [
            '_id',
            "username",
            "image",
            "subscribeCount",
            "cover",
            "channeldes"
        ]);
    });
    res.status(200).json(channelList);
}

// 评论
exports.comment = async(req, res)=>{
    const {videoId} = req.params;
    const videoInfo = await Video.findById(videoId);
    if(!videoInfo) {
        return res.status(404).json({err:"视频不存在"});
    }
    const comment = await new Videocomment({
        content: req.body.content,
        video: videoId,
        user: req.user.userInfo._id
    }).save();
    videoInfo.commentCount++;
    await videoInfo.save();
    res.status(201).json(comment);
}