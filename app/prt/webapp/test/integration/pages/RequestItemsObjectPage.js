sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'ust.prt',
            componentId: 'RequestItemsObjectPage',
            contextPath: '/RequestHeaders/items'
        },
        CustomPageDefinitions
    );
});