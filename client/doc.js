var docgen = require('../scr/docgen')();
docgen.package().config(function(log) {
    log.level = 'info';
})
docgen.src("./docs");
docgen.dest("./docs");
docgen.generate().then(function(){
  console.log("I'm done!");
});