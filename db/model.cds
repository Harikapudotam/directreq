// namespace ust.harika;

// using {OP_API_PRODUCT_SRV_0001 as prod_api} from '../srv/external/OP_API_PRODUCT_SRV_0001';
// using {API_PLANT_SRV as plant_api} from '../srv/external/API_PLANT_SRV';
// using {ust.harika} from './commons';
// using {
//     cuid,
//     Currency,
//     managed
// } from '@sap/cds/common';

// entity RequestHeaders : managed {
//      key ID         : UUID;
//         reqno      : Integer        @readonly @title : '{i18n>reqno}'  ;
//         reqdesc    :localized String;
//         status     : localized String ;
//         prtype     : String;
//         prnumber   : Integer;
//         // @semantics.totalprice.currencyCode: 'currency'
//         // @cds.aggregate                    : 'sum(netprice)'
//         Currency   : localized Currency;
//         totalprice : harika.AmountT @title : '{i18n>totalprice}' ;
//         //currency_code   : String;
//         items      : Composition of many RequestItems
//                          on items.RequestHeaders = $self;
//         _Comments           : Composition of many Comments
//                                   on _Comments._headercomment = $self; // comments
// }

// entity RequestItems : managed {
//     key ID : UUID;
//     itemno         : Integer ;
//     RequestHeaders : Association to RequestHeaders;
//     itemdescr      : String;
//     prgroup        : String;
//     material       : Association to Materials;
//     quantity       : Integer;
//     unitprice      : Integer;
//     netprice       : Integer @readonly;
//     uom            : String;
//     plant          : Association to Plants;
// }

// entity Materials as
//     projection on prod_api.A_Product {
//         key Product     as MID,
//             ProductType as Desc,
//     }

// entity Plants    as
//     projection on plant_api.A_Plant {
//         key Plant       as Plant,
//             CompanyCode as code
//     }
// entity Comments : cuid, managed {
//         _headercomment : Association to RequestHeaders;
//         text           : String // Text
//     }
namespace ust.harika;
using {OP_API_PRODUCT_SRV_0001 as prod_api} from '../srv/external/OP_API_PRODUCT_SRV_0001';
using {API_PLANT_SRV as plant_api} from '../srv/external/API_PLANT_SRV';
// using {ust.harika} from './commons';
using {
    cuid,
    Currency,
    managed
} from '@sap/cds/common';

entity RequestHeaders : managed {
    key ID         : UUID;
        reqno      : Integer        @readonly;
        reqdesc    : localized String;
        status     : localized String;
        prtype     : String;
        prnumber   : Integer @readonly;
        // @semantics.totalprice.currencyCode: 'currency'
        // @cds.aggregate                    : 'sum(netprice)'
        Currency   : localized Currency;
        totalprice : Integer @readonly @title: '{i18n>totalprice}';
        //currency_code   : String;
        items      : Composition of many RequestItems
                         on items.RequestHeaders = $self;
        _Comments  : Composition of many Comments
                         on _Comments._headercomment = $self; // comments
}

entity RequestItems : managed {
    key ID             : UUID;
        itemno         : Integer @readonly;
        RequestHeaders : Association to RequestHeaders;
        itemdescr      : String;
        prgroup        : String;
        material       : Association to Materials;
        quantity       : Integer;
        unitprice      : Integer;
        netprice       : Integer @readonly;
        uom            : String;
        plant          : Association to Plants;
}

entity Materials as
    projection on prod_api.A_Product {
        key Product     as MID,
            ProductType as Desc,
            BaseUnit as unit
    }

entity Plants    as
    projection on plant_api.A_Plant {
        key Plant       as Plant,
            CompanyCode as code
    }

entity Comments : cuid, managed {
    _headercomment : Association to RequestHeaders;
    text           : String // Text
}
