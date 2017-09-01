/**
 * Main application controller
 *
 * You can use this controller for your whole app if it is small
 * or you can have separate controllers for each logical section
 * 
 */
;(function() {

  angular
    .module('reddit-analytics')
    .controller('MainController', MainController);

  MainController.$inject = ['CONSTANTS','dataProcessor','localstoragefactory','$http','lodash'];

  function MainController(CONSTANTS, dataProcessor, localstoragefactory, $http, notificationFactory, _) {
      let today = dateFns.format(new Date(),'MM/DD');

      function clone(data){
        return JSON.parse(JSON.stringify(data));
      }

      let found = false;
      if(localstoragefactory.get('processedData')){
        for(let i=0;i<localstoragefactory.get('processedData').length;i++){
          if(dateFns.format(new Date(localstoragefactory.get('processedData')[i].process_datetime),'MM/DD') == today){
            found = true;
            break;
          }
        }
      }

      if
      (localstoragefactory.keys().indexOf("processedData") == 0
      ||
      (localstoragefactory.get('processedData') && localstoragefactory.get('processedData').length < 10)
      ||
      !found)
      {
            $http({
              method: 'POST',
              url: CONSTANTS.API_URL[CONSTANTS.ENVIRONMENT]+'/initialize',
              // set the headers so angular passing info as form data (not request payload)
              headers: {
                  'Content-Type': 'application/json'
              }
          }).success(function(data, status, headers, config) {

                  // Initialize first by trying to store data - this week raw data
                  localstoragefactory.initialize(clone(data)); //thisWeekData
                  console.log("Setting initial data from api")
                  localstoragefactory.set('initial_data_from_api', data); //thisWeekData
                  // Process data and save it
                  localstoragefactory.set('processedData',dataProcessor.processThisWeek(data))
          })
          .error(function(data, status, headers, config) {
            notificationFactory.error("Something went wrong while fetching data from API. Report admin.")
            notificationFactory.error(status)
          });
        } else {
            localstoragefactory.set('processedData',dataProcessor.processThisWeek(clone(localstoragefactory.get('initial_data_from_api'))));
        }
  }


})();