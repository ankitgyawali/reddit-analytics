;
(function() {

    angular
        .module('reddit-analytics')
        .factory('chartfactory', chartfactory);

    chartfactory.$inject = ['$timeout', 'CONSTANTS', 'moment', 'localStorageService', 'dataProcessor', 'dataDecoratorfactory', 'lodash'];

    function chartfactory($timeout, CONSTANTS, moment, localStorageService, dataProcessor, dataDecoratorfactory, _) {

        // Processed_data == array of cut data
        function sunburst(processed_data, chart_data) {
            // Produce entities // PARAMETTERS
            function sortEntities(entity) {
                entity.sort(function(a, b) {
                    return parseInt(a.entimentSorter) - parseInt(b.entimentSorter);
                });
                return entity;
            }

            function makeEntities(reddit_id, process_datetime, entities, p, s) {
                let varstoReturn = [];
                for (let m = 0; m < entities.length; m++) { // Loop to populate Entities arcs
                    varstoReturn.push({
                        entimentSorter: dataDecoratorfactory.normalizeConfidenceForSorting(entities[m].confidence, entities[m].label),
                        name: dataProcessor.entitiesLabelMaker(reddit_id, process_datetime, entities.length, entities[m], m + 1, 3 + m + p + s + ''),
                        color: dataDecoratorfactory.interPolateSentimentColor(entities[m].label, parseInt(entities[m].confidence)),
                        value: 3,
                        children: []
                    })
                }
                varstoReturn = sortEntities(varstoReturn)
                return varstoReturn;
            }


            for (var i = 0; i < processed_data.length; i++) { // Loop through one select [list of reddit_id posts]

                chart_data[0].children[_.findIndex(chart_data[0].children, function(o) {
                    return o.index == processed_data[i].id;
                })].children.push // push to sunburst format
                ({
                    process_datetime: processed_data[i].process_datetime,
                    subreddit: processed_data[i].subreddit,
                    // Create Name for categories
                    name: dataProcessor.categoryLabelMaker(
                        processed_data[i].categories.label_id, processed_data[i].categories.name,
                        processed_data[i].process_datetime, processed_data[i].reddit_id,
                        dataProcessor.sorterLabel(processed_data[i].categories.label_id, processed_data[i].sentiment.confidence, processed_data[i].sentiment.label)),
                    label_id: processed_data[i].categories.label_id,
                    // Map to rgb array[21]                       
                    color: dataDecoratorfactory.rgb2hex(CONSTANTS.contrast_set[processed_data[i].categories.label_id][0], CONSTANTS.contrast_set[processed_data[i].categories.label_id][1], CONSTANTS.contrast_set[processed_data[i].categories.label_id][2]),
                    children: // Each Sentiment Arc
                        [{
                            name: dataProcessor.sentimentLabelMaker(processed_data[i].reddit_id, processed_data[i].process_datetime, processed_data[i].sentiment),
                            // Get Colo from interpolato
                            color: dataDecoratorfactory.interPolateSentimentColor(processed_data[i].sentiment.label, parseInt(processed_data[i].sentiment.confidence)),
                            // Push entities here
                            children: makeEntities(processed_data[i].reddit_id, processed_data[i].process_datetime, processed_data[i].entities, i, 2)
                        }]
                });

            } // Loop through row objects
            return chart_data;
        }

        return {
            sunburst: sunburst
        };
    }
})();