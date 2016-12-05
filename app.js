'use strict'

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config');


const shortRouter = require('./Routes/urlShortRouter');


app.set('port', (process.env.PORT || 5000));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', shortRouter);


let server = app.listen(app.get('port'), function(){
	  console.log('Node app is running on port', app.get('port'));
});
