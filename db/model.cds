namespace ust.harika;

using {OP_API_PRODUCT_SRV_0001 as prod_api} from '../srv/external/OP_API_PRODUCT_SRV_0001';
using {
    Currency,
    managed
} from '@sap/cds/common';

@draft.enabled: true
entity RequestHeaders : managed {
    key reqno      : Integer        @readonly;
        reqdesc    : String;
        status     : String;
        prtype     : String;

        @semantics.totalprice.currencyCode: 'currency'
        @cds.aggregate                    : 'sum(netprice)'
        totalprice : Decimal(10, 2) @readonly;
        currency   : Currency;
        items      : Composition of many RequestItems
                         on items.RequestHeaders = $self;
}

@draft.enabled: true
entity RequestItems : managed {
    key ID             : UUID;
        itemno         : Integer;
        reqno          : Integer;
        RequestHeaders : Association to RequestHeaders;
        itemdescr      : String;
        prgroup        : String;
        material       : Association to Materials;
        quantity       : Integer;
        unitprice      : Integer;
        netprice       : Decimal(10, 2) @readonly;
        uom            : String;
        plant          : Association to Plants;
}

entity Materials as
    projection on prod_api.A_Product {
        key Product     as MID,
            ProductType as Desc,
    }

entity Plants    as
    projection on prod_api.A_ProductPlant {
        key Product  as Product,
            Plant    as Plant,
            BaseUnit as Unit,
    }
