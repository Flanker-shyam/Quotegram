const express = require("express");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const router = express.Router();
const validator = require("../functions/validation");
const userModel = require("../models/userModel");
const helmet = require("helmet");
const bodyParser = require("body-parser");
var cors = require('cors');

router.use(cors());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(helmet());

router.post("/", (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        if (err) {
            console.log(err);
        } else {
            const { error } =  validator.ValidateData(req.body);
            if (error) {
                res.status(400).send(error.details[0].message);
                return;
            }
            const newUser = new userModel({
                username: req.body.username,
                password: hash
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


