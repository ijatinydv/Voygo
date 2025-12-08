require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');
const connectToDB = require('./db/db');
const app = express();

connectToDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/', userRoutes);


module.exports = app;