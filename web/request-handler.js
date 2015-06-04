var path = require('path');
var archive = require('../helpers/archive-helpers');
var staticServe = require('node-static');
var fs = require('fs');
// require more modules/folders here!
// archive.siteAssets
var statusCode = 200;

var servePage = function(path, res) {
  fs.readFile(path, {encoding: 'utf8'}, function(error, data){
    if (error) {
      console.log('error: ' + error);
    }
    res.writeHead(statusCode, {'Content-Type': 'text/html'});
    res.end(data);
  });
};



exports.handleRequest = function (req, res, path) {
  // res.end(archive.paths.list);
  var action = req.method;
  if (path === '/' || path === undefined) {
    path = '/index.html';
  }

  var servePost = function() {
    var string = '';
    req.on('data', function(data) {
      string += data;
    });
    req.on('end', function() {
      var site = string.substring(4);
      archive.isUrlInList(site, function(exists) {
        if(exists) {
          //serve cached website copy
        } else {
          archive.addUrlToList(site, function() {
            console.log('site has been appended to sites.txt');
          });
        };
        res.writeHead(302, {'Location': '/loading.html'});
        console.log('response within callback');
        console.log(res);
        res.end();
      });
      console.log('response outside of callback');
      console.log(res);
    });
  };


  var actions = {
    'GET': servePage(archive.paths.siteAssets + path, res),
    'POST': servePost
  };

  if(actions[action]) {
    actions[action]();
  }


};


exports.serveSites = function(req, res) {
  //add to paths list if not there
    //takes user to loading page OR responds with archived site

};
