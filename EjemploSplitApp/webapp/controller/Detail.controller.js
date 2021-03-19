sap.ui.define([
        "sap/ui/core/mvc/Controller",
         "sap/ui/model/json/JSONModel"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (Controller, JSONModel) {
		"use strict";

		return Controller.extend("EjemploSplitApp.EjemploSplitApp.controller.Detail", {
			onInit: function () {
                this.getOwnerComponent().getRouter().getRoute("RouteDetail").attachPatternMatched(this._onRouteMatched, this);
                
            },
            _onRouteMatched: function(oEvent) {
                var productId = oEvent.getParameter("arguments").productId;
                this.getView().bindElement("/products/" + productId);
            },
		});
	});
