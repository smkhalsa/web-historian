var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpRequest = require('http-request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  fs.readFile(exports.paths.list, {encoding: 'utf8'}, function(err, data) {
    if (err) {
      console.log('error: ' + err);
    } else {
      callback(data);
    }
  });
  // console.log('dataToSend:' +dataToSend);
  // return dataToSend;
};

exports.isUrlInList = function(site, callback){

  exports.readListOfUrls(function(data){
    callback(data.indexOf(site) > -1);
  });


};


exports.addUrlToList = function(site, callback){
  // append the posted string to the list
  // write the list to sites.text
  fs.appendFile(exports.paths.list, site + '\n', callback);
};

exports.isURLArchived = function(path, callback){
  fs.readFile(exports.paths.archivedSites + '/' + path, {encoding: 'utf8'}, function(err, data){
    callback(!err, path);
  });
};

exports.getSite = function(site, callback){
  httpRequest.get('http://' + site, function(err, response){
    if(err) {
      console.log('error: ' + err);
    } else {
      callback(response.buffer.toString());
    }
  });
};

exports.downloadUrls = function(site) {
  exports.getSite(site, function(html){
    fs.writeFile(exports.paths.archivedSites + '/' + site, html, function(err){
      if(err) {
        console.log('error:' + err);
      } else {
        console.log('file saved');
      }
    });
  });
};
