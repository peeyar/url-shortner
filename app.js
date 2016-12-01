'use strict'

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const base58 = require('./base58.js');
const validUrl = require('valid-url');

// grab the url model
const Url = require('./models/url');

app.set('port', (process.env.PORT || 5000));

mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/api/shorten', function(req, res){
  
  let  shortUrl = '';
  let longUrl = req.body.url.trim();
  
  if (validUrl.isUri(longUrl))
  {
	  
  }
  else
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
      var newUrl = Url({
        long_url: longUrl
      });

      // save the new link
      newUrl.save(function(err) {
        if (err){
          console.log(err);
        }

        shortUrl = config.webhost + base58.encode(newUrl._id);

        res.send({'shortUrl': shortUrl});
      });
    }

  });
 
});

app.get('/:encoded_id', function(req, res){

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

let server = app.listen(app.get('port'), function(){
	  console.log('Node app is running on port', app.get('port'));
});
