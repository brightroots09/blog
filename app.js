//server
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

//middlewares
const path = require("path")
const morgan = require("morgan");
const bodyParser = require("body-parser");

//db
const mongoose = require("mongoose");

//session and cookie
const session = require('express-session');
const cookieParser = require("cookie-parser")
const mongoStore = require("connect-mongo")(session)
const passport = require("passport");
var cors = require('cors')

//db connection
const url = "mongodb://root:qwertyuiop09@ds161026.mlab.com:61026/blog";

mongoose.connect(url, { useNewUrlParser: true }, function(error){
    if(error) console.error("DB Error====>",error);
    else console.log(`MongoDB connected to url: ${url}`);
})

//morgan middleware
app.use(morgan("dev"));
app.use(cors())

//body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist/blog')));
app.use(express.static(path.join(__dirname, '/public')));

const api = require("./routes/api");

app.use(api);

app.get("*", (req, res, callback) => {
    res.sendFile(path.join(__dirname, "dist/blog/index.html"));
})


//server connection
app.listen(PORT, function(){
    console.log(`Server started at PORT: ${PORT}`);
});
