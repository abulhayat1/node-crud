require('dotenv').config();


const express = require("express"),
    app = express(),
    port = process.env.PORT || 80,
    expressLayout = require('express-ejs-layouts'),
    mongoose = require('mongoose'),
    bodyParser =  require('body-parser'),
    session = require('express-session') ,
    cookieParser = require('cookie-parser'),
    flash = require('connect-flash');



/* ============config section================== */
//set session and cookie parser
app.use(cookieParser());
app.use(session({
    secret: process.env.SECRET,
    cookie: { maxAge: 60000},
    resave: false, //forces session to be forced back to the store
    saveUninitialized: flash //don't save unmodified session
}));
app.use(flash());
//static assets
app.use(express.static(__dirname + '/public'));


//set ejs as template engine
app.set('view engine', 'ejs');
app.use(expressLayout);

//mongoose connect (database)
mongoose.connect(process.env.MONGO_URI, 
    {   useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
);

//body parser to grab data from from
app.use(bodyParser.urlencoded({extended: true}));


/* ============route section================== */
app.use(require('./app/routes'));



/* ============start server section================== */
app.listen(port, () => {
    console.log(`Im Online on the PORT:${port} - http://localhost:${port}`);
});