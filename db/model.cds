namespace ust.harika;

using {OP_API_PRODUCT_SRV_0001 as prod_api} from '../srv/external/OP_API_PRODUCT_SRV_0001';
using {API_PLANT_SRV as plant_api} from '../srv/external/API_PLANT_SRV';
using {ust.harika} from './commons';
using {
    Currency,
    managed,
    cuid
} from '@sap/cds/common';

entity RequestHeaders : managed {
    key reqno      : Integer        @readonly;
        reqdesc    : String;
        status     : String;
        prtype     : String;
        prnumber   : Integer;
        // @semantics.totalprice.currencyCode: 'currency'
        // @cds.aggregate                    : 'sum(netprice)'
        Currency   : Currency;
        totalprice : harika.AmountT @readonly;
        //currency_code   : String;
        items      : Composition of many RequestItems
                         on items.RequestHeaders = $self;
}

entity RequestItems : cuid, managed {
    itemno         : Integer @readonly;
    reqno          : Integer;
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
    }

entity Plants    as
    projection on plant_api.A_Plant {
        key Plant       as Plant,
            CompanyCode as code
    }
