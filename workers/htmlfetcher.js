// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.

// CRON job */1 * * * * /Users/student/.nvm/v0.10.26/bin/node /Users/student/Desktop/web-historian/workers/htmlfetcher.js

var archive = require('../helpers/archive-helpers.js');

archive.readListOfUrls(function(data) {
  var sites = data.split('\n');
  sites.pop();
  for (var i = 0; i < sites.length; i++) {
    archive.isURLArchived(sites[i], function(found, site) {
      if (!found) {
        archive.downloadUrls(site);
      } else {
      }
    });
  }
});
