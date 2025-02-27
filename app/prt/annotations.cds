// using MyService as service from '../../srv/service';
// annotate service.RequestHeaders @(
//     UI.UpdateHidden : {$edmJson: {$Or: [
//         {$Eq: [{$Path: 'status'}, 'approved']},
//         {$Eq: [{$Path: 'status'}, 'InApproval']}
//     ]}},

//     UI.DeleteHidden : {$edmJson: {$Or: [
//         {$Eq: [{$Path: 'status'}, 'approved']},
//         {$Eq: [{$Path: 'status'}, 'InApproval']}
//     ]}},
// //   ![@UI.Hidden] : {$edmJson : {$Ne : [{$Path : 'status'}, 'approved']}},



//     UI.SelectionFields: [
//         reqdesc,
//         reqno,
//         status
//     ],

//     UI.LineItem       : [
//         {
//             $Type: 'UI.DataField',
//             Label: 'Request Number',
//             Value: reqno,
//         },

//         {
//             $Type: 'UI.DataField',
//             Label: 'Request Description',
//             Value: reqdesc,
//         },
//         {
//             $Type: 'UI.DataField',
//             Label: 'Total Price',
//             Value: totalprice,

//         },
//         {
//             $Type: 'UI.DataField',
//             Label: 'Currency',
//             Value: Currency_code,

//         },

//         {
//             $Type: 'UI.DataField',
//             Label: 'Status',
//             Value: status,
//         },

//         {
//             $Type: 'UI.DataField',
//             Value: createdBy,
//         },
//         {
//             $Type: 'UI.DataField',
//             Label: 'Material',
//             Value: items.material_MID,
//         },
//         {
//             $Type: 'UI.DataField',
//             Label: 'PR',
//             Value: prnumber,
//         },
//     ],

//     UI.HeaderInfo     : {
//         TypeName      : 'Request1',
//         TypeNamePlural: 'Request',
//         Title         : {Value: reqdesc},
//         Description   : {Value: reqno}
//     },
//     UI.Facets         : [
//         {
//             $Type : 'UI.CollectionFacet',
//             Label : 'General Information',
//             Facets: [{
//                 $Type : 'UI.ReferenceFacet',
//                 Label : 'Item Details',
//                 Target: '@UI.Identification'
//             }
//             ],
//         },
//         {
//             $Type : 'UI.ReferenceFacet',
//             Label : 'Items',
//             Target: 'items/@UI.LineItem'
//         },
//     ],
//     UI.Identification : [
        

//         {
//             $Type      : 'UI.DataFieldForAction',
//             Action     : 'MyService.sendforapproval',
//             Label      : 'Sendforapproval',
//             Criticality: #Neutral,
//             // ![@UI.Hidden] : {$edmJson : {$Eq : [{$Path : 'status'}, 'approved']}},
//             @UI.Hidden : {$edmJson: {$Or: [
//         {$Eq: [{$Path: 'status'}, 'approved']},
//         {$Eq: [{$Path: 'status'}, 'InApproval']}
//     ]}}

//             // ![@UI.Hidden] : {$edmJson : {$Eq : [{$Path : 'status'}, 'InApproval']}}

//         },
//         {
//             $Type: 'UI.DataField',
//             Label: 'Request Number',
//             Value: reqno,
//         },
//         {
//             $Type: 'UI.DataField',
//             Label: 'Request Description',
//             Value: reqdesc,
//         },
//         {
//             $Type: 'UI.DataField',
//             Label: 'Total Price',
//             Value: totalprice,
//         },
//         {
//             $Type: 'UI.DataField',
//             Label: 'Currency',
//             Value: Currency_code,

//         },
//         {
//             $Type: 'UI.DataField',
//             Label: 'createdBy',
//             Value: createdBy,
//         },
//         {
//             $Type: 'UI.DataField',
//             Value: createdAt,
//         },
//         {
//             $Type: 'UI.DataField',
//             Value: modifiedBy,
//         },
//         {
//             $Type: 'UI.DataField',
//             Label: 'Status',
//             Value: status,
//         },
//         {
//             $Type: 'UI.DataField',
//             Label: 'PR',
//             Value: prnumber,
//         }
//     ],
// );
// annotate service.RequestItems with @(
//     UI.LineItem      : [
//         {
//             $Type: 'UI.DataField',
//             Label: 'Request Number',
//             Value: RequestHeaders_reqno,
//         },
//         {
//             $Type: 'UI.DataField',
//             Label: 'ID',
//             Value: ID,
//         },
//         {
//             $Type: 'UI.DataField',
//             Label: 'Item Number',
//             Value: itemno,
//         },
//         {
//             $Type: 'UI.DataField',
//             Label: 'Item Description',
//             Value: itemdescr,
//         },
//         {
//             $Type: 'UI.DataField',
//             Label: 'Quantity',
//             Value: quantity,
//         },
//         {
//             $Type: 'UI.DataField',
//             Label: 'Unit price',
//             Value: unitprice,
//         },
//         {
//             $Type: 'UI.DataField',
//             Label: 'Net price',
//             Value: netprice,
//         },

//         {
//             $Type: 'UI.DataField',
//             Label: 'Material',
//             Value: material_MID,
//         },
//         {
//             $Type: 'UI.DataField',
//             Label: 'Plant',
//             Value: plant_Plant,
//         }
//     ],

//     UI.Facets        : [{
//         $Type : 'UI.CollectionFacet',
//         Label : 'General Information',
//         Facets: [{
//             $Type : 'UI.ReferenceFacet',
//             Label : 'Itemms',
//             Target: '@UI.Identification'
//         },
//         ],
//     }, ],
//     UI.Identification: [
        
//         {
//             $Type: 'UI.DataField',
//             Label: 'Item Number',
//             Value: itemno,
//         },
//         {
//             $Type: 'UI.DataField',
//             Label: 'Description',
//             Value: itemdescr,
//         },
//         {
//             $Type: 'UI.DataField',
//             Label: 'Price',
//             Value: unitprice,
//         },
//         {
//             $Type: 'UI.DataField',
//             Label: 'createdBy',
//             Value: createdBy,
//         },
//         {
//             $Type: 'UI.DataField',
//             Value: createdAt,
//         },
//         {
//             $Type: 'UI.DataField',
//             Label: 'Request Number',
//             Value: RequestHeaders_reqno,
//         },
//         {
//             $Type: 'UI.DataField',
//             Label: 'Material',
//             Value: material_MID,
//         },
//         {
//             $Type: 'UI.DataField',
//             Label: 'Net price',
//             Value: netprice,
//         },
//         {
//             $Type: 'UI.DataField',
//             Label: 'Quantity',
//             Value: quantity,
//         },
//         {
//             $Type: 'UI.DataField',
//             Label: 'Plant',
//             Value: plant_Plant,
//         }
//     ],
// );
// annotate service.RequestHeaders {
//     reqdesc @Common.ValueList: {
//         CollectionPath: 'RequestHeaders',
//         Label         : '',
//         Parameters    : [{
//             $Type            : 'Common.ValueListParameterInOut',
//             LocalDataProperty: reqdesc,
//             ValueListProperty: 'reqdesc'
//         },
//         //{$Type: 'Common.ValueListParameterOut', LocalDataProperty: RequestDescr, ValueListProperty: 'RequestDescr'},
//         ]
//     }
// }
// annotate service.RequestItems {
//     material @(
//         Common.ValueList               : {
//             CollectionPath: 'Materials',
//             Label         : '',
//             Parameters    : [{
//                 $Type            : 'Common.ValueListParameterInOut',
//                 LocalDataProperty: 'material_MID',
//                 ValueListProperty: 'MID'
//             }, ]
//         },
//     )

// };

// annotate service.RequestItems {
//     plant @(
//         Common.ValueList               : {
//             CollectionPath: 'Plants',
//             Label         : '',
//             Parameters    : [{
//                 $Type            : 'Common.ValueListParameterInOut',
//                 LocalDataProperty: 'plant_Plant',
//                 ValueListProperty: 'Plant' 
//             }, ]
//         },
//     )

// };
// // annotate service.RequestItems @(Common : {
// //     SideEffects #ProductChanged  : {
// //         SourceProperties : ['itemno'],
// //         TargetProperties : ['unitprice', 'netprice']
// //     }
// // });
// // annotate service.RequestItems @(Common : {
// //     SideEffects #QuantityChanged : {
// //         SourceProperties : ['quantity'],
// //         TargetProperties : ['netprice']
// //     }
// // });
// // annotate service.RequestHeaders @(Common : {
// //     SideEffects #ItemChanged     : {
// //         SourceEntities   : [items],
// //         TargetProperties : ['totalprice']
// //     }
// // });

// // annotate service.RequestHeaders with actions{  sendforapproval @Core.OperationAvailable: {  $edmJson: {$Gt: [{$Path: 'in/status'}, 'Waiting']}};
  
// // };

// // annotate service.RequestHeaders with actions{  sendforapproval @Core.OperationAvailable: disableUpdation;
// // //   ta_lr_inlineIconAction  @Core.OperationAvailable: {    $edmJson: {$Gt: [{$Path: 'totalAmount'}, 1000]}};
// // //   ta_lr_toolbarAction @Core.OperationAvailable: disableUpdation;
// // };
// // annotate service.RequestHeaders with @(UI.Identification : [ 
// //   {
// //     $Type : 'UI.DataFieldForAction', 
// //     Label : 'Set to In Process', 
// //     Action : 'MyService.EntityContainer/responsefrombpa', 
// //     ![@UI.Hidden] : {$edmJson : {$Ne : [{$Path : 'status'}, 'approved']}} 
// //   }, 
// // ]);

using MyService as service from '../../srv/service';
annotate service.RequestHeaders @(
    UI.UpdateHidden : {$edmJson: {$Or: [
        {$Eq: [{$Path: 'status'}, 'approved']},
        {$Eq: [{$Path: 'status'}, 'InApproval']}
    ]}},

    UI.DeleteHidden : {$edmJson: {$Or: [
        {$Eq: [{$Path: 'status'}, 'approved']},
        {$Eq: [{$Path: 'status'}, 'InApproval']}
    ]}},
//   ![@UI.Hidden] : {$edmJson : {$Ne : [{$Path : 'status'}, 'approved']}},



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
            Label: 'PR number',
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
        

        {
            $Type      : 'UI.DataFieldForAction',
            Action     : 'MyService.sendforapproval',
            Label      : 'Sendforapproval',
            Criticality: #Neutral,
            // ![@UI.Hidden] : {$edmJson : {$Eq : [{$Path : 'status'}, 'approved']}},
            @UI.Hidden : {$edmJson: {$Or: [
        {$Eq: [{$Path: 'status'}, 'approved']},
        {$Eq: [{$Path: 'status'}, 'InApproval']}
    ]}}

            // ![@UI.Hidden] : {$edmJson : {$Eq : [{$Path : 'status'}, 'InApproval']}}

        },
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
            Label: 'PR number',
            Value: prnumber,
        }
    ],
);
annotate service.RequestItems with @(
    UI.LineItem      : [
        // {
        //     $Type: 'UI.DataField',
        //     Label: 'Request Number',
        //     Value: RequestHeaders_ID,
        // },
        // {
        //     $Type: 'UI.DataField',
        //     Label: 'ID',
        //     Value: ID,
        // },
        {
            $Type: 'UI.DataField',
            Label: 'Item Number',
            Value: itemno,
        },
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
        // {
        //     $Type: 'UI.DataField',
        //     Label: 'Request Number',
        //     Value: RequestHeaders_ID,
        // },
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
        },
        {
            $Type: 'UI.DataField',
            Label: 'Unit of measure',
            Value: uom,
        }
    ],
);
// annotate service.RequestHeaders {
//     reqdesc @Common.ValueList: {
//         CollectionPath: 'RequestHeaders',
//         Label         : '',
//         Parameters    : [{
//             $Type            : 'Common.ValueListParameterInOut',
//             LocalDataProperty: reqdesc,
//             ValueListProperty: 'reqdesc'
//         },
//         //{$Type: 'Common.ValueListParameterOut', LocalDataProperty: RequestDescr, ValueListProperty: 'RequestDescr'},
//         ]
//     }
// }
annotate service.RequestItems {
    material @(
        Common.ValueList               : {
            CollectionPath: 'Materials',
            Label         : '',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: 'material_MID',
                ValueListProperty: 'MID'
            }, 
            {
                $Type            : 'Common.ValueListParameterOut',
                LocalDataProperty: uom,
                ValueListProperty: 'unit'
            }
            
            ]
        },
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
    )

};
annotate service.RequestItems @(Common : {
    SideEffects #Materialchanged  : {
        SourceProperties : ['material_MID'],
        TargetProperties : ['unitprice','netprice']
    }
});
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