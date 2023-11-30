var express = require('express');
var router = express.Router();
const videoController = require("../controller/videoController");
const userController = require("../controller/userController");
const { verifyToken } = require("../util/jwt");
const { verify } = require('jsonwebtoken');
const {videoValidator} = require("../middleware/validator/videoValidator");
// const vodController = require("../controller/vodController");

router.get('/videolist', videoController.videolist)
    .get('/video/:videoId', verifyToken(false), videoController.video)
    .post('/comment/:videoId', verifyToken(), userController.comment)
  // .get('/getvod', verifyToken(), vodController.getvod);
    // .get('/createvideo', verifyToken(), videoValidator, vodController.createvideo);

module.exports = router;
