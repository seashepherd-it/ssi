import {JetView} from "webix-jet";
import {getEvent, getEventVolunteers, deleteEvent, saveEvent} from "models/events";
import {getEventTypes, getEventTypeText} from "models/eventTypes";
import {getEventStates} from "models/eventStates";
import {getAreas} from "models/areas";
import {getProvinces} from "models/provinces";
import {getInstituteTypes} from "models/instituteTypes";
import {getVolunteers} from "models/volunteers";

export default class SaveEventView extends JetView {
	
	config(){
		const _ = this.app.getService("locale")._;		
		const actions = "<span class='mdi mdi-trash-can'></span>";
				
		var tabbar = {
						view: "tabbar",  
						localId:"tabbar",
						multiview: true,
			         	options:[
			         		{id: "EV", value: "Base"},
			         		{id: "PS", value: getEventTypeText("PS")},
			         		{id: "EP", value: getEventTypeText("EP")},
			         		{id: "JA", value: getEventTypeText("JA")},
			         		{id: "DP", value: getEventTypeText("DP")},
			         		{id: "PV", value: getEventTypeText("PV")},
			         		{id: "receipts", value: "Receipts"}
			            ],
					};
		
		var forms = {				
					height:450,
					cells: [                              
							{
								view:"form",								
								scroll:true,
								id:"EV",
								elementsConfig:{
									labelPosition:"left" 
								},
								elements:[
									{
										view:"combo",
										name:"eventTypeName",
										label:_("Type"), 
										disabled: true,
										options:{
											data:getEventTypes()
										}
									},
									{ 
										view:"text",
										name:"eventId",
										hidden:true,
										label:_("EventId")
									},
									{ 
										view:"text",
										name:"eventText",
										label:_("Text")
									},
									{
										view:"combo",
										name:"eventStatus",
										label:_("Status"), 
										options:{
											data:getEventStates()
										}
									},									
									{
										cols:[
											{
												view:"datepicker",
												name:"eventDateFrom",
												label:_("Date From")
											},
											{
												view:"datepicker",
												name:"eventDateTo",
												label:_("Date To")
											}
										]
									},
									{ 
										view:"text",
										name:"eventArgument",
										label:_("Argument")
									},					
									{ 
										view:"combo",
										name:"eventAccountId",
										label:_("Account"),
										options:{ 
											data:getVolunteers()
										}
									},														
									{
										view:"combo",
										name:"areaId",
										label:_("Area"), 
										options:{
											data:getAreas()
										}
									},
									{
										cols:[
											{ 
												view:"text",
												name:"eventPlaceCountry",
												disabled: true,
												label:_("Country")
											},
											{ 
												view:"combo",
												name:"eventPlaceProvince",
												label:_("Province"),
												options:{
													data:getProvinces()
												}
											}
										]
									},
									{ 
										view:"text",
										name:"eventPlace",
										label:_("Place")
									},					
									{ 
										view:"text",
										name:"eventPeopleQty",
										label:_("People Qty"),
										inputAlign:"right",
										format:"1.111"
									},
									{ 
										view:"text",
										name:"eventLink",
										label:_("Link")
									},
									{ 
										view:"text",
										name:"eventNote",
										label:_("Note")
									}
								],
								rules:{
									eventTypeName:webix.rules.isNotEmpty,
									eventText:webix.rules.isNotEmpty,
									eventStatus:webix.rules.isNotEmpty,
									eventDateFrom:webix.rules.isNotEmpty,
									eventDateTo:webix.rules.isNotEmpty,
									eventAccountId:webix.rules.isNotEmpty,
									areaId:webix.rules.isNotEmpty,
									eventPlaceCountry:webix.rules.isNotEmpty,					
									eventPlaceProvince:webix.rules.isNotEmpty,
									eventPlace:webix.rules.isNotEmpty
								}
							},
							{
								view:"form",
								scroll:true,
								id:"receipts",
								elementsConfig:{labelPosition:"left" },
								elements:[
									{ 
										view:"text",
										name:"eventReceiptsQty",
										label:_("Quantity"),
										labelWidth:100,
										inputAlign:"right",
										format:"1.111"
									},
									{ 
										view:"text",
										name:"eventReceiptsTot",
										label:_("Total"),
										labelWidth:100,
										inputAlign:"right",
										format: "1.111,00"
									},
									{ 
										view:"text",
										name:"eventReceiptsPOS",
										label:_("Total POS"),
										labelWidth:100,
										inputAlign:"right",
										format: "1.111,00"
									},
									{
										cols:[
											{ 
												view:"text",
												name:"eventTicketsFrom1",
												label:_("Ticket From"),
												labelWidth:100,
												inputAlign:"right",
												format:"1.111"
											},
											{ 
												view:"text",
												name:"eventTicketsTo1",
												label:_("Ticket To"),
												inputAlign:"right",
												format:"1.111"
											}
										]
									},
									{
										cols:[
											{ 
												view:"text",
												name:"eventTicketsFrom2",
												label:_("Ticket From"),
												labelWidth:100, 
												inputAlign:"right",
												format:"1.111"
											},
											{ 
												view:"text",
												name:"eventTicketsTo2",
												label:_("Ticket To"),
												inputAlign:"right",
												format:"1.111"
											}
										]
									},
									{
										cols:[
											{ 
												view:"text",
												name:"eventTicketsFrom3",
												label:_("Ticket From"),
												labelWidth:100,
												inputAlign:"right",
												format:"1.111"
											},
											{ 
												view:"text",
												name:"eventTicketsTo3",
												label:_("Ticket To"),
												inputAlign:"right",
												format:"1.111"
											}
										]
									}
									
								] 
							},
							{
								view:"form",
								scroll:true,
								id:"PS",
								elementsConfig:{labelPosition:"left" },
								elements:[
									{ 
										view:"combo",
										name:"instituteTypeId",
										label:_("Type"), 
										options:{
											data:getInstituteTypes()
										}
									},
									{ 
										view:"text",
										name:"instituteName",
										label:_("Name")
									},
									{ 
										view:"text",
										name:"instituteSpeaker",
										label:_("Speaker")
									},
									{ 
										view:"text",
										name:"instituteContact",
										label:_("Contact")
									}	
								] 
							},
							{
								view:"form",
								scroll:true,
								id:"EP",
								elementsConfig:{
									labelPosition:"left",
									labelWidth:100 
								},
								elements:[
									{ 
										view:"text",
										name:"disposalMaterialKG",
										label:_("Material(Kg)"),
										inputAlign:"right",
										format:"1.111,00"
									},
									{ 
										view:"text",
										name:"disposalContact",
										label:_("Contact")
									}			
								] 
							},
							{
								view:"form",
								scroll:true,
								id:"JA",
								elementsConfig:{
									labelPosition:"left",
									labelWidth:100 
								},
								elements:[
									{ 
										view:"text",
										name:"disposalMaterialKG",
										label:_("Material(Kg)"),
										inputAlign:"right",
										format:"1.111,00"
									},
									{ 
										view:"text",
										name:"disposalContact",
										label:_("Contact")
									}			
								] 
							},							
							{
								view:"form",
								scroll:true,
								id:"DP",
								elementsConfig:{
									labelPosition:"left",
									labelWidth:100 
								},
								elements:[
									{ 
										view:"text",
										name:"eventDive",
										label:_("Dive")
									},
									{ 
										view:"text",
										name:"disposalMaterialKG",
										label:_("Material(Kg)"),
										inputAlign:"right",
										format:"1.111,00"
									},
									{ 
										view:"text",
										name:"disposalContact",
										label:_("Contact")
									}
								] 
							},
							{
								view:"form",
								scroll:true,
								id:"PV",
								elementsConfig:{labelPosition:"left" },
								elements:[
									{ 
										view:"text",
										name:"shipName",
										label:_("Ship Name")
									},
									{ 
										view:"combo",
										name:"instituteTypeId",
										label:_("Type"), 
										options:{
											data:getInstituteTypes()
										}
									},
									{ 
										view:"text",
										name:"instituteName",
										label:_("Name")
									},
									{ 
										view:"text",
										name:"instituteSpeaker",
										label:_("Speaker")
									},
									{ 
										view:"text",
										name:"instituteContact",
										label:_("Contact")
									}	
								] 
							}
						]
					};
		
		return {
			view:"window",
			position:"center",
			modal:true,
			move:true,
			resize:true,
			head:{
			    view:"toolbar", 
			    localId:"toolbar",
			    cols:[
			        {
						view:"label",
						localId:"toolbar_label",
			        }
			    ]
			},
			width:1200,
			body:{	
				view:"layout",
				type:"wide",
				rows:[
					{
						cols:[
							{
								rows:[
									tabbar,
									forms
								]
							},
							{
								rows:[ 
								    { 
							        	view:"button", 
							        	label:"Add Row",
							        	click:function() {
							        		var data = {};
							        		this.$scope.$$('volunteers').editStop();
							        		var id = this.$scope.$$('volunteers').add(data, this.$scope.$$('volunteers').count());
							        		this.$scope.$$('volunteers').editRow(id);
							        		this.$scope.$$("volunteers").focusEditor({
							        		    row:id,
							        		    column:"volunteerId"
							        		});
							        	}
								    },
									{					
										view:"datatable",
										localId:"volunteers",
										resizeColumn:true,
										footer:true,
									    editable:true,
									    editaction:"click", 
										columns: [
											{
										        header: "Actions",
										        template: actions 
											},
									        {
												id: "volunteerId",
									            header: "Volunteer",
									            fillspace:true,
									            editor:"combo",
												options:getVolunteers(),
									            sort:"string"
									        },
									        {
									            id: "eventHours",
									            header: "Hours",
									            editor:"text",
									            format:webix.Number.numToStr({decimalSize:0}),
									            css:{'text-align':'right'},
									            sort:"int", 
									            footer:{content:"summColumn", css:{'text-align':'right'}}
									        }
										],
										rules:{
											eventHours:webix.rules.isNotEmpty,
											volunteerId:webix.rules.isNotEmpty
										},
									    onClick:{ 
									    	"mdi-trash-can": function  (event, id, node) {
									    		var dtable = this;
								    	    	dtable.remove(id.row);
									        }
									    }
									}
								]
							}	
						]
					},
					{
						cols:[
							{
								view:"button", value:_("Close"),
								click:() => this.closex()
							},
							{
								view:"button",
								value:_("Save"), type:"form",
								click:() => this.saveEvent()
							}
						]
					}
				]
			}
		};
	}
	
	init(config) {
// webix.i18n.setLocale("it-IT");
	}
	
	showWindow(eventType, eventId) {
		
		const _ = this.app.getService("locale")._;
		const eventTypes = getEventTypes();
		
		this.setEventTypeName(eventType);

		this.$$("receipts").clear();		
		this.$$("volunteers").clearAll();

		var i;
		for(i=0; i < eventTypes.length; i++) {
			
			this.$$(eventTypes[i].id).clear();

			if(eventTypes[i].id != "EV") 
				this.$$("tabbar").hideOption(eventTypes[i].id);				
		}

		if(eventType != "EV") 
			this.$$("tabbar").showOption(eventType);
		
		if(eventId != null) {	
			
			this.$$("EV").setValues({ eventReplace: true});
			
			const view = this;
    	    const event = getEvent(eventType, eventId, function() {
 
    	    	var values = event.getValues();
    	    	var fmt = {
	    	    		decimalSize: 2, groupSize: 3, 
	    	    		decimalDelimiter: ",", groupDelimiter: "."
				  	};
    	    	values.eventReceiptsTot = webix.Number.format(values.eventReceiptsTot, fmt);
    	    	values.eventReceiptsPOS = webix.Number.format(values.eventReceiptsPOS, fmt);
    	    	values.disposalMaterialKG = webix.Number.format(values.disposalMaterialKG, fmt);   	    	
    	    	
    			view.$$("toolbar_label").setValue(_("Update Event") + " " + event.getValues().eventText + " (" + eventType + "-" + eventId + ")");
    	
    			view.setFormValues(view.$$("receipts"), event.getValues());
    			view.$$("volunteers").sync(getEventVolunteers(eventType, eventId));
    			
    			var i;
    			for(i=0; i < eventTypes.length; i++) {
    				view.setFormValues(view.$$(eventTypes[i].id), event.getValues());
    			}

    			view.getRoot().show();
    	    });
		}
		else {
			this.$$("toolbar_label").setValue(_("Insert Event") + " " + eventType);
			
			this.$$("EV").setValues({ eventTypeName: eventType,
				 					  eventStatus: "20" ,
				 					  eventDateFrom: new Date(),
				 					  eventDateTo: new Date(),
				 					  eventPlaceCountry: "Italy"});
			this.getRoot().show();			
		}		
	}
	
	closex(){
		this.getRoot().close();
	}
	
	saveEvent() {
		
		if (!this.$$("EV").validate())
			return;

		if (!this.$$(this.getEventTypeName()).validate())
			return;
		
		if (!this.$$("receipts").validate())
			return;

		var event = this.$$("EV").getValues();
		
		if(this.getEventTypeName() != "EV") {
			var eventTemp = this.$$(this.getEventTypeName()).getValues();
			Object.assign(event, eventTemp);
		}

		var receipts = this.$$("receipts").getValues();
		Object.assign(event, receipts);
		
		var volunteers = this.$$("volunteers").serialize();
		event.volunteers = volunteers;

		saveEvent(event)		
		this.closex();
	}
	
	setEventTypeName(eventTypeName) {
		this.eventTypeName_ = eventTypeName;
	}
	
	getEventTypeName() {
		return this.eventTypeName_;
	}
	
	setFormValues(form, obj) {
		
		for(var propName in obj) {
			if(typeof(form.elements[propName]) != "undefined") {
				form.elements[propName].setValue(obj[propName]);
			}
		}
	}
}