const { User } = require("../model/index");
const { createToken } = require("../util/jwt");

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
    console.log(req.user)
    res.send("/user-list");
}

// 删除
exports.delete = async (req, res) => {
    res.send("/user-delete")
}