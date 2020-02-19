const express = require('express');
const router = express.Router();
const passport = require('passport');

const path = require('path');
var multer = require('multer')

const Image = require('../../models/Image');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) //name
    }
})
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 300 * 1024 // 1024 in a kilo => 300kb
    }
})

router.post('/upload/:userId', upload.single('image'), (req, res)=> {
    const newImage = new Image({
        user: req.params.userId,
        imageData: req.file.path
    })
    newImage.save()
        .then(res=>res.status(200).json({document: res}))

})

router.get('/:userId', (req, res) => {
    res.sendFile(path.join(__dirname, '../../uploads', `${req.params.userId}.png`));
})


module.exports = router;