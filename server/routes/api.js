// Designed by: Ankit Gyawali
// Email: agyaw792@gmail.com
// Description: Contains API services for syllabus manager app.
// Helps with different CRUD operation on the database collection.
var express = require('express'),
async = require('async');
    router = express.Router(),
     util = require('util');

var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('db-reddit-analytics.db');


//Searches the collection of appropriate type. Matches user name and password
//Extracs required data, stores them in session value and sends back appropriate response.
router.post('/initialize', function(req, res) {


  db.serialize(function() {

        db.all("SELECT * FROM thisWeek", function(err, allRows) {

            if(err != null){
               res.sendStatus(500);
            }
            console.log(err);
            console.log(util.inspect(allRows));
            // callback(allRows);
             res.json(allRows);

        });


    });


//     db.get("SELECT * FROM thisweek", function(err, row){
//         console.log(row);
//         console.log(err);
//         res.json(row);
// });

// var posts = [];
// db.serialize(function() {
//     db.each("SELECT * FROM thisweek", function(err, row) {
//         posts.push(row)
//     }, function() {
//         // All done fetching records, render response
//         res.status("200").json("dynamic", {title: "Dynamic", posts: posts})
//     })
// }) 


//   var json = {};

//     async.parallel({
//         courses: function(callback) {
//             //  models.class.find({}, function(err, result) {
//               return  db.each("SELECT * FROM thisweek", function(err, row) {
//   return callback(err, row);

//   if (err) {
// //   callback(err);
// res.send(err);
// } else {
//       res.send(JSON.stringify(row));

// }

//     //    if(err){
//     //     res.send(404);
//     //    }
//     //    else{
//     //          res.send(JSON.stringify(row));
//     //    }
// });


                
//             // });
//         }
//     }, function(err, json) {
//         return res.json(json);
// });



 
});


//Export routes
module.exports = router;