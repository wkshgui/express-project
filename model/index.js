const mongoose = require('mongoose');
const { mongopath } = require("../config/config.default") 

async function main(){
    await mongoose.connect(mongopath);
}

main().then(res => {
    console.log('连接成功');
}).catch(err => {
    console.log("连接失败", err)
})

// const user = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true,
//     },
//     age: {
//         type: Number,
//         required: true,
//     }
// });

// const userModel = mongoose.model('User', user);
// const u = new userModel({username: 'lisi', age: 18});
// u.save();

module.exports = {
    User: mongoose.model('User', require('./userModel'))
}