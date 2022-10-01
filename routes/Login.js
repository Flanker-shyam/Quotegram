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
    const { error } = validator.ValidateData(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    userModel.findOne({ username: req.body.username }, (err, foundUser) => {
        if (!err) {
            if (foundUser) {
                bcrypt.compare(req.body.password, foundUser.password, function (err, result) {
                    if (!err) {
                        if (result === true) {
                            res.json({ message: "success" });
                            return;
                        } else {
                            res.json({ message: "failure" });
                            return;
                        }
                    } else {
                        console.log(err);
                    }
                });
            }
            else {
                res.json({ message: "failure" });
                return;
            }
        }
        else {
            console.log(err);
        }
    });
});

module.exports = router;