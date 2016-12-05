'use strict'

const express = require('express');
const router = express.Router();
const path = require('path');
const base58 = require('../helper/base58.js');
const validUrl = require('valid-url');
const mongoose = require('mongoose');
const config = require('../config');
const Url = require('../models/url')
const os = require("os");



router.use(express.static(path.join(__dirname, 'public')));
mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

router.get('/', function(req, res){
	  res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.get('/:encoded_id', function(req, res){
   let base58Id = req.params.encoded_id;
   let id = base58.decode(base58Id);

   // check if url already exists in database
   Url.findOne({_id: id}, function (err, doc){
	   if (doc) {
		   res.redirect(doc.long_url);
	   } else {
		   res.redirect(config.webhost);
	   }
   });

});

router.post('/api/shorten', function(req, res){
	  
   let  shortUrl = '';
   let longUrl = req.body.url.trim();
	  
   if (!validUrl.isUri(longUrl))
   {
	   return  res.send({'shortUrl':''}); 
   }
     
    // check if url already exists in database
	Url.findOne({long_url: longUrl}, function (err, doc){
	   if (doc){
	     shortUrl = config.webhost + base58.encode(doc._id);
	
	     // the document exists, so we return it without creating a new entry
	      res.send({'shortUrl': shortUrl});
	   } else {
	    // since it doesn't exist, let's go ahead and create it:
	     let newUrl = Url({
	       long_url: longUrl
	   });

	    // save the new link
	   newUrl.save(function(err) {
          if (err){
	        console.log(err);
	      }
          shortUrl = config.webhost  + base58.encode(newUrl._id);
          res.send({'shortUrl': shortUrl});
       });
   }

  });
	 
});


module.exports = router;