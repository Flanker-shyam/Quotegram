const express = require("express");
const router = express.Router();
const imageModel = require('../models/imagesModel');
const bodyParser = require("body-parser");
var cors = require('cors');
const helmet = require("helmet");
const multer = require('multer'); 
require("dotenv").config();

const quoteModel = require("../models/imagesModel");
const auth = require("../functions/authorize");
const validator = require("../functions/validation");

router.use(cors());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(helmet());


const storage = multer.memoryStorage(); // Use memory storage for storing file buffers
const upload = multer({ storage: storage });

router.post("/", upload.single('image'), async (req, res) => {

    let token = req?.headers?.authorization?.split(" ")[1];
    token =  token === undefined?"thisisdefault":token;

    if(!auth.verifyToken(token))
    {
        res.send("Need to login to view the content");
        return;
        // res.redirect("/login")
    }
    else{
        req.body.tags = JSON.parse(req.body.tags);
        if (!req.file) {
            res.status(400).send("Image file is required");
            return;
        }
        const {error} = validator.ValidateImageData(req.body);
        if(error){
            res.status(400).send(error.details[0].message);
            return;
        }
        else{
            try {
                const image = new quoteModel({
                    title: req.body.title,
                    description: req.body.description,
                    image: req.file.buffer, // Use req.file.buffer to access the uploaded image buffer
                    tags: req.body.tags,
                });
        
                const savedImage = await image.save();
                res.status(200).send(savedImage);
            } catch (err) {
                res.status(500).send(err);
            }
        }
    }
});

router.get("/", function (req, res) {

    let token = req?.headers?.authorization?.split(" ")[1];
    token =  token === undefined?"thisisdefault":token;

    if(!auth.verifyToken(token))
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