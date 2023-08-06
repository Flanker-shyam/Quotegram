const express = require("express");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const router = express.Router();
const helmet = require("helmet");
const bodyParser = require("body-parser");
// let cors = require('cors');
require("dotenv").config();
const validator = require("../functions/validation");
const userModel = require("../models/userModel");

// router.use(cors());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(helmet());
router.use(express.json());

router.post("/checkUserName", (req,res)=>{
    let name = req.body.name;

    userModel.findOne({username:name}, (err, foundUser)=>{
        if(!err){
            if(foundUser)
            {
                res.send(true);
            }
            else{
                res.send(false);
            }
        }
        else{
            res.status(400).send(err.details[0].message);
        }
    })
});

router.post("/", (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            const { error } =  validator.ValidateData(req.body);
            if (error) {
                res.status(400).send(error.details[0].message);
                return;
            }
            const newUser = new userModel({
                username:req.body.name,
                email: req.body.email,
                password: hash,
            });

            newUser.save(err => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json({ code: "100" });
                }
            });
        }
    });
});

module.exports = router;
