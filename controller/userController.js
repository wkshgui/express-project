const { User } = require("../model/index");

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
    
}

// 列表
exports.list = async (req, res) => {
    res.send("/user-list");
}

// 删除
exports.delete = async (req, res) => {
    res.send("/user-delete")
}