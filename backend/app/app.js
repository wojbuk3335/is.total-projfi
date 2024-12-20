require('dotenv').config();
const express = require('express');
const {port}=require('./config');
const path = require('path');
const app = express();
const ejsLayouts = require('express-ejs-layouts');
const { model } = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const crypto = require('crypto');
const cors = require('cors');

app.use(cors({
  origin: 'https://localhost:3001', // Adjust this to match the origin of your React app
  credentials: true, // If your frontend needs to send cookies or use credentials
}));

// init database
require('./db/mongoose');


const sessionKeySecret = crypto.randomBytes(64).toString('hex');

app.use(session({
  secret: sessionKeySecret,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge:1000*60*60*24*2}
}));


// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/../views'));
// set layout
app.use(ejsLayouts);
app.set('layout', 'layouts/main');
// public folder
app.use(express.static(path.join(__dirname, '../public')));
//bublic folder
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// // middleware
app.use('/', require('../middleware/view-variables-middleware'));
app.use('/', require('../middleware/user-middleware'));
app.use('/admin', require('../middleware/is-auth-middleware'));

app.use('/app', express.static(path.join(__dirname, '../public')));

//routes
app.use('/api', require('../routes/api'));
app.use('/', require('../routes/web'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}/admin/login`);
});
