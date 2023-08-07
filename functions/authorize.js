const jsonwebtoken = require("jsonwebtoken");
require('dotenv').config();

function verifyToken(token) {
    try{
        let decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        if (decoded) {
            return true;
        } else {
            return false;
        }
    }
    catch(err)
    {
        console.log(err);
        console.log("bad token");
        return false;
    }
}

exports.verifyToken = verifyToken;