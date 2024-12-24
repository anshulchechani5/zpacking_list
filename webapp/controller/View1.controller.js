sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox) {
        "use strict";

        return Controller.extend("zpackinglist.controller.View1", {
            onInit: function () {

            },
            oncheck: function () {

                var oBusyDialog = new sap.m.BusyDialog({
                    title: "Loading",
                    text: "Please wait"
                });
                oBusyDialog.open();
                var delverynofrom = this.getView().byId("delveryno").getValue();
                var delverynoto = this.getView().byId("delverynoto").getValue();
                // https://my405100.s4hana.cloud.sap:443/sap/bc/http/sap/zsd_packinglist_print?sap-client=080
                var url1 = "/sap/bc/http/sap/zsd_packinglist_print?sap-client=080";
                var url22 = "&delverynofrom=";
                var url23 = "&delverynoto=";



                var url24 = url22 + delverynofrom;
                var url25 = url23 + delverynoto;

                var url = url1 + url24 + url25;

                // var username = "nvlabap3";
                // var password = "Mike$1245";
                $.ajax({
                    url: url,
                    type: "GET",
                    beforeSend: function (xhr) {
                        xhr.withCredentials = true;
                    },
                    success: function (result) {
                        if (result === "Error" || result === "ERROR" || result === "error") {
                            MessageBox.error("Wrong Delvery No.");
                        }
                        else {
                            var decodedPdfContent = atob(result);
                            var byteArray = new Uint8Array(decodedPdfContent.length);
                            for (var i = 0; i < decodedPdfContent.length; i++) {
                                byteArray[i] = decodedPdfContent.charCodeAt(i);
                            }
                            var blob = new Blob([byteArray.buffer], {
                                type: 'application/pdf'
                            });
                            var _pdfurl = URL.createObjectURL(blob);

                            if (!this._PDFViewer) {
                                this._PDFViewer = new sap.m.PDFViewer({
                                    width: "auto",
                                    source: _pdfurl
                                });
                                jQuery.sap.addUrlWhitelist("blob"); // register blob url as whitelist
                            }
                            else {
                                this._PDFViewer = new sap.m.PDFViewer({
                                    width: "auto",
                                    source: _pdfurl
                                });
                                jQuery.sap.addUrlWhitelist("blob"); // register blob url as whitelist 
                            }
                            oBusyDialog.close();
                            this._PDFViewer.open();
                        }
                    }.bind(this)
                });

            },
            onf4dev: function () {
                var oBusyDialog = new sap.m.BusyDialog({
                    text: "Please wait"
                });
                oBusyDialog.open();
                var dataModel = this.getOwnerComponent().getModel('dataModel');
                var oInput1 = this.getView().byId("delveryno");

                if (!this._oValueHelpDialog) {
                    this._oValueHelpDialog = new sap.ui.comp.valuehelpdialog.ValueHelpDialog("delveryno", {
                        supportMultiselect: false,
                        supportRangesOnly: false,
                        stretch: sap.ui.Device.system.phone,
                        keys: "delveryno",
                        descriptionKey: "delveryno",
                        filtermode: "true",
                        enableBasicSearch: "true",
                        ok: function (oEvent) {
                            var valueset = oEvent.mParameters.tokens[0].mAggregations.customData[0].mProperties.value.DeliveryDocument;
                            oInput1.setValue(valueset);
                            this.close();
                        },
                        cancel: function () {
                            this.close();
                        }
                    });
                }


                var oFilterBar = new sap.ui.comp.filterbar.FilterBar({
                    advancedMode: true,
                    filterBarExpanded: false,
                    filterBarExpanded: true,
                    enableBasicSearch: true,
                    showGoOnFB: !sap.ui.Device.system.phone,
                    filterGroupItems: [new sap.ui.comp.filterbar.FilterGroupItem({ groupTitle: "foo", groupName: "gn1", name: "n1", label: "DeliveryDocument", control: new sap.m.Input() })],




                    search: function (oEvt) {
                        oBusyDialog.open();
                        //  var oParams = oEvt.getParameter("YY1_PACKINGTYPE");
                        var DeliveryDocument = oEvt.mParameters.selectionSet[0].mProperties.value;
                        // if threee no  values 
                        if (DeliveryDocument === "") {
                            oTable.bindRows({
                                path: "/Delivery"
                            });
                        }

                        //    if BillingDocument  value is insert then search  under block
                        else {
                            oTable.bindRows({
                                path: "/Delivery", filters: [
                                    new sap.ui.model.Filter("DeliveryDocument", sap.ui.model.FilterOperator.Contains, DeliveryDocument)]
                            });
                        }
                        oBusyDialog.close();
                    }
                });

                this._oValueHelpDialog.setFilterBar(oFilterBar);
                var oColModel = new sap.ui.model.json.JSONModel();
                oColModel.setData({
                    cols: [
                        { label: "DeliveryDocument", template: "DeliveryDocument" }
                    ]
                });
                var oTable = this._oValueHelpDialog.getTable();
                oTable.setModel(oColModel, "columns");
                var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZSD_PACKINGLIST_BIN");
                oTable.setModel(oModel);
                oBusyDialog.close();
                this._oValueHelpDialog.open();
            },
            onf4dev1: function () {
                var oBusyDialog = new sap.m.BusyDialog({
                    text: "Please wait"
                });
                oBusyDialog.open();
                var dataModel = this.getOwnerComponent().getModel('dataModel');
                var oInput1 = this.getView().byId("delverynoto");

                if (!this._oValueHelpDialog1) {
                    this._oValueHelpDialog1 = new sap.ui.comp.valuehelpdialog.ValueHelpDialog("delverynoto", {
                        supportMultiselect: false,
                        supportRangesOnly: false,
                        stretch: sap.ui.Device.system.phone,
                        keys: "delverynoto",
                        descriptionKey: "delverynoto",
                        filtermode: "true",
                        enableBasicSearch: "true",
                        ok: function (oEvent) {
                            var valueset = oEvent.mParameters.tokens[0].mAggregations.customData[0].mProperties.value.DeliveryDocument;
                            oInput1.setValue(valueset);
                            this.close();
                        },
                        cancel: function () {
                            this.close();
                        }
                    });
                }


                var oFilterBar = new sap.ui.comp.filterbar.FilterBar({
                    advancedMode: true,
                    filterBarExpanded: false,
                    filterBarExpanded: true,
                    enableBasicSearch: true,
                    showGoOnFB: !sap.ui.Device.system.phone,
                    filterGroupItems: [new sap.ui.comp.filterbar.FilterGroupItem({ groupTitle: "foo", groupName: "gn1", name: "n1", label: "DeliveryDocument", control: new sap.m.Input() })],




                    search: function (oEvt) {
                        oBusyDialog.open();
                        //  var oParams = oEvt.getParameter("YY1_PACKINGTYPE");
                        var DeliveryDocument = oEvt.mParameters.selectionSet[0].mProperties.value;
                        // if threee no  values 
                        if (DeliveryDocument === "") {
                            oTable.bindRows({
                                path: "/Delivery"
                            });
                        }

                        //    if BillingDocument  value is insert then search  under block
                        else {
                            oTable.bindRows({
                                path: "/Delivery", filters: [
                                    new sap.ui.model.Filter("DeliveryDocument", sap.ui.model.FilterOperator.Contains, DeliveryDocument)]
                            });
                        }
                        oBusyDialog.close();
                    }
                });

                this._oValueHelpDialog1.setFilterBar(oFilterBar);
                var oColModel = new sap.ui.model.json.JSONModel();
                oColModel.setData({
                    cols: [
                        { label: "DeliveryDocument", template: "DeliveryDocument" }
                    ]
                });
                var oTable = this._oValueHelpDialog1.getTable();
                oTable.setModel(oColModel, "columns");
                var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZSD_PACKINGLIST_BIN");
                oTable.setModel(oModel);
                oBusyDialog.close();
                this._oValueHelpDialog1.open();
            },
            onBack: function () {
                var sPreviousHash = History.getInstance().getPreviousHash();
                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    this.getOwnerComponent().getRouter().navTo("page1", null, true);
                }
            },
        });
    });
