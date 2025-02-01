sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'ust/prt/test/integration/FirstJourney',
		'ust/prt/test/integration/pages/RequestHeadersList',
		'ust/prt/test/integration/pages/RequestHeadersObjectPage',
		'ust/prt/test/integration/pages/RequestItemsObjectPage'
    ],
    function(JourneyRunner, opaJourney, RequestHeadersList, RequestHeadersObjectPage, RequestItemsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('ust/prt') + '/index.html'
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