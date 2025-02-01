const cds = require('@sap/cds');
module.exports = cds.server;


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
  srv.before('CREATE', RequestHeaders, async (req) => {
    const { maxNumber } = await SELECT.one`max(reqno) as maxNumber`.from(RequestHeaders)
    let iNewNo = (!maxNumber ? 1000000000 : Number(maxNumber) + 1);
    req.data.reqno = iNewNo;
    // Increment for next request
    // const { newitem } = await SELECT.one `max(items.itemno) as newitem`.from(RequestItems);
    // let newn = (!newitem ? 1000000000 : Number(newitem) + 1);
    // items.itemno = newn;


  });

  srv.before('NEW','RequestHeaders.drafts', async (req) => {
    const { maxNumber } = await SELECT.one`max(reqno) as maxNumber`.from(RequestHeaders)
    let iNewNo = (!maxNumber ? 1000000000 : Number(maxNumber) + 1);
    req.data.reqno = iNewNo;
  });
  srv.before(['UPDATE', 'CREATE', 'DELETE'], RequestHeaders, async (req) => {
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
  
  // srv.on('Approvals',async( req , res )=>{
  // const bpa_destination = await cds.connect.to('bpa_destination');
  // const reqno = req.params[0];
  // console.log('req',reqno);
  // console.log("Request params:", req.params); 
  // const payload_bpa_header = await SELECT.from(RequestHeaders).where({ reqno: req.data.reqno });
  // const payload_bpa_items = await SELECT.from(RequestItems).where({ RequestHeaders_reqno: req.data.reqno });
  // console.log('response',payload_bpa_header[0]?.reqno);
  //   let payload = {
  //     "definitionId": "us10.buyerportalpoc-aeew31u1.directrequisitiont3copy.approval",
  //     "context": {
  //         "request": {
  //             "Request": {
  //                 "RequestNo": payload_bpa_header[0]?.reqno,
  //                 "RequestDesc": payload_bpa_header[0]?.reqdesc,
  //                 "RequestBy": "Harika",
  //                 "RequestId": "120",
  //                 "TotalPrice": payload_bpa_header[0]?.totalprice,
  //                 "RequestItem": payload_bpa_items.map(item => ({
  //                 "itemNo": item.itemno,
  //                 "quantity": item.quantity,
  //                 "itemDesc": item.itemdes,
  //                 "itemPrice": item.netprice,
  //                 "material": item.material_MID,
  //                 "plant": item.plant_Product,
  //             }))
  //         }
  //     }
  //   }
  // };
  //   let oResult = await bpa_destination.post('/workflow/rest/v1/workflow-instances',payload);
    
  //   if (response.status !== 201) {
  //     throw new Error('Failed to trigger the process.');
  //   }
        
  // });
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
                  "RequestBy": "Harika",
                  "RequestId": "120",
                  "TotalPrice": payload_bpa_header[0]?.totalprice,
                  "RequestItem": payload_bpa_items.map(item => ({
                  "itemNo": item.itemno,
                  "quantity": item.quantity,
                  "itemDesc": item.itemdes,
                  "itemPrice": item.netprice,
                  "material": item.material_MID,
                  "plant": item.plant_Product,
              }))
          }
      }
    }
  };
  let oResult = await bpa_destinations.post('/workflow/rest/v1/workflow-instances',payload);
  });
  srv.before('CREATE', 'attachments', async (req) => {
    if (!req.data.content) {
        req.error(400, 'File content is missing');
    }
    console.log("Received file:", req.data.filename);
});

srv.on('CREATE','attachments', async (req, next) => {
    if (!req.data.content) {
        return req.error(400, "No file content received");
    }

    return next();
});




})