'use strict'

const express = require('express');
const cors = require('cors');

const studentsRoutes = require('./routes/students.route.js');
const careersRoutes = require('./routes/careers.route.js');
const usersRoutes = require('./routes/users.route.js');
const studentsCareer = require('./routes/studentsCareers.route.js');

//initialitions
const app = express();

//settings
app.set('port', (process.env.PORT || 9005));

//middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

//routes
app.use(studentsRoutes);
app.use(careersRoutes);
app.use(usersRoutes);
app.use(studentsCareer);


module.exports = app;