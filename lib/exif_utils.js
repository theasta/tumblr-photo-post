'use strict';

module.exports = {
  createdDateKey: 'file modification date time',
  fileNameKey: 'file name',
  directoryKey: 'directory',
  getJSDate: function(exifDateStr){
    var d;
    var matches = /(\d{4}):(\d{2}):(\d{2})\s(\d{2}):(\d{2}):(\d{2})/.exec(exifDateStr);
    if (matches && matches.length >= 7) {
      var year = matches[1],
      month = matches[2],
      day = matches[3],
      hours = matches[4],
      minutes = matches[5],
      seconds = matches[6];

      d = new Date(year, month, day, hours, minutes, seconds);
    }
    return d;
  },
  getCreatedDate: function(obj){
    if (typeof obj !== 'object') { return; }
    return obj[this.createdDateKey];
  },
  getJSCreatedDate: function(obj){
    if (typeof obj !== 'object') { return; }
    return this.getJSDate(this.getCreatedDate(obj));
  },
  getFileName: function(obj){
    if (typeof obj !== 'object') { return; }
    return obj[this.directoryKey] + '/' + obj[this.fileNameKey];
  }
};

