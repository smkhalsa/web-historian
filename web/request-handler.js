var path = require('path');
var archive = require('../helpers/archive-helpers');
var staticServe = require('node-static');
var fs = require('fs');
var util = require('./http-helpers.js');



exports.handleRequest = function (req, res, path) {
  var action = req.method;
  if (path === '/' || path === undefined) {
    path = '/index.html';
  }

  var actions = {
    'GET': function(){
      util.serveAssets(res, path);
    },
    'POST': function(){
      util.collectData(req, function(site) {
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
