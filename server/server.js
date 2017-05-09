#!/usr/bin/env node

var
    app = require('./app'),

        fs = require('fs')
  , ini = require('ini');
   

var CONFIG = (ini.parse(fs.readFileSync('./config.ini', 'utf-8')));

let environment = CONFIG.ENVIRONMENT;


console.log(CONFIG.NODEJS_PORT[CONFIG.ENVIRONMENT['ENVIRONMENT']]);
console.log((CONFIG.ENVIRONMENT['ENVIRONMENT']))

// 'a.b.etc'.split('.').reduce((o,i)=>o[i], obj)

//Set app to run on port #3000
app.set('port', process.env.PORT || CONFIG.NODEJS_PORT[CONFIG.ENVIRONMENT['ENVIRONMENT']]);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});