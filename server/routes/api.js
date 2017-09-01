// Designed by: Ankit Gyawali
// Email: agyaw792@gmail.com
// Description: Contains API services for syllabus manager app.
// Helps with different CRUD operation on the database collection.
var express = require('express'),
    async = require('async');
    router = express.Router(),
     util = require('util'),
     routeCache = require('route-cache');

var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('db-reddit-analytics.db');

//Searches the collection of appropriate type. Matches user name and password
//Extracs required data, stores them in session value and sends back appropriate response.
router.post('/initialize', routeCache.cacheSeconds(3600), function(req, res) {
  db.serialize(function() {
        db.all("SELECT * FROM thisWeek", function(err, allRows) {
            if(err != null){
               res.sendStatus(500);
            }
             res.json(JSON.parse(JSON.stringify(allRows).replace("\'","'")));
        });
    });
});

// router.post('/initialize', function(req, res) {
//     db.serialize(function() {
//           db.all("SELECT * FROM thisWeek", function(err, allRows) {
//               if(err != null){
//                  res.sendStatus(500);
//               }
//               console.log(allRows)
//                res.json(JSON.parse(JSON.stringify(allRows).replace("\'","'")));
//           });
//       });
//   });

  
//Export routes
module.exports = router;