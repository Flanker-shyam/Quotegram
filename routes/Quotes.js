const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
var cors = require('cors');
const helmet = require("helmet");
const verifyUserToken = require("../auth/authorization");
const validator = require("../functions/validation");
require("dotenv").config();

//models
const quoteModel = require('../models/QuoteModel');
const likeModel = require("../models/likesModel");
const commentModel = require("../models/commentModel");
const userModel = require("../models/userModel");

router.use(cors());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(helmet());
router.use(express.json());
router.use(verifyUserToken);

router.post("/", verifyUserToken, async(req, res) => {
    const {error} = validator.ValidateQuoteData(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    else{
        try {
            const quote = new quoteModel({
                userID: req.body.userID,
                content: req.body.content,
                tags: req.body.tags,
            });
    
            const savedQuote = await quote.save();
            res.status(200).send(savedQuote);
        } catch (err) {
            res.status(500).send(err);
        }
    }
});

router.get("/", verifyUserToken, function (req, res) {
    quoteModel.find({}, function (err, foundImages) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(foundImages);
        }
    });
});

// Like Routes
router.post('/:quotationId/like', verifyUserToken, async (req, res) => {
    try{
        const {userID, quoteID} = req.body;
        const user = await userModel.find({_id:userID});
        const quote = await quoteModel.find({_id:quoteID});

        if(!user || !quote)
        {
            res.status(404).json("Either userID or quoteID is invalid");
            return;
        }

        const likes = new likeModel({
            userID,
            quoteID,
        });

        await likes.save();
        res.status(200).json({message:"You Liked this post"});
    }
    catch(exp)
    {
        res.status(500).json({message:"An error accured"});
    }
});
  
  // Comment Routes
router.post('/:quotationId/comment', verifyUserToken, async (req, res) => {
try{
    const {userID, quoteID, content} = req.body;
    const user = await userModel.find({_id:userID});
    const quote = await quoteModel.find({_id:quoteID});

    if(!user || !quote)
    {
        res.status(404).json("Either userID or quoteID is invalid");
        return;
    }

    const comment = new commentModel({
        userID,
        quoteID,
        content
    });

    await comment.save();
    res.status(200).json({message:"You posted a comment to this post"});
}
catch(exp)
{
    res.status(500).json({message:`An error accured ${exp}`});
}
});

module.exports = router;