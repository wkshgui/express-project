const { redis } = require("./index");

exports.hotInc = async(videoId, incNum)=>{
    const data = await redis.zscore("videohots", videoId);
    let inc = null
    if(data) {
        inc = await redis.zincrby("videohots", incNum, videoId);
    }else{
        inc =await redis.zadd("videohots", incNum, videoId);
    }

    return inc;
}

exports.topHots = async(num)=>{
    const sort = await redis.zrevrange("videohots", 0, -1, "withscores");
    const newarr = sort.slice(0, num*2);
    const obj = {}
    for(let i=0; i<newarr.length; i++) {
        if(i%2 === 0){
            obj[newarr[i]] = newarr[i+1];
        }
    }
    
    return obj;
}