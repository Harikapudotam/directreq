const cds = require('@sap/cds');
module.exports = cds.service.impl(async function (srv) {
  const prod_api = await cds.connect.to('OP_API_PRODUCT_SRV_0001');
  const { Materials, RequestHeaders, Plants, RequestItems, RequestItems_drafts, RequestHeaders_drafts , attachments } = srv.entities;
  srv.on("READ", Plants, async (req) => {
    try {
      // Add filtering to the query
      req.query.where("Product <> '' ");
      req.query.SELECT.count = false; // Ensuring no count is added to the query

      // Log the query being executed for debugging
      console.log("Running query:");

      // Send the query to the destination
      const response = await prod_api.run(req.query);

      // Log the response from the destination (or error if not received)
      console.log("Response from prod_api:");

      return response;

    } catch (error) {
      // Log and handle any errors during the process
      console.error("Error occurred while querying the external service:", error);

      // Optionally, you can rethrow or handle the error as needed
      throw new Error("Failed to retrieve data from the external service.");
    }
  });
  srv.on("READ", Materials, async (req) => {
    try {
      // Add filtering to the query
      req.query.where("Product <> '' ");
      req.query.SELECT.count = false; // Ensuring no count is added to the query

      // Log the query being executed for debugging
      console.log("Running query:");

      // Send the query to the destination
      const response = await prod_api.run(req.query);

      // Log the response from the destination (or error if not received)
      console.log("Response from prod_api:");

      return response;

    } catch (error) {
      // Log and handle any errors during the process
      console.error("Error occurred while querying the external service:", error);

      // Optionally, you can rethrow or handle the error as needed
      throw new Error("Failed to retrieve data from the external service.");
    }
  });

  // request no event handler 
  srv.before('CREATE', RequestHeaders, async (req) => {
    console.log('I am inside');
    const { maxNumber } = await SELECT.one`max(reqno) as maxNumber`.from(RequestHeaders);
    console.log('num',maxNumber);
    let iNewNo = (!maxNumber ? 10000000 : Number(maxNumber) + 1);
    req.data.reqno = iNewNo;
    req.data.status = "New";
    // Increment for next request
    // const { newitem } = await SELECT.one `max(items.itemno) as newitem`.from(RequestItems);
    // let newn = (!newitem ? 1000000000 : Number(newitem) + 1);
    // items.itemno = newn;


  });

  

  srv.before('NEW','RequestHeaders.drafts' , async (req) => {
    console.log("drafts herer");
    const { maxNumber } = await SELECT.one`max(reqno) as maxNumber`.from(RequestHeaders.drafts);
   // const { norm } = await SELECT.one`max(reqno) as maxNumber`.from(RequestHeaders);
    console.log("maxnum",maxNumber);
   // console.log("norm",norm);

    let iNewNo = (!maxNumber ? 100000000: Number(maxNumber) + 1);
    req.data.reqno = iNewNo;
  });

//   srv.before('CREATE', RequestItems, async (req) => {
//     const { reqno } = req.data;  // Get the reqno of the RequestHeader
//     console.log('here ',reqno);

//     // Fetch the highest itemno for the given reqno
//     const result = await cds.transaction(req).run(
//         SELECT.one.from(RequestItems)
//             .where({ RequestHeaders_reqno : req.data })
//             .orderBy({ itemno: 'desc' })  // Get the highest itemno
//     );
//     // If there are existing items, increment the highest itemno by 1
//     const nextItemNo = !maxNumber ? 10 : Number(maxNumber) + 10 ;  // Start from 1 if no items exist
  
//     // Assign the next available itemno to the new RequestItem
//     req.data.itemno = nextItemNo;
// });
// srv.before('NEW', 'RequestItems.drafts',async (req) => {
//   const { reqno } = req.data;  // Get the reqno of the RequestHeader

//   // Fetch the highest itemno for the given reqno
//   const result = await cds.transaction(req).run(
//       SELECT.one.from(RequestItems.drafts)
//           .where({ RequestHeaders_reqno : reqno })
//           .orderBy({ itemno: 'desc' })  // Get the highest itemno
//   );
//   const { maxNumber } = await SELECT.one`max(itemno) as maxNumber`.from(RequestItems.drafts).where({ RequestHeaders_reqno : reqno });
//   console.log('heter ',maxNumber);
//   // If there are existing items, increment the highest itemno by 1
//   const nextItemNo = !maxNumber ? 10 : Number(maxNumber) + 10 ;  // Start from 1 if no items exist

//   // Assign the next available itemno to the new RequestItem
//   req.data.itemno = nextItemNo;
// });
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
    const payload_bpa_header = await SELECT.from(RequestHeaders).where({ reqno: req.params[0].reqno });
    const payload_bpa_items = await SELECT.from(RequestItems).where({ RequestHeaders_reqno: req.params[0].reqno });
    const bpa_destinations = await cds.connect.to('bpa_destination');
    console.log(req.params[0].reqno);
    let payload = {
      "definitionId": "us10.buyerportalpoc-aeew31u1.directrequisitiont3copy.approval",
      "context": {
          "request": {
              "Request": {
                  "RequestNo": payload_bpa_header[0]?.reqno,
                  "RequestDesc": payload_bpa_header[0]?.reqdesc,
                  "RequestBy": payload_bpa_header[0]?.createdBy,
                  "RequestId": "1",
                  "TotalPrice":payload_bpa_header[0]?.totalprice,
                  "RequestItem": payload_bpa_items.map(items => ({
                  "itemNo": items.itemno,
                  "quantity": items.quantity,
                  "itemDesc": items.itemdescr,
                  "itemPrice": items.netprice,
                  "material": items.material_MID,
                  "plant": "P01",
              }))
          }
      }
    }
  };
  let oResult = await bpa_destinations.post('/workflow/rest/v1/workflow-instances',payload);
  await UPDATE(RequestHeaders)
        .set({ status: 'Sent for approval' })
        .where({ reqno: payload_bpa_header[0]?.reqno });

  });

  srv.on('responsefrombpa',async(req)=>{
    console.log(req.data.status);
 
    if (req.data.status === "approved") {
 
      // updated status to ordered
 
      // await UPDATE(RequestHeaders)
      //   .set({ status: 'Ordered' })
      //   .where({ reqno: req.data.reqno });
    const payload_bpa_header = await SELECT.from(RequestHeaders).where({ reqno: req.data.reqno });
    const payload_bpa_items = await SELECT.from(RequestItems).where({ RequestHeaders_reqno: req.data.reqno });
    const destinationUrl = 'https://ustcpi.test.apimanagement.us10.hana.ondemand.com:443/direct/requisition';

    // Define the headers (no authorization required)
    const headers = {
      'Content-Type': 'application/json',
    };

    const payload = {
      reqdesc: payload_bpa_header[0]?.reqdesc,
      reqtype: 'NB',
      items: [payload_bpa_items.map(items => (
        {
          itemno: items.itemno,
          itemdescr: items.itemdescr,
          PurchasingGroup: '001',
          quantity: items.quantity,
          unitprice: '2',
          netprice: '2345',
          material: 'MTAMC4',
          uom: 'EA',
          plant: 'MT01',
        }
      ))
      ],
    };

    try {
      // Make the POST request to the iFlow
      const response = await axios.post(destinationUrl, payload, { headers });

      console.log('iFlow triggered successfully:', response.data);
    } catch (error) {
      console.error('Error triggering iFlow:', error.message);
      throw new Error('Failed to trigger iFlow');
    }


      await UPDATE(RequestHeaders)
      .with({ status: 'X' , insertrestrictions: 1})
      .where({ reqno: req.data.reqno });
 
    };
    await UPDATE(RequestHeaders)
      .with({ prnumber: response.data.PurchaseRequisition })
      .where({ reqno: req.data.reqno });
 
    

  });
  srv.on('rejected',async(req)=>{
    console.log(req.data.status);
 
    if (req.data.status === "rejected") {
      console.log("hi")
 
      await UPDATE(RequestHeaders)
        .set({ status: 'Rejected' })
        .where({ reqno: req.data.reqno });
    }
  })
})