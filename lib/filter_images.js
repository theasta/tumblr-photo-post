'use strict';

var path = require('path');
var fs = require('fs');
var async = require('async');


var existsAndIsNotDir = function(p, callback){
  fs.stat(p, function(err, stats){
    if (err) {
      callback(false);
    } else {
      callback(stats.isFile());
    }
  });
};

module.exports = function(targets, basedir, callback){
  // has to be an array, enforce it
  if ( ! Array.isArray(targets)) { targets = [targets]; }

  // resolve paths
  var paths = targets.map(function(t){
    return path.resolve(basedir || '', t);
  });

  if (paths.length === 0) {
    callback(null, []);
  } else {
    // make sure those paths exists and are directory
    async.filter(paths, existsAndIsNotDir, function(results){
      // we have a array of existing paths..
      // now let's only keep the jpegs
      var onlyJPEG = results.filter(function(result){ return (/\.(jpeg|jpg)$/i.test(result)); });
      callback(null, onlyJPEG);
    });
  }
};
