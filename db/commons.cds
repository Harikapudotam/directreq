namespace ust.harika;
//using { Currency } from '@sap/cds/common';
type AmountT : Integer@(
    Semantics.amount.currencyCode: 'CURRENCY_CODE',
    sap.unit:'CURRENCY_CODE'
);