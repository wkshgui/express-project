const mongoose = require('mongoose');
const { mongopath } = require("../config/config.default") 

async function main(){
    await mongoose.connect(mongopath);
}

main().then(res => {
    console.log('连接成功');
}).catch(err => {
    console.log("连接失败", err)
});

module.exports = {
    User: mongoose.model('User', require('./userModel'))
}