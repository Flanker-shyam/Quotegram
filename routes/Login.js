const express = require("express");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const saltRounds = 10;
const router = express.Router();
const validator = require("../functions/validation");
const userModel = require("../models/userModel");
const helmet = require("helmet");
const bodyParser = require("body-parser");
// var cors = require('cors');

// router.use(cors());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(helmet());
router.use(express.json());

router.post("/", (req, res) => {
    const { error } = validator.ValidateLoginData(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    userModel.findOne({ email: req.body.email }, (err, foundUser) => {
        if (!err) {
            if (foundUser) {
                bcrypt.compare(req.body.password, foundUser.password, function (err, result) {
                    if (!err) {
                        if (result === true) {
                            const token = jsonwebtoken.sign(
                                {
                                  User:foundUser
                                },
                                process.env.JWT_SECRET,
                              );
                            res.setHeader("Authorization", `Bearer ${token}`);
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

//code for authenticating user using jwt?