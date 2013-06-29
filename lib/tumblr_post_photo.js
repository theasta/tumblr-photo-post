'use strict';

var async = require('async');
var fs = require('fs');
var conf = require('../conf/conf.js');

var Tumblr = require('tumblrwks');
 //create a tumblr instance
var tumblr = new Tumblr({
  consumerKey: conf.consumerKey,
  consumerSecret: conf.consumerSecret,
  accessToken: conf.token,
  accessSecret: conf.token_secret
}, conf.blog );

var exifUtils = require('../lib/exif_utils');
var exif = require('exif2'); // require exifTool

module.exports = {
  upload: function(photoObj, callback){
    var fileName = photoObj.filename;
    delete photoObj.fileName;
    console.log('Starting uploading ' + fileName + ' ...');
    tumblr.post('/post', photoObj, function(result){
      if (typeof result === 'object' && result.id){
        console.log('Successfully uploaded ' + fileName);
      }
      callback(null, result);
    });
  },
  post: function(images){
    var self = this;

    // get exif data first
    async.map(images, exif, function(err, results) {
      // create an array of formatted photo options (keys: type, date, data)
      var imagesData = [];
      results.forEach(function(r){
        // retrieve date from exif
        var dateCreated = exifUtils.getJSCreatedDate(r);
        if ( dateCreated instanceof Date){
          var fileName = exifUtils.getFileName(r);
          var photo = fs.readFileSync(fileName);
          imagesData.push({ type: 'photo', date: dateCreated.toUTCString(), data: [photo], filename: fileName });
        }
      });

      // batch post to tumbrl
      async.eachSeries(imagesData, self.upload, function(err){
        if (err) {
          console.log(err);
          process.exit(0);
        } else {
          process.exit(1);
        }
      });
    });

  }
};

