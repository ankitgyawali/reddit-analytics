;
(function() {
    angular
        .module('reddit-analytics')
        .factory('localstoragefactory', localstoragefactory);

    localstoragefactory.$inject = ['CONSTANTS', 'moment', 'localStorageService'];

    function localstoragefactory(CONSTANTS, moment, localStorageService) {

        function keys() {
            return localStorageService.keys();
        }

        function getItem(key) {
            return localStorageService.get(key);
        }

        function setItem(key, val) {
            return localStorageService.set(key, val);
        }

        function getKeys() {
            return localStorageService.keys();
        }

        function removeItem(key) {
            return localStorageService.remove(key);
        }

        //...
        function lsLength() {
            return localStorageService.length();

        }

        function initialize(value) {
            setItem("thisWeekData", value);
            return "Initialized";
        }

        return { //All of the data is stored as cookie by utilizing $cookies
            get: getItem,
            set: setItem,
            getKeys: getKeys,
            removeItem: removeItem,
            lsLength: lsLength,
            initialize: initialize,
            keys: keys
        };
    }

})();