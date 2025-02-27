using {ust.harika} from '../db/model';

service MyService {
    // @odata.draft.enabled : true
    entity RequestHeaders @(odata.draft.enabled: true ) as projection on harika.RequestHeaders
     actions{
        @Core.OperationAvailable : true
        // @Core.OperationAvailable : {$edmJson : {$Ne : [{$Path : 'RequestHeaders.status'}, 'approved']}}
        action sendforapproval();
        action responsefrombpa(status : String , reqno : Integer) ;
        action rejected(status: String , reqno : Integer);
        
    };
    entity RequestItems   as projection on harika.RequestItems;
    entity Materials      as projection on harika.Materials;
    entity Plants         as projection on harika.Plants;
    action triggerIFlow() returns String;
    // action Approvals() returns String;
    //action sendforapproval () returns String;
    //action sendforapproval(reqno: Integer, IsActiveEntity: Boolean) on RequestHeaders returns String;
    // action sendforapproval(reqno: Integer, IsActiveEntity: Boolean) on MyService.RequestHeaders returns String;

};
annotate MyService.RequestHeaders with {
  reqno @changelog;
  reqdesc @changelog;
  status @changelog;
  prtype @changelog;
  prnumber @changelog;
  Currency @changelog;
  totalprice @changelog;
  items @changelog;
};
annotate MyService.RequestItems with {
  itemno @changelog;
  netprice @changelog;
  quantity @changelog;
  unitprice @changelog;
  createdBy @changelog;
};
using from '@cap-js/change-tracking';

annotate sap.changelog.aspect @(UI.Facets: [{
          $Type               : 'UI.ReferenceFacet',
          ID                  : 'ChangeHistoryFacet',
          Label               : '{i18n>ChangeHistory}',
          Target              : 'changes/@UI.PresentationVariant',
          ![@UI.PartOfPreview]
}]);
