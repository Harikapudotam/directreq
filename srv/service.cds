using {ust.harika} from '../db/model';

service MyService {
    // @odata.draft.enabled : true
    entity RequestHeaders @(odata.draft.enabled: true ) as projection on harika.RequestHeaders
     actions{
        action sendforapproval();
        action responsefrombpa(status : String , ID : UUID) ;
    };
    entity RequestItems   as projection on harika.RequestItems;
    entity Materials      as projection on harika.Materials;
    entity Plants         as projection on harika.Plants;
    action triggerIFlow() returns String;
    // action Approvals() returns String;
    //action sendforapproval () returns String;
    //action sendforapproval(reqno: Integer, IsActiveEntity: Boolean) on RequestHeaders returns String;
    // action sendforapproval(reqno: Integer, IsActiveEntity: Boolean) on MyService.RequestHeaders returns String;

    
    

    
    // entity REQUESTHEADERS_DRAFTS as projection on harika.RequestHeaders_drafts;
}
