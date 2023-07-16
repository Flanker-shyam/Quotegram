const startDebugger = require("debug")("app: startup");
const helmet = require("helmet");
const registerRoute = require("../routes/Register");
const loginRoute = require("../routes/Login");
const quotesRoute = require("../routes/Quotes");
const express = require("express");
const connectDB = require("../DataBaseConnect/mongooseDB");
const db = process.env["MONGO_DB"];
const domain = process.env["MONGO_DOMAIN"];
const dotenv = require("dotenv")
dotenv.config();

const app = express();
app.use(helmet());
app.use('/register', registerRoute);
app.use('/login', loginRoute);            
app.use('/quotes',quotesRoute);

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.set('views', './views');

// app.get('env'); //to get the current working enviornment of the app, by default it is development.
// to set this from terminal , use -- export NODE_ENV=production   or any other you want

const port = process.env.PORT || 3001;

connectDB(`mongodb://${domain}/${db}`);
// connectDB("mongodb://localhost:27017/usersDB");
app.listen(port, (err) => {
    if (err) {
        startDebugger(err);
    }
    else {
        console.log(`connection established successfully at Port: ${port}`);
        // startDebugger("connection established successfully");
    }
});
