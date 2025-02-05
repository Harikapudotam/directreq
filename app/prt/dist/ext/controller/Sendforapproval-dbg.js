sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';
 
    return {
        onInit: function() {
            var oModel = this.getView().getModel();
            var oContext = this.getModel().getBindingContext();
           
            if (oContext) {
                var sStatus = oContext.getProperty("status");
                this._updateActionButton(sStatus);
            }
        },
       
        onAfterRendering: function() {
            var oModel = this.getView().getModel();
            var oContext = this.getView().getBindingContext();
           
            if (oContext) {
                var sStatus = oContext.getProperty("status");
                this._updateActionButton(sStatus);
            }
        },
       
        _updateActionButton: function(sStatus) {
            var startupParameters = this.getOwnerComponent().getComponentData().startupParameters;
           
            if (!startupParameters || !startupParameters.inboxAPI) {
                console.error("Inbox API not available");
                return;
            }
       
            if (sStatus === "Approved" || sStatus === "saved") {
                startupParameters.inboxAPI.disableAction("APPROVE");
            } else {
                startupParameters.inboxAPI.enableAction("APPROVE");
            }
        },
       
 
 
 
 
 
 
        _onapproval: function(oEvent) {
           
 
 
            var that = this;
            var oDataModel = this.getBindingContext().getModel()
            console.log(oDataModel);
            const sPath = oDataModel.sServiceUrl + that.getBindingContext().sPath.slice(1, that.getBindingContext().sPath.length) + "/sendforapproval";
            console.log('the path',sPath);
            $.ajax({
                url: sPath,
                async: false,
                headers : {
                    'X-CSRF-Token' : oDataModel.getHttpHeaders()["X-CSRF-Token"]
                },
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                success: function (json) {
                    MessageToast.show("approval send");
                    // window.location.reload();
                    that.getBindingContext().refresh()
                    // refreshing the model
                    that.getModel().refresh()
                },
                error: function (error) {
                    // Handle the error scenario
                    MessageToast.show("Failed to add comment: " + error);
                },complete: function(xhr, status) {
            } });
 
        }
    };
});