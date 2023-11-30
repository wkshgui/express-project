const {Video} = require("../model/index");

exports.videolist = async(req, res) => {
    const {pageNum=1, pageSize=10} = req.body;

    const getvideo = await Video.find()
                        .skip((pageNum - 1) * pageSize)
                        .limit(pageSize)
                        .sort({createAt: -1})
                        populate("user", "_id username, cover");
    const getvideoCount = await Video.countDocuments();
    res.status(200).json({list: getvideo, getvideoCount});
}

exports.createvideo = async(req, res)=>{
    const body = req.body;
    body.user = req.user.userinfo._id;

    const videoModel = new Video(body);
    try {
        const dbBack = await videoModel.save();
        res.status(200).json({dbBack});
    } catch (error) {
        res.status(500).json({})
    }

    res.send(req.body);
}

exports.video = async(req, res)=>{
    const { videoId } = req.params;
    const videoInfo = await Video.findById(videoId)
                            .populate("user", "_id username cover");
    res.status(200).json(videoInfo)
}