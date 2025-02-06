using MyService as service from '../../srv/service';
annotate service.RequestHeaders @(
    UI.UpdateHidden   : {$edmJson: {$Eq: [
        {$Path: 'status'},
        'Approved'
    ]}},

    UI.DeleteHidden   : {$edmJson: {$Eq: [
        {$Path: 'status'},
        'Approved'
    ]}},
    

    UI.SelectionFields: [
        reqdesc,
        reqno,
        status
    ],

    UI.LineItem       : [
        {
            $Type: 'UI.DataField',
            Label: 'Request Number',
            Value: reqno,
        },

        {
            $Type: 'UI.DataField',
            Label: 'Request Description',
            Value: reqdesc,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Total Price',
            Value: totalprice,

        },
        {
            $Type: 'UI.DataField',
            Label: 'Currency',
            Value: Currency_code,

        },

        {
            $Type: 'UI.DataField',
            Label: 'Status',
            Value: status,
        },

        {
            $Type: 'UI.DataField',
            Value: createdBy,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Material',
            Value: items.material_MID,
        },
        {
            $Type: 'UI.DataField',
            Label: 'PR',
            Value: prnumber,
        },
    ],

    UI.HeaderInfo     : {
        TypeName      : 'Request1',
        TypeNamePlural: 'Request',
        Title         : {Value: reqdesc},
        Description   : {Value: reqno}
    },
    UI.Facets         : [
        {
            $Type : 'UI.CollectionFacet',
            Label : 'General Information',
            Facets: [{
                $Type : 'UI.ReferenceFacet',
                Label : 'Item Details',
                Target: '@UI.Identification'
            }
            ],
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Items',
            Target: 'items/@UI.LineItem'
        },
    ],
    UI.Identification : [
        

        // {
        //     $Type      : 'UI.DataFieldForAction',
        //     Action     : 'MyService.sendforapproval',
        //     Label      : 'Sendforapproval',
        //     Criticality: #Neutral
        // },
        {
            $Type: 'UI.DataField',
            Label: 'Request Number',
            Value: reqno,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Request Description',
            Value: reqdesc,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Total Price',
            Value: totalprice,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Currency',
            Value: Currency_code,

        },
        {
            $Type: 'UI.DataField',
            Label: 'createdBy',
            Value: createdBy,
        },
        {
            $Type: 'UI.DataField',
            Value: createdAt,
        },
        {
            $Type: 'UI.DataField',
            Value: modifiedBy,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Status',
            Value: status,
        },
        {
            $Type: 'UI.DataField',
            Label: 'PR',
            Value: prnumber,
        },
    ],
// UI.FieldGroup #Spiderman: {
//Label : 'PO pricing',
// Data : [
// {
//     $Type : 'UI.DataField',
//     Value : TotalPrice,
// },
// {
//     $Type : 'UI.DataField',
//     Value : Status_ID,
// },
// {
//     $Type : 'UI.DataField',
//     Value : TAX_AMOUNT,
// },
// {
//     $Type : 'UI.DataField',
//     Value : CURRENCY_code,
// },
//],
// }
//    UI.ValueList: {
//         entity: 'RequestHeader',
//         valueListEntity: 'RequestHeader',
//         value: 'RequestDescr', // Field to display in the value list
//         text: 'RequestDescr'   // The text to show in the suggestion list
//     }


);


annotate service.RequestItems with @(


    UI.LineItem      : [
        {
            $Type: 'UI.DataField',
            Label: 'Request Number',
            Value: RequestHeaders_reqno,
        },
        {
            $Type: 'UI.DataField',
            Label: 'ID',
            Value: ID,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Item Number',
            Value: itemno,
        },

        // {
        //    $Type : 'UI.DataField',
        //    Value : MaterialNum.MID,
        // },
        // {
        //  $Type : 'UI.DataField',
        //      Value : MaterialNum_MID,
        //  },
        {
            $Type: 'UI.DataField',
            Label: 'Item Description',
            Value: itemdescr,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Quantity',
            Value: quantity,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Unit price',
            Value: unitprice,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Net price',
            Value: netprice,
        },

        {
            $Type: 'UI.DataField',
            Label: 'Material',
            Value: material_MID,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Plant',
            Value: plant_Plant,
        }
    ],

    UI.Facets        : [{
        $Type : 'UI.CollectionFacet',
        Label : 'General Information',
        Facets: [{
            $Type : 'UI.ReferenceFacet',
            Label : 'Itemms',
            Target: '@UI.Identification'
        },
        // {
        //     $Type : 'UI.ReferenceFacet',
        //     Label: 'Status Details',
        //     Target : '@UI.FieldGroup#Spiderman'
        // },
        ],
    }, ],
    UI.Identification: [
        
        {
            $Type: 'UI.DataField',
            Label: 'Item Number',
            Value: itemno,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Description',
            Value: itemdescr,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Price',
            Value: unitprice,
        },
        {
            $Type: 'UI.DataField',
            Label: 'createdBy',
            Value: createdBy,
        },
        {
            $Type: 'UI.DataField',
            Value: createdAt,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Request Number',
            Value: RequestHeaders_reqno,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Material',
            Value: material_MID,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Net price',
            Value: netprice,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Quantity',
            Value: quantity,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Plant',
            Value: plant_Plant,
        }
    ],
// UI.FieldGroup #Spiderman: {
//Label : 'PO pricing',
// Data : [
// {
//     $Type : 'UI.DataField',
//     Value : TotalPrice,
// },
// {
//     $Type : 'UI.DataField',
//     Value : Status_ID,
// },
// {
//     $Type : 'UI.DataField',
//     Value : TAX_AMOUNT,
// },
// {
//     $Type : 'UI.DataField',
//     Value : CURRENCY_code,
// },
//],
// }
//    UI.ValueList: {
//         entity: 'RequestHeader',
//         valueListEntity: 'RequestHeader',
//         value: 'RequestDescr', // Field to display in the value list
//         text: 'RequestDescr'   // The text to show in the suggestion list
//     }


);

// annotate service.POs with {
//     PARTNER_GUID@(
//         Common : {
//             Text : PARTNER_GUID.COMPANY_NAME,
//          },
//          ValueList.entity: CatalogService.BusinessPartnerSet
//     );
//     OVERALL_STATUS@(readonly,
//     )
// };


// annotate service.POItems with {
//     PRODUCT_GUID@(
//         Common : {
//             Text : PRODUCT_GUID.DESCRIPTION,
//          },
//          ValueList.entity: CatalogService.ProductSet
//     )
// };

// @cds.odata.valuelist
// annotate service.Request_Header with @(
//     UI.Identification:[{
//         $Type : 'UI.DataField',
//         Value : RequestDescr,
//     }]
// );

// @cds.odata.valuelist
// annotate service.ProductSet with @(
//     UI.Identification:[{
//         $Type : 'UI.DataField',
//         Value : DESCRIPTION,
//     }]
// );

// @cds.odata.valuelist
// annotate service.Request_Header with @(
//     UI.Identification:[{
//         $Type : 'UI.DataField',
//         Value : RequestDescr,
//     }]
// );


annotate service.RequestHeaders {
    reqdesc @Common.ValueList: {
        CollectionPath: 'RequestHeaders',
        Label         : '',
        Parameters    : [{
            $Type            : 'Common.ValueListParameterInOut',
            LocalDataProperty: reqdesc,
            ValueListProperty: 'reqdesc'
        },
        //{$Type: 'Common.ValueListParameterOut', LocalDataProperty: RequestDescr, ValueListProperty: 'RequestDescr'},

        ]
    }
}

annotate service.RequestItems {
    material @(
        Common.ValueList               : {
            CollectionPath: 'Materials',
            Label         : '',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: 'material_MID',
                ValueListProperty: 'MID'
            }, ]
        },
        // Common.Text                    : material_MID,
        // Common.ValueListWithFixedValues: true,
    )

};

annotate service.RequestItems {
    plant @(
        Common.ValueList               : {
            CollectionPath: 'Plants',
            Label         : '',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: 'plant_Plant',
                ValueListProperty: 'Plant' 
            }, ]
        },
        // Common.Text                    : plant_Plant,
        // Common.ValueListWithFixedValues: true,
    )

};
// annotate service.RequestItems @(Common : {
//     SideEffects #ProductChanged  : {
//         SourceProperties : ['itemno'],
//         TargetProperties : ['unitprice', 'netprice']
//     }
// });
// annotate service.RequestItems @(Common : {
//     SideEffects #QuantityChanged : {
//         SourceProperties : ['quantity'],
//         TargetProperties : ['netprice']
//     }
// });
// annotate service.RequestHeaders @(Common : {
//     SideEffects #ItemChanged     : {
//         SourceEntities   : [items],
//         TargetProperties : ['totalprice']
//     }
// });

// annotate service.RequestHeaders with actions{  sendforapproval @Core.OperationAvailable: {  $edmJson: {$Gt: [{$Path: 'in/status'}, 'Waiting']}};
  
// };

// annotate service.RequestHeaders with actions{  sendforapproval @Core.OperationAvailable: disableUpdation;
// //   ta_lr_inlineIconAction  @Core.OperationAvailable: {    $edmJson: {$Gt: [{$Path: 'totalAmount'}, 1000]}};
// //   ta_lr_toolbarAction @Core.OperationAvailable: disableUpdation;
// };
// annotate service.RequestHeaders with @(UI.Identification : [ 
//   {
//     $Type : 'UI.DataFieldForAction', 
//     Label : 'Set to In Process', 
//     Action : 'MyService.EntityContainer/responsefrombpa', 
//     ![@UI.Hidden] : {$edmJson : {$Ne : [{$Path : 'status'}, 'approved']}} 
//   }, 
// ]);