// var RPCClient = require("@alicloud/pop-core").RPCClient;
var RPCClient = function() {};

function initVodClient(accessKeyId, accessKeySecret,) {
    const regionId = 'cn-shanghai';
    const client = new RPCClient({
        accessKeyId,
        accessKeySecret,
        endpoint: 'http://vod.'+regionId+'.aliyuncs.com',
        apiVersion: '2017-03-21'
    });

    return client;
};

exports.getvod = async (req, res) => {
    const client = initVodClient('', '');
    const vodback = await client.request("CreateUploadVideo", {
        Title: 'this is a sample',
        FileName: 'filename.mp4'
    }, {});
    res.status(200).json({vod: vodback});
};
