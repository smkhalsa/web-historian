// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
var archive = require('../helpers/archive-helpers.js');

archive.readListOfUrls(function(data) {
  console.log('called');
  var sites = data.split('\n');
  sites.pop();
  console.log('sites are ', sites);
  for (var i = 0; i < sites.length; i++) {
    console.log('looking up ' + sites[i]);
    archive.isURLArchived(sites[i], function(found, site) {
      if (!found) {
        console.log(site + " not found. Now downloading");
        archive.downloadUrls(site);
      } else {
        console.log(site + ' already exists');
      }
    });
  }
});


//look in sites.txt
//for each site
  //if site doesnt exist in sites folder
    //call archive.downloadURL helper on the site

