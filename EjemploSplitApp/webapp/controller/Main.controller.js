sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel",
        "EjemploSplitApp/EjemploSplitApp/util/Services"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (Controller, JSONModel, Services) {
		"use strict";

		return Controller.extend("EjemploSplitApp.EjemploSplitApp.controller.Main", {
			onInit: function () {
                this.loadModel();
                this.getOwnerComponent().getRouter().getRoute("RouteMain").attachPatternMatched(this._onRouteMatched, this);  
            },
            _onRouteMatched: function(oEvent) {
                this.getOwnerComponent().getRouter().navTo("RouteDetail");
            },
            loadModel: async function(){
                const oResponse = await Services.getLocalJSON("Productos.json");
                const oData = oResponse[0];
                var oModel = new JSONModel();
                oModel.setData(oData);
                this.getOwnerComponent().setModel(oModel,"Productos");
                var oProductoSeleccionado = oModel.getProperty("/Productos/0");
                let productoModel = new JSONModel (oProductoSeleccionado);
                this.getOwnerComponent().setModel(productoModel, "Producto");    
            },
            onSelectionChange: function(oEvent) {
                var sProductId = oEvent.getSource().getSelectedItem().getBindingContext("Productos").getProperty("id");
                var oModel = this.getView().getModel("Productos");
                var oProductoSeleccionado = oModel.getProperty(oEvent.getSource().getSelectedItem().getBindingContext("Productos").getPath());
                let productoModel = new JSONModel (oProductoSeleccionado);
                this.getOwnerComponent().setModel(productoModel, "Producto");                
                this.getOwnerComponent().getRouter()
                    .navTo("RouteDetail",
                        {productoId:sProductId}, true);
            }
		});
	});
