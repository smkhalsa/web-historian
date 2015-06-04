var path = require('path');
var archive = require('../helpers/archive-helpers');
var staticServe = require('node-static');
var fs = require('fs');
var util = require('./http-helpers.js');
// require more modules/folders here!
// archive.siteAssets
// var statusCode = 200;

// var servePage = function(path, res) {
//   fs.readFile(path, {encoding: 'utf8'}, function(error, data){
//     if (error) {
//       console.log('error: ' + error);
//     }
//     res.writeHead(statusCode, {'Content-Type': 'text/html'});
//     res.end(data);
//   });
// };





exports.handleRequest = function (req, res, path) {
  // res.end(archive.paths.list);
  var action = req.method;
  if (path === '/' || path === undefined) {
    path = '/index.html';
  }

  // var servePost = function() {
  //   var string = '';
  //   req.on('data', function(data) {
  //     string += data;
  //   });
  //   req.on('end', function() {
  //     var site = string.substring(4);
  //     archive.isUrlInList(site, function(exists) {
  //       if(exists) {
  //         util.serveRedirect("/" + site, res, 302);
  //         //serve cached website copy
  //       } else {
  //         archive.addUrlToList(site, function() {
  //           console.log('site has been appended to sites.txt');
  //           util.serveRedirect('/loading.html', res, 302);
  //         });
  //       };
  //       // res.writeHead(302, {'Location': '/loading.html'});
  //       // console.log('response within callback');
  //       // console.log(res);
  //       // res.end();
  //     });
  //     console.log('response outside of callback');
  //     console.log(res);
  //   });
  // };


  var actions = {
    'GET': function(){
      util.serveAssets(res, path);
    },
    'POST': function(){
      util.collectData(req, function(site) {
        // console.log('collected data');
        // console.log(site);
        archive.isUrlInList(site, function(found) {
          if (found) {
            archive.isURLArchived(site, function(exists) {
              if (exists) {
                util.serveRedirect(site, res);
              } else {
                util.serveRedirect('loading.html', res);
              }
            });
          } else {
            archive.addUrlToList(site, function() {
              util.serveRedirect('loading.html', res);
            });

          }
        });
      });
    }
  };

  if(actions[action]) {
    actions[action]();
  }


};
