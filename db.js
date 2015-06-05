/* by rafælcastrocouto */
/*jslint node: true, sloppy: true, nomen: true, plusplus: true */
/*global console */

var fs = require('fs');

var readData = function (callback) {
  fs.readFile(__dirname + '/database.csv', function (error, data) {
    if (error) { throw error; }
    if (callback) { callback(data); }
  });
};

var writeData = function (data, callback) {
  fs.writeFile(__dirname + '/database.csv', data, function (error) {
    if (error) { throw error; }
    if (callback) { callback(true); }
  });
};

exports.get = function (name, callback) {
  readData(function (data) {
    var lines = String(data).split('\n'),
      value = '',
      found = false,
      n, //line number
      line,
      dataname,
      datavalue;
    for (n = 0; n < lines.length; n++) {
      line = lines[n].split(';');
      dataname = line[0];
      datavalue = line[1];
      if (name === dataname) {
        value = datavalue;
        found = true;
        break;
      }
    }
    console.log('Get(' + name + '): ' + value);
    if (callback) {
      callback(value, found);
    }
  });
};

exports.set = function (name, value, callback) {
  readData(function (data) {
    var lines = String(data).split('\n'),
      found = false,
      n, //line number
      line,
      dataname;
    for (n = 0; n < lines.length; n++) {
      line = lines[n].split(';');
      dataname = line[0];
      if (name === dataname) {
        lines[n] = name + ';' + value;
        found = true;
        break;
      }
    }
    if (!found) { lines.push(name + ';' + value); }
    writeData(lines.join('\n'), callback);
  });
};