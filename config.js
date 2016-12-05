'use strict'

const os = require("os");

let config = {};

config.db = {};

//config.webhost ='http://'+ os.hostname() +':5000/' ;
config.webhost ='http://54.90.189.143:5000/';

config.db.host = 'raj:raj123@ds111748.mlab.com:11748';
config.db.name = 'urlshort';

module.exports = config;
 