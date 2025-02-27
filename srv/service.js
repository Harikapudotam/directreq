// const cds = require('@sap/cds');
// const axios = require('axios');
// module.exports = cds.service.impl(async function (srv) {
//   const prod_api = await cds.connect.to('OP_API_PRODUCT_SRV_0001');
//   const plant_api = await cds.connect.to('API_PLANT_SRV');
//   const { Materials, RequestHeaders, Plants, RequestItems} = srv.entities;
//   srv.on("READ", Plants, async (req) => {
//     try {
//       req.query.where("Plant <> '' ");
//       req.query.SELECT.count = false; 
//       console.log("Running query:");
//       const response = await plant_api.run(req.query);
//       console.log("Response from plant_api:");
//       return response;
//     } catch (error) {
//       console.error("Error occurred while querying the external service:", error);
//       throw new Error("Failed to retrieve data from the external service.");
//     }
//   });
//   srv.on("READ", Materials, async (req) => {
//     try {
      
//       req.query.where("Product <> '' ");
//       req.query.SELECT.count = false; 

      
//       console.log("Running query:");

      
//       const response = await prod_api.run(req.query);

     
//       console.log("Response from prod_api:");

//       return response;

//     } catch (error) {
      
//       console.error("Error occurred while querying the external service:", error);

      
//       throw new Error("Failed to retrieve data from the external service.");
//     }
//   });
//   srv.after("READ", RequestHeaders, async (results) => {
//     results.forEach(header => {
//       if (header.status === "approved") {
//           delete header["sendforapproval"];
//       }
//   });
// });
//   srv.before('CREATE', RequestHeaders, async (req) => {
//     const { maxNumber } = await SELECT.one`max(reqno) as maxNumber`.from(RequestHeaders);
//     let iNewNo = (!maxNumber ? 10000000 : Number(maxNumber) + 1);
//     req.data.reqno = iNewNo;
//     req.data.status = "New";
//   });
//   srv.before('NEW','RequestHeaders.drafts' , async (req) => {
//     console.log("drafts herer");
//     const { maxNumber } = await SELECT.one`max(reqno) as maxNumber`.from(RequestHeaders);
//     const { norm } = await SELECT.one`max(reqno) as maxNumber`.from(RequestHeaders.drafts);
//     console.log("maxnum",maxNumber);
//    // console.log("norm",norm);

//     let iNewNo = (!maxNumber ? Number(norm)+1: Number(maxNumber) + 1);
//     req.data.reqno = iNewNo;
//   });
//   srv.before('NEW', 'RequestItems.drafts',async (req) => {
//     const reqno = req.params[0]?.reqno || req.data.reqno;
//     const maxItem = await SELECT.one
//       .from(RequestItems)
//       .columns('itemno')
//       .where({ RequestHeaders_reqno: reqno})  // Filter by reqno
//       .orderBy('itemno desc');
    
//       const dmaxItem = await SELECT.one
//       .from(RequestItems.drafts)
//       .columns('itemno')
//       .where({ RequestHeaders_reqno: reqno})  // Filter by reqno
//       .orderBy('itemno desc');
//       console.log('max',maxItem);
//       if (dmaxItem != 0){
      
//         let inew = (!(dmaxItem?.itemno )? 10 : dmaxItem?.itemno+10);
//         req.data.itemno = inew;
//         }
//         else{
//           let inew = (!(maxItem?.itemno )? 10 : maxItem?.itemno+10);
//           req.data.itemno = inew;
//         }
//       // console.log('inew',inew);
//   });
//   srv.before('CREATE', RequestItems,async (req) => {
//     // const { reqno } = req.data;  
//     const reqno = req.params[0]?.reqno || req.data.reqno;
//     const maxItem = await SELECT.one
//       .from(RequestItems)
//       .columns('itemno')
//       .where({ RequestHeaders_reqno: reqno})
//       .orderBy('itemno desc');
    
//       const dmaxItem = await SELECT.one
//       .from(RequestItems.drafts)
//       .columns('itemno')
//       .where({ RequestHeaders_reqno: reqno}) 
//       .orderBy('itemno desc');
//       console.log('max',maxItem);
//       if (dmaxItem != 0){
      
//       let inew = (!(dmaxItem?.itemno )? 10 : dmaxItem?.itemno+10);
//       req.data.itemno = inew;
//       }
//       else{
//         let inew = (!(maxItem?.itemno )? 10 : maxItem?.itemno+10);
//         req.data.itemno = inew;
//       }
//       console.log('inew',inew);
      
//   });
//   srv.before(['CREATE','UPDATE','DELETE'], RequestHeaders, async (req) => {
//     // Check if items are part of the payload

//     if (req.data.items && Array.isArray(req.data.items)) {
//       // Loop through each item in the composition and calculate netprice
//       let totalprice = 0;
//       for (let item of req.data.items) {
//         const { quantity, unitprice } = item;

//         if (quantity != null && unitprice != null) {
//           // Calculate netprice for each item
//           item.netprice = quantity * unitprice;
//           totalprice += item.netprice;
//         } else {
//           req.error(400, 'Both quantity and unit price are required for net price calculation.');
//         }
//       }
//       req.data.totalprice = totalprice;
//     }
//   });
//   srv.on('sendforapproval', async (req) => {
//     const payload_bpa_header = await SELECT.from(RequestHeaders).where({ reqno: req.params[0].reqno });
//     const payload_bpa_items = await SELECT.from(RequestItems).where({ RequestHeaders_reqno: req.params[0].reqno });
//     const bpa_destinations = await cds.connect.to('bpa_destination');
//     console.log(req.params[0].reqno);
//     let payload = {
//       "definitionId": "us10.buyerportalpoc-aeew31u1.directrequisitiont3copy.approval",
//       "context": {
//           "request": {
//               "Request": {
//                   "RequestNo": payload_bpa_header[0]?.reqno,
//                   "RequestDesc": payload_bpa_header[0]?.reqdesc,
//                   "RequestBy": payload_bpa_header[0]?.createdBy,
//                   "RequestId": "1",
//                   "TotalPrice":payload_bpa_header[0]?.totalprice,
//                   "RequestItem": payload_bpa_items.map(items => ({
//                   "itemNo": items.itemno,
//                   "quantity": items.quantity,
//                   "itemDesc": items.itemdescr,
//                   "itemPrice": items.netprice,
//                   "material": items.material_MID,
//                   "plant": items.plant_Plant,
//               }))
//           }
//       }
//     }
//   };
//   if (payload_bpa_header[0]?.status != 'approved' || payload_bpa_header[0]?.status != 'InApproval'){
//   let oResult = await bpa_destinations.post('/workflow/rest/v1/workflow-instances',payload);
//   }
//   await UPDATE(RequestHeaders)
//         .set({ status: 'InApproval' })
//         .where({ reqno: payload_bpa_header[0]?.reqno });

//   });

//   srv.on('responsefrombpa',async(req)=>{
//     console.log(req.data.status);
//     if (req.data.status === "approved") {
//     const payload_bpa_header = await SELECT.from(RequestHeaders).where({ reqno: req.data.reqno });
//     const payload_bpa_items = await SELECT.from(RequestItems).where({ RequestHeaders_reqno: req.data.reqno });
//     //const destinationUrl = 'https://ustcpi.test.apimanagement.us10.hana.ondemand.com:443/direct/requisition';
//       await UPDATE(RequestHeaders)
//       .with({ status: 'approved' , insertrestrictions: 1})
//       .where({ reqno: req.data.reqno });
//       const headers = {
//         'Content-Type': 'application/json',
//     };
//    const destinationurl = 'https://ustcpi.test.apimanagement.us10.hana.ondemand.com:443/api/direct'
//    if (payload_bpa_items.length){
//     const payload = {
//      "RequestHeaders": {
//          "prtype": "NB",
//          "reqdesc": payload_bpa_header[0]?.reqdesc,
//          "items": {
//              "RequestItems": payload_bpa_items.map(items => ({
  
//                      "itemno": items.itemno,
//                      "itemdescr": items.itemdescr,
//                      "prgroup": "002",
//                      "material_MID": "MTAMC4",
//                      "quantity": items.quantity.toString(),
//                      "unitprice": items.unitprice.toString(),
//                      "netprice": items.netprice.toString(),
//                      "uom": "EA",
//                      "plant_Product": "MT01"
//                  }))
//          }
//      }
//   };
//    try {
//      const response = await axios.post(destinationurl, payload, headers );
//      let result = response.data;
//      await UPDATE(RequestHeaders)
//        .set({ prnumber: result.match(/\d+/)[0] })
//        .where({ reqno: req.data.reqno });
//    } catch (error) {
//      console.error('Error triggering iFlow:', error.message);
//      throw new Error('Failed to trigger iFlow');
//    }
//  }
//  else{
//    const payload = {
//      "RequestHeaders":{
//          "prtype": "NB",
//          "reqdesc": payload_bpa_header[0]?.reqdesc,
//          "items": {
//              "RequestItems": [
//              {
//                  "itemno": 2,
//                  "itemdescr": "Pens Pack",
//                  "prgroup": "002",
//                  "material_MID": "MTAMC4",
//                  "quantity": 10,
//                  "unitprice": "2",
//                  "netprice":"2345",
//                  "uom": "EA",
//                  "plant_Product": "MT01"
//              }
//    ]
//  }}
//      }
//      try {
//        const response = await axios.post(destinationurl, payload, headers );
//        console.log('iFlow triggered successfully:', response.data);
//        let result = response.data;
//        await UPDATE(RequestHeaders)
//          .set({ prnumber: result.match(/\d+/)[0] })
//          .where({ reqno: req.data.reqno });
//      } catch (error) {
//        console.error('Error triggering iFlow:', error.message);
//        throw new Error('Failed to trigger iFlow');
//      }
   
//  } 
//   }
//   });
//   srv.on('rejected',async(req)=>{
//     console.log(req.data.status);
//     if (req.data.status === "rejected") {
//       await UPDATE(RequestHeaders)
//         .set({ status: 'Rejected' })
//         .where({ reqno: req.data.reqno });
//     }
//   })
//   //local testing for IFLOW
//   srv.on('triggerIFlow',async(req)=>{
//     const headers = {
//          'Content-Type': 'application/json',
//      };
//      const payload_bpa_header = await SELECT.from(RequestHeaders).where({ reqno: 103 });
//      const payload_bpa_items = await SELECT.from(RequestItems).where({ RequestHeaders_reqno :103 });
//      const { maxNum } = await SELECT.one`max(itemno) as maxNumber`.from(RequestItems).where({ RequestHeaders_reqno : 103 });
//      console.log(maxNum);
//      console.log(payload_bpa_header);
//      console.log(payload_bpa_items);
//      console.log(payload_bpa_header.length);
//     const destinationurl = 'https://ustcpi.test.apimanagement.us10.hana.ondemand.com:443/api/direct'
//     if (payload_bpa_items.length){
//      const payload = {
//       "RequestHeaders": {
//           "prtype": "NB",
//           "reqdesc": payload_bpa_header[0]?.reqdesc,
//           "items": {
//               "RequestItems": payload_bpa_items.map(items => ({
   
//                       "itemno": items.itemno,
//                       "itemdescr": items.itemdescr,
//                       "prgroup": "002",
//                       "material_MID": "MTAMC4",
//                       "quantity": items.quantity.toString(),
//                       "unitprice": items.unitprice.toString(),
//                       "netprice": items.netprice.toString(),
//                       "uom": "EA",
//                       "plant_Product": "MT01"
//                   }))
//           }
//       }
//    };
    
   
//     try {
//       // Make the POST request to the iFlow
//       const response = await axios.post(destinationurl, payload, headers );

//       console.log('iFlow triggered successfully:', response.data);
//       let result = response.data;
//       await UPDATE(RequestHeaders)
//         .set({ prnumber: result.match(/\d+/)[0] })
//         .where({ reqno: 101 });
//     } catch (error) {
//       console.error('Error triggering iFlow:', error.message);
//       throw new Error('Failed to trigger iFlow');
//     }
//   }
//   else{
//     const payload = {
//       "RequestHeaders":{
//           "prtype": "NB",
//           "reqdesc": payload_bpa_header[0]?.reqdesc,
//           "items": {
//               "RequestItems": [
//               {
//                   "itemno": 2,
//                   "itemdescr": "Pens Pack",
//                   "prgroup": "002",
//                   "material_MID": "MTAMC4",
//                   "quantity": 10,
//                   "unitprice": "2",
//                   "netprice":"2345",
//                   "uom": "EA",
//                   "plant_Product": "MT01"
//               }
//     ]
//   }}
//       }
//       try {
//         // Make the POST request to the iFlow
//         const response = await axios.post(destinationurl, payload, headers );
  
//         console.log('iFlow triggered successfully:', response.data);
//         let result = response.data;
//         await UPDATE(RequestHeaders)
//           .set({ prnumber: result.match(/\d+/)[0] })
//           .where({ reqno: 101 });
//       } catch (error) {
//         console.error('Error triggering iFlow:', error.message);
//         throw new Error('Failed to trigger iFlow');
//       }
    
//   }
//     });
  
// });

const cds = require('@sap/cds');
const axios = require('axios');
module.exports = cds.service.impl(async function (srv) {
  const prod_api = await cds.connect.to('OP_API_PRODUCT_SRV_0001');
  const plant_api = await cds.connect.to('API_PLANT_SRV');
  const { Materials, RequestHeaders, Plants, RequestItems} = srv.entities;
  srv.on("READ", Plants, async (req) => {
    try {
      req.query.where("Plant <> '' ");
      req.query.SELECT.count = false; 
      console.log("Running query:");
      const response = await plant_api.run(req.query);
      console.log("Response from plant_api:");
      return response;
    } catch (error) {
      console.error("Error occurred while querying the external service:", error);
      throw new Error("Failed to retrieve data from the external service.");
    }
  });
  srv.on("READ", Materials, async (req) => {
    try {
      
      req.query.where("Product <> '' ");
      req.query.SELECT.count = false; 

      
      console.log("Running query:");

      
      const response = await prod_api.run(req.query);

     
      console.log("Response from prod_api:");

      return response;

    } catch (error) {
      
      console.error("Error occurred while querying the external service:", error);

      
      throw new Error("Failed to retrieve data from the external service.");
    }
  });
  srv.before('CREATE', RequestHeaders, async (req) => {
    const { maxNumber } = await SELECT.one`max(reqno) as maxNumber`.from(RequestHeaders);
    let iNewNo = (!maxNumber ? 10000000 : Number(maxNumber) + 1);
    req.data.reqno = iNewNo;
    req.data.status = 'New';
  });
  srv.before('NEW','RequestHeaders.drafts' , async (req) => {
//     console.log("drafts herer");
//     const { maxNumber } = await SELECT.one`max(reqno) as maxNumber`.from(RequestHeaders);
//     const { norm } = await SELECT.one`max(reqno) as maxNumber`.from(RequestHeaders.drafts);
//     console.log("maxnum",maxNumber);
//    // console.log("norm",norm);

//     let iNewNo = (!maxNumber ? Number(norm)+1: Number(maxNumber) + 1);
//     req.data.reqno = iNewNo;
const { maxNumber } = await SELECT.one`max(reqno) as maxNumber`.from(RequestHeaders);
    let iNewNo = (!maxNumber ? 10000000 : Number(maxNumber) + 1);
    req.data.reqno = iNewNo;

  });
  srv.before('NEW', 'RequestItems.drafts',async (req) => {
    const reqno = req.params[0]?.ID || req.data.ID;
    const maxItem = await SELECT.one
      .from(RequestItems)
      .columns('itemno')
      .where({ RequestHeaders_ID: reqno})  // Filter by reqno
      .orderBy('itemno desc');
    
      const dmaxItem = await SELECT.one
      .from(RequestItems.drafts)
      .columns('itemno')
      .where({ RequestHeaders_ID: reqno})  // Filter by reqno
      .orderBy('itemno desc');
      console.log('max',maxItem);
      if (dmaxItem != 0){
      
        let inew = (!(dmaxItem?.itemno )? 10 : dmaxItem?.itemno+10);
        req.data.itemno = inew;
        }
        else{
          let inew = (!(maxItem?.itemno )? 10 : maxItem?.itemno+10);
          req.data.itemno = inew;
        }
      // console.log('inew',inew);
  });
  srv.before('CREATE', RequestItems,async (req) => {
    // const { reqno } = req.data;  
    const reqno = req.params[0]?.ID || req.data.ID;
    const maxItem = await SELECT.one
      .from(RequestItems)
      .columns('itemno')
      .where({ RequestHeaders_ID: reqno})
      .orderBy('itemno desc');
    
      const dmaxItem = await SELECT.one
      .from(RequestItems.drafts)
      .columns('itemno')
      .where({ RequestHeaders_ID: reqno}) 
      .orderBy('itemno desc');
      console.log('max',maxItem);
      if (dmaxItem != 0){
      
      let inew = (!(dmaxItem?.itemno )? 10 : dmaxItem?.itemno+10);
      req.data.itemno = inew;
      }
      else{
        let inew = (!(maxItem?.itemno )? 10 : maxItem?.itemno+10);
        req.data.itemno = inew;
      }
      console.log('inew',inew);
      
  });
  srv.before(['CREATE','UPDATE','DELETE'], RequestHeaders, async (req) => {
    // Check if items are part of the payload

    if (req.data.items && Array.isArray(req.data.items)) {
      // Loop through each item in the composition and calculate netprice
      let totalprice = 0;
      for (let item of req.data.items) {
        const { quantity, unitprice } = item;

        if (quantity != null && unitprice != null) {
          // Calculate netprice for each item
          item.netprice = quantity * unitprice;
          totalprice += item.netprice;
        } else {
          req.error(400, 'Both quantity and unit price are required for net price calculation.');
        }
      }
      req.data.totalprice = totalprice;
    }
  });
  srv.on('sendforapproval', async (req) => {
    
    console.log(req.params[0].ID);
    const payload_bpa_header = await SELECT.from(RequestHeaders).where({ ID: req.params[0].ID });
    console.log(payload_bpa_header);
    console.log(payload_bpa_header[0]?.ID);
    const payload_bpa_items = await SELECT.from(RequestItems).where({ RequestHeaders_ID: req.params[0].ID });
    console.log(payload_bpa_items);
//   const bpa_destinations = await cds.connect.to('bpa_destination');
    let payload = {
      "definitionId": "us10.buyerportalpoc-aeew31u1.directrequisitiont3copy.approval",
      "context": {
          "request": {
              "Request": {
                  "RequestNo": payload_bpa_header[0]?.reqno,
                  "RequestDesc": payload_bpa_header[0]?.reqdesc,
                  "RequestBy": payload_bpa_header[0]?.createdBy,
                  "RequestId": payload_bpa_header[0]?.ID,
                  "TotalPrice":payload_bpa_header[0]?.totalprice,
                  "RequestItem": payload_bpa_items.map(items => ({
                  "itemNo": items.itemno,
                  "quantity": items.quantity,
                  "itemDesc": items.itemdescr,
                  "itemPrice": items.netprice,
                  "material": items.material_MID,
                  "plant": items.plant_Plant,
              }))
          }
      }
    }
  };

//   console.log(payload);
//   console.log(payload_bpa_header[0]?.reqno);
//   // if (payload_bpa_header[0]?.status != 'approved' || payload_bpa_header[0]?.status != 'InApproval'){
//   let oResult = await bpa_destinations.post('/workflow/rest/v1/workflow-instances',payload);
//   // console.log('inside if');  
// // }
//   await UPDATE(RequestHeaders)
//         .set({ status: 'InApproval' })
//         .where({ ID : req.params[0].ID  });

const bpa_destinations = await cds.connect.to('bpa_destination');
  //   let payload = {
  //     "definitionId": "us10.buyerportalpoc-aeew31u1.directrequisitiont3copy.approval",
  //     "context": {
  //         "request": {
  //             "Request": {
  //                 "RequestNo": payload_bpa_header[0]?.reqno,//ok
  //                 "RequestDesc": payload_bpa_header[0]?.reqdesc,//ok
  //                 "RequestBy": payload_bpa_header[0]?.createdBy,//ok
  //                 "RequestId": payload_bpa_header[0]?.ID,
  //                 "TotalPrice":payload_bpa_header[0]?.totalprice,
  //                 "RequestItem": [{
  //                 "itemNo": 10,
  //                 "quantity": 100,
  //                 "itemDesc": "isrhbv",
  //                 "itemPrice": 89047,
  //                 "material": "MT01",
  //                 "plant": "P01",
  //                 }]
  //         }
  //     }
  //   }
  // };

  console.log(payload);
  console.log(payload_bpa_header[0]?.reqno);
  // if (payload_bpa_header[0]?.status != 'approved' || payload_bpa_header[0]?.status != 'InApproval'){
  let oResult = await bpa_destinations.post('/workflow/rest/v1/workflow-instances',payload);
  // console.log('inside if');  
// }
  await UPDATE(RequestHeaders)
        .set({ status: 'InApproval' })
        .where({ ID : req.params[0].ID  });

  });

  srv.on('responsefrombpa',async(req)=>{
    console.log(req.data.status);
    if (req.data.status === "approved") {
    const payload_bpa_header = await SELECT.from(RequestHeaders).where({ reqno: req.data.reqno });
    const payload_bpa_items = await SELECT.from(RequestItems).where({ RequestHeaders_ID: payload_bpa_header[0]?.ID });
    //const destinationUrl = 'https://ustcpi.test.apimanagement.us10.hana.ondemand.com:443/direct/requisition';
      await UPDATE(RequestHeaders)
      .with({ status: 'approved' , insertrestrictions: 1})
      .where({ reqno: req.data.reqno });
      const headers = {
        'Content-Type': 'application/json',
    };
   const destinationurl = 'https://ustcpi.test.apimanagement.us10.hana.ondemand.com:443/api/direct'
   if (payload_bpa_items.length){
    const payload = {
     "RequestHeaders": {
         "prtype": "NB",
         "reqdesc": payload_bpa_header[0]?.reqdesc,
         "items": {
             "RequestItems": payload_bpa_items.map(items => ({
  
                     "itemno": items.itemno,
                     "itemdescr": items.itemdescr,
                     "prgroup": "002",
                     "material_MID": "MTAMC4",
                     "quantity": items.quantity.toString(),
                     "unitprice": items.unitprice.toString(),
                     "netprice": items.netprice.toString(),
                     "uom": "EA",
                     "plant_Product": "MT01"
                 }))
         }
     }
  };
   try {
     const response = await axios.post(destinationurl, payload, headers );
     let result = response.data;
     await UPDATE(RequestHeaders)
       .set({ prnumber: result.match(/\d+/)[0] })
       .where({ reqno: req.data.reqno });
   } catch (error) {
     console.error('Error triggering iFlow:', error.message);
     throw new Error('Failed to trigger iFlow');
   }
 }
 else{
   const payload = {
     "RequestHeaders":{
         "prtype": "NB",
         "reqdesc": payload_bpa_header[0]?.reqdesc,
         "items": {
             "RequestItems": [
             {
                 "itemno": 2,
                 "itemdescr": "Pens Pack",
                 "prgroup": "002",
                 "material_MID": "MTAMC4",
                 "quantity": 10,
                 "unitprice": "2",
                 "netprice":"2345",
                 "uom": "EA",
                 "plant_Product": "MT01"
             }
   ]
 }}
     }
     try {
       const response = await axios.post(destinationurl, payload, headers );
       console.log('iFlow triggered successfully:', response.data);
       let result = response.data;
       await UPDATE(RequestHeaders)
         .set({ prnumber: result.match(/\d+/)[0] })
         .where({ reqno: req.data.reqno });
     } catch (error) {
       console.error('Error triggering iFlow:', error.message);
       throw new Error('Failed to trigger iFlow');
     }
   
 } 
  }
  });
  srv.on('rejected',async(req)=>{
    console.log(req.data.status);
    if (req.data.status === "rejected") {
      await UPDATE(RequestHeaders)
        .set({ status: 'Rejected' })
        .where({ reqno: req.data.reqno });
    }
  })
//   local testing for IFLOW
  srv.on('triggerIFlow',async(req)=>{
    const headers = {
         'Content-Type': 'application/json',
     };
     const payload_bpa_header = await SELECT.from(RequestHeaders).where({ reqno: 103 });
     const payload_bpa_items = await SELECT.from(RequestItems).where({ RequestHeaders_reqno :103 });
     const { maxNum } = await SELECT.one`max(itemno) as maxNumber`.from(RequestItems).where({ RequestHeaders_reqno : 103 });
     console.log(maxNum);
     console.log(payload_bpa_header);
     console.log(payload_bpa_items);
     console.log(payload_bpa_header.length);
    const destinationurl = 'https://ustcpi.test.apimanagement.us10.hana.ondemand.com:443/api/direct'
    if (payload_bpa_items.length){
     const payload = {
      "RequestHeaders": {
          "prtype": "NB",
          "reqdesc": payload_bpa_header[0]?.reqdesc,
          "items": {
              "RequestItems": payload_bpa_items.map(items => ({
   
                      "itemno": items.itemno,
                      "itemdescr": items.itemdescr,
                      "prgroup": "002",
                      "material_MID": "MTAMC4",
                      "quantity": items.quantity.toString(),
                      "unitprice": items.unitprice.toString(),
                      "netprice": items.netprice.toString(),
                      "uom": "EA",
                      "plant_Product": "MT01"
                  }))
          }
      }
   };
    
   
    try {
      // Make the POST request to the iFlow
      const response = await axios.post(destinationurl, payload, headers );

      console.log('iFlow triggered successfully:', response.data);
      let result = response.data;
      await UPDATE(RequestHeaders)
        .set({ prnumber: result.match(/\d+/)[0] })
        .where({ reqno: 101 });
    } catch (error) {
      console.error('Error triggering iFlow:', error.message);
      throw new Error('Failed to trigger iFlow');
    }
  }
  else{
    const payload = {
      "RequestHeaders":{
          "prtype": "NB",
          "reqdesc": payload_bpa_header[0]?.reqdesc,
          "items": {
              "RequestItems": [
              {
                  "itemno": 2,
                  "itemdescr": "Pens Pack",
                  "prgroup": "002",
                  "material_MID": "MTAMC4",
                  "quantity": 10,
                  "unitprice": "2",
                  "netprice":"2345",
                  "uom": "EA",
                  "plant_Product": "MT01"
              }
    ]
  }}
      }
      try {
        // Make the POST request to the iFlow
        const response = await axios.post(destinationurl, payload, headers );
  
        console.log('iFlow triggered successfully:', response.data);
        let result = response.data;
        await UPDATE(RequestHeaders)
          .set({ prnumber: result.match(/\d+/)[0] })
          .where({ reqno: 101 });
      } catch (error) {
        console.error('Error triggering iFlow:', error.message);
        throw new Error('Failed to trigger iFlow');
      }
    
  }
    });
  
srv.on('local',async(req)=>{
  //   console.log('local');

  //   // const { maxNumber } = await SELECT.one`max(reqno) as maxNumber`.from(RequestHeaders);
  //   // let iNewNo = (!maxNumber ? 1000 : Number(maxNumber) + 1);
  //   // console.log(iNewNo);


  //   const { maxNumber } = await SELECT.one`max(reqno) as maxNumber`.from(RequestHeaders);
  //   console.log('maxnum',maxNumber);
  //   const { norm } = await SELECT.one`max(reqno) as maxNumber`.from(RequestHeaders.drafts);
  //   // console.log("maxnum",maxNumber);
  //  console.log("norm",norm);

  //   // let iNewNo = (!maxNumber ? Number(norm)+1: Number(maxNumber) + 1);
  //   // console.log(iNewNo);
  //   if (maxNumber){
  //       console.log("somevalue ");
  //   }
  //   else if (norm && maxNumber){
  //        console.log("elseif");
  //   }
  //   else{
  //       console.log("nothing");
  //   }
  //   // req.data.reqno = iNewNo;
  const payload_bpa_header = await SELECT.from(RequestHeaders).where({ ID: '165a2547-c132-4ede-a463-03002a055fbe' });
  const payload_bpa_items = await SELECT.from(RequestItems).where({ RequestHeaders_ID:payload_bpa_header[0]?.ID  });
  console.log(payload_bpa_header);
  console.log(payload_bpa_items);
})
});