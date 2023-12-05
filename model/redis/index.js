const Redis = require("ioredis");
const { redisClient } =require("../../config/config.default");

const redis = new Redis(redisClient.port, redisClient.path, redisClient.option);

redis.on("error", err => {
    if(err){
        console.log("redis连接错误：", err);
        redis.quit();
    }
});

redis.on("ready", ()=>{
    console.log("Redis连接成功");
});

exports.redis = redis;