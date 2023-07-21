const express = require('express');
const passport = require('passport');
const session = require('express-session');
const passport_local = require('./config/passport-strategy')
const port = 8080;
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());

app.use(session({
    name: 'smit',
    secret: 'codeadmin',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 10000 * 60 * 60
    }
}));
app.use(passport.initialize());
app.use(passport.session())
app.use(passport.datashow)


const db = require('./config/mongoose');

 

const admin = require('./models/adminmodel');
app.use(cookieParser());
app.use(express.static('asset'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/', require('./routes/admintable/route'));
app.use('/User', require('./routes/User-route/user_route'));

app.listen(port, (err) => {
    if (err) {
        console.log('port is not working');
    }
    return console.log("port is working", port);
});