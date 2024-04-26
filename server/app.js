const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();

app.use(cookieParser())
dotenv.config({ path : './config.env'});
require('./db/conn');
//const User = require('./model/userSchema')


app.use(express.json());
//we link the router files to make our route easy 
app.use(require('./router/auth'));
const PORT = process.env.PORT




//app.get('/signin',  (req, res) => {
  //  res.send(`Hello login page`);
//});
app.get('/signup', (req, res) => {
    res.send(`Hello registration`);
});


app.listen(PORT, () => {
    console.log(`server is running at port no ${PORT}`);
})