var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.sendResponse = function(res, data, status) {
  var statusCode = status || 200;
  res.writeHead(statusCode, {'Content-Type': 'text/html'});
  res.end(data);
};

exports.serveAssets = function(res, asset) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
  fs.readFile(archive.paths.siteAssets + asset, {encoding: 'utf8'}, function(err, data){
    if (err) {
      fs.readFile(archive.paths.archivedSites + asset, {encoding: 'utf8'}, function(err, data) {
        if(err) {
          exports.send404(res);
        } else {
          exports.sendResponse(res, data);
        }
      });
    } else {
      exports.sendResponse(res, data);
    }

  });
};

exports.serveRedirect = function(location, res, code) {
  var statusCode = code || 302;
  res.writeHead(statusCode, {'Location': '/' + location});
  res.end();
};


exports.collectData = function(req, callback) {
  var string = '';
  req.on('data', function(data) {
    string+=data;
  });
  req.on('end', function() {
    callback(string.substring(4));
  });
};

exports.send404 = function(res) {
  res.writeHead(404);
  res.end("404 - file not found");
};
