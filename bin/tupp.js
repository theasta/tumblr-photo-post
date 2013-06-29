#!/usr/bin/env node

'use strict';

// Parse the options
var options = require('../lib/cli').options;
var info = require('../lib/info');

var basedir = process.cwd(); // basedir = dir where the cli is triggered

if (options.version) {
  info.version();
  process.exit(0);
}

if (!options.target || !Array.isArray(options.target)) {
  info.fatal('No target specified');
}

// Get back all images passed as an argument
// if it's an image
var findImages = require('../lib/filter_images');
findImages(options.target, basedir, function(err, images){
  var tumblrPhoto = require('../lib/tumblr_post_photo');
  tumblrPhoto.post(images);
});

