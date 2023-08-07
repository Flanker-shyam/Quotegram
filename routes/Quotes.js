const express = require("express");
const router = express.Router();
const imageModel = require('../models/imagesModel');
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
var cors = require('cors');
const helmet = require("helmet");
const { verify } = require("jsonwebtoken");

router.use(cors());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(helmet());

router.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

function verifyToken(token) {
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);

    if (decoded) {
        return true;
    } else {
        return false;
    }
}

router.post("/", function (req, res) {
    const uploadedFile = req.files.image;
    const description = req.body.description;

    const path = "/home/robot/Desktop/Desktop/webDevelopment/login-signup-react/login-frontend/public/files/" + uploadedFile.name;
    const pathToSave = "../files/" + uploadedFile.name;
    uploadedFile.mv(path, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("uploaded success");
        }
    });

    const newImage = new imageModel({
        imageUrl: pathToSave,
        description: description
    })
    newImage.save(err => {
        if (err) {
            return res.status(500).send(err);
        }
        else {
            return res.send({ status: "Success", path: path });
        }
    });
});

router.get("/", function (req, res) {
    const token = req.headers.authorization.split(" ")[1];

    if(!verifyToken(token))
    {
        res.send("Need to login to view the content");
        return;
        // res.redirect("/login")
    }
    else{
        imageModel.find({}, function (err, foundImages) {
            if (err) {
                console.log(err);
            }
            else {
                res.send(foundImages);
            }
        });
    }
});

module.exports = router;