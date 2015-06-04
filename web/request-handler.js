var path = require('path');
var archive = require('../helpers/archive-helpers');
var staticServe = require('node-static');
var fs = require('fs');
// require more modules/folders here!
// archive.siteAssets


exports.handleRequest = function (req, res, path) {
  // res.end(archive.paths.list);
  var action = req.method;
  if (path === '/' || path === undefined) {
    path = '/index.html';
  }

  var serveGet = function() {
    var statusCode = 200;
    var filePath = archive.paths.siteAssets+ path;
    fs.readFile(filePath, {encoding: 'utf8'}, function(error, data){
      if (error) {
        console.log('error: ' + error)
      }
      res.writeHead(statusCode, {'Content-Type': 'text/html'});
      res.end(data);
    });
  };
    // var server = new staticServe.Server(archive.paths['siteAssets']);

    // req.addListener('end', function () {
    //     server.serve(req, res);
    //   }).resume();

  var servePost = function() {
    var string = '';
    req.on('data', function(data) {
      string += data;
    });
    req.on('end', function() {
    });
    // pull off url=
    var site = string.substring(4);
    archive.readListOfUrls(function(data) {
      console.log(data);
    });

  };


  var actions = {
    'GET': serveGet,
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
