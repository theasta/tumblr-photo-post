'use strict';

var filterImages = require('../lib/filter_images');

exports.filter_images = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  singlephoto: function(test) {
    test.expect(3);
    filterImages('fixtures/pix/fixt1.jpg', __dirname, function(err, images){
      test.equal(err, null, 'should be no errors');
      test.strictEqual(images.length, 1, 'should get one image back');
      test.ok(images[0].indexOf('test/fixtures/pix/fixt1.jpg') > 0, 'should contain test/fixtures/pix/fixt1.jpg');
      test.done();
    });
  },
  twophotos: function(test) {
    test.expect(4);
    filterImages(['fixtures/pix/fixt1.jpg', 'fixtures/pix/sub/uppercase.JPG'], __dirname, function(err, images){
      test.equal(err, null, 'should be no errors');
      test.strictEqual(images.length, 2, 'should get two images back');
      test.ok(images[0].indexOf('test/fixtures/pix/fixt1.jpg') > 0, 'should contain test/fixtures/pix/fixt1.jpg');
      test.ok(images[1].indexOf('test/fixtures/pix/sub/uppercase.JPG') > 0, 'should contain test/fixtures/pix/sub/uppercase.JPG');
      test.done();
    });
  },
  dontexist: function(test) {
    test.expect(2);
    filterImages('fixtures/pix/fixt2.jpg', __dirname, function(err, images){
      test.equal(err, null, 'should be no errors');
      test.strictEqual(images.length, 0, 'should get one image back');
      test.done();
    });
  },
  wrong_extension: function(test) {
    test.expect(2);
    filterImages('fixtures/pix/fixt2.gif', __dirname, function(err, images){
      test.equal(err, null, 'should be no errors');
      test.strictEqual(images.length, 0, 'should get one image back');
      test.done();
    });
  },
  accept_jpeg: function(test) {
    test.expect(3);
    filterImages('fixtures/pix/fixt1.jpeg', __dirname, function(err, images){
      test.equal(err, null, 'should be no errors');
      test.strictEqual(images.length, 1, 'should get one image back');
      test.ok(images[0].indexOf('test/fixtures/pix/fixt1.jpeg') > 0, 'should contain test/fixtures/pix/fixt1.jpeg');
      test.done();
    });
  },
  no_directory_yet: function(test) {
    test.expect(2);
    filterImages('fixtures/pix/trap.jpg', __dirname, function(err, images){
      test.equal(err, null, 'should be no errors');
      test.strictEqual(images.length, 0, 'should get nothing back');
      test.done();
    });
  },
};

