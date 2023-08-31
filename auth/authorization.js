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


const verifyUserToken = (req, res, next)=>
{
    let token = req?.headers?.authorization?.split(" ")[1];
    token = token === undefined?"thisisdefault":token;
    
    if(!verifyToken(token))
    {
        res.send("Need to login to view the content");
        return;
    }
    else{
        next();
    }
}
module.exports = verifyUserToken;