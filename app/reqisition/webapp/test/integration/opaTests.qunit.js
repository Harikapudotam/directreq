sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'ust/reqisition/test/integration/FirstJourney',
		'ust/reqisition/test/integration/pages/RequestHeadersList',
		'ust/reqisition/test/integration/pages/RequestHeadersObjectPage',
		'ust/reqisition/test/integration/pages/RequestItemsObjectPage'
    ],
    function(JourneyRunner, opaJourney, RequestHeadersList, RequestHeadersObjectPage, RequestItemsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('ust/reqisition') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheRequestHeadersList: RequestHeadersList,
					onTheRequestHeadersObjectPage: RequestHeadersObjectPage,
					onTheRequestItemsObjectPage: RequestItemsObjectPage
                }
            },
            opaJourney.run
        );
    }
);