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

// ONLY ENABLE IN PROD
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

router.post('/bydate', function(req, res) {
    let sr =  ['all', 'askreddit','politics','videos','worldnews']
    let query = []

    if(!req.query || !req.query.date || req.query.date.length != 10){
        res.status(404).send("Something wrong with date query format.")
    } else {
    for (let index=0; index<sr.length;index++){
        query.push('SELECT "'+ index +'" as id, process_datetime,reddit_id ,sentiment ,entities ,catagories FROM "'+sr[index]
    // +'" WHERE DATE(process_datetime) >= DATE("now", "-7 days")');
    +'" WHERE DATE(process_datetime) LIKE "' + req.query.date + '"');
    }

    
    console.log(query.join(" UNION ALL "))
    db.serialize(function() {
          db.all(query.join(" UNION ALL "), function(err, allRows) {
              if(err != null){
                 res.sendStatus(500);
              }
               res.json(JSON.parse(JSON.stringify(allRows).replace("\'","'")));
          });
      });
    } 

  });


// router.post('/initialize', function(req, res) {
//     db.serialize(function() {
//           db.all("SELECT * FROM thisWeek", function(err, allRows) {
//               if(err != null){
//                  res.sendStatus(500);
//               }
//                res.json(JSON.parse(JSON.stringify(allRows).replace("\'","'")));
//           });
//       });
//   });


// router.post('/get_date', function(req, res) {
//     db.serialize(function() {
//           db.all("SELECT * FROM thisWeek", function(err, allRows) {
//               if(err != null){
//                  res.sendStatus(500);
//               }
//                res.json(JSON.parse(JSON.stringify(allRows).replace("\'","'")));
//           });
//       });
// });

//Export routes
module.exports = router;