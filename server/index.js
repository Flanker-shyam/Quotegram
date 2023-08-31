const helmet = require("helmet");
const express = require("express");
const connectDB = require("../DataBaseConnect/mongooseDB");
require("dotenv").config();

//routes
const registerRoute = require("../routes/Register");
const loginRoute = require("../routes/Login");
const quotesRoute = require("../routes/Quotes");
const userRoute = require("../routes/users");

const app = express();
app.use(helmet());

const db = process.env["MONGO_DB"];
const domain = process.env["MONGO_DOMAIN"];

app.use('/register', registerRoute);
app.use('/login', loginRoute);            
app.use('/quotes',quotesRoute);
app.use('/users',userRoute);

const port = process.env.PORT || 3001;

connectDB(`mongodb://${domain}/${db}`);

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(`connection established successfully at Port: ${port}`);
    }
});
