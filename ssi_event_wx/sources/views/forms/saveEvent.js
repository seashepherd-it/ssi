import {JetView} from "webix-jet";
import {getEvent, getEventVolunteers, deleteEvent} from "models/events";
import {getEventTypes, getEventTypeText} from "models/eventTypes";
import {getAreas} from "models/areas";
import {getProvinces} from "models/provinces";
import {getInstituteTypes} from "models/instituteTypes";
import {getVolunteers} from "models/volunteers";

export default class SaveEventView extends JetView {
	
	config(){
		const _ = this.app.getService("locale")._;		
		const actions = "<span class='mdi mdi-trash-can'></span>";
		const date_format = "%d %M %Y";

		var tabbar = {
						view: "tabbar",  
						localId:"tabbar",
						multiview: true,
			         	options:[
			         		{id: "EV", value: "Base"},
			         		{id: "PS", value: getEventTypeText("PS")},
			         		{id: "EP", value: getEventTypeText("EP")},
			         		{id: "DP", value: getEventTypeText("DP")},
			         		{id: "PV", value: getEventTypeText("PV")},
			         		{id: "receipts", value: "Receipts"}
			            ],
					};
		
		var forms = {
					height: 700,
					cells: [                              
							{
								view:"form",
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
										name:"eventText",
										label:_("Text")
									},
									{
										cols:[
											{
												view:"datepicker",
												name:"eventDateFrom",
												label:_("Date From"),
												value:new Date(),
												format:date_format
											},
											{
												view:"datepicker",
												name:"eventDateTo",
												label:_("Date To"),
												value:new Date(),
												format:date_format
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
										suggest:getVolunteers()
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
										],
										rules:{
											eventText:webix.rules.isNotEmpty,
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
										view:"text",
										name:"eventPlace",
										label:_("Place")
									},					
									{ 
										view:"text",
										name:"eventPeopleQty",
										label:_("People Qty"), 
										format:"11"
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
								] 
							},
							{
								view:"form",
								id:"receipts",
								elementsConfig:{labelPosition:"left" },
								elements:[
									{ 
										view:"text",
										name:"eventReceiptsQty",
										label:_("Quantity"),
										labelWidth:100, 
										format:"1111"
									},
									{ 
										view:"text",
										name:"eventReceiptsTot",
										label:_("Total"),
										labelWidth:100, 
										format:"1111.11"
									},
									{ 
										view:"text",
										name:"eventReceiptsTotPOS",
										label:_("Total POS"),
										labelWidth:100, 
										format:"1111.11"
									},
									{
										cols:[
											{ 
												view:"text",
												name:"eventReceiptsTicketFrom",
												label:_("Ticket From"),
												labelWidth:100, 
												format:"1111"
											},
											{ 
												view:"text",
												name:"eventReceiptsTicketTo",
												label:_("Ticket To"),
												format:"1111"
											}
										]
									}
								] 
							},
							{
								view:"form",
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
										format:"11"
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
										format:"11"
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
//			id:"event_window",
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
							        		this.$scope.$$('event_volunteers').editStop();
							        		var id = this.$scope.$$('event_volunteers').add(data, this.$scope.$$('event_volunteers').count());
							        		this.$scope.$$('event_volunteers').editRow(id);
							        		this.$scope.$$("event_volunteers").focusEditor({
							        		    row:id,
							        		    column:"volunteerId"
							        		});
							        	}
								    },
									{					
										view:"datatable",
										localId:"event_volunteers",
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
	
	showWindow(eventType, eventId) {
		
		
		const _ = this.app.getService("locale")._;
		const eventTypes = getEventTypes();
		
		this.setEventTypeName(eventType);

		this.$$("receipts").clear();		
		this.$$("event_volunteers").clearAll();

		var i;
		for(i=0; i < eventTypes.length; i++) {
			
			this.$$(eventTypes[i].id).clear();

			if(eventTypes[i].id != "EV") 
				this.$$("tabbar").hideOption(eventTypes[i].id);				
		}

		if(eventType != "EV") 
			this.$$("tabbar").showOption(eventType);
		
		if(eventId != null) {	
			
			const view = this;
    	    const event = getEvent(eventType, eventId, function() {
    			view.$$("toolbar_label").setValue(_("Update Event") + " " + event.getValues().eventText + " (" + eventType + "-" + eventId + ")");
    	
    			view.$$("receipts").setValues(event.getValues());
    			view.$$("event_volunteers").sync(getEventVolunteers(eventType, eventId));
    			
    			var i;
    			for(i=0; i < eventTypes.length; i++) {
  					view.$$(eventTypes[i].id).setValues(event.getValues());
    			}

    			view.getRoot().show();
    	    });
		}
		else {
			this.$$("toolbar_label").setValue(_("Insert Event") + " " + eventType);
			
			this.$$("EV").setValues({ eventTypeName: eventType });
			this.getRoot().show();
		}		
	}

	closex(){
		this.getRoot().close();
	}
	
	listProperties(obj) {
		var propList = "";
		for(var propName in obj) {
			if(typeof(obj[propName]) != "undefined") {
				propList += (propName + "=" + obj[propName] + ", ");
			}
		}
		alert(propList);
	}
	
	saveEvent() {
		const event = this.$$("EV").getValues();

		if(this.$$("PS") != null) {
			const eventPS = this.$$("PS").getValues();
		}
		if(this.$$("EP") != null) {
			const eventEP = this.$$("mEP").getValues();
		}
		if(this.$$("DP") != null) {
			const eventDP = this.$$("DP").getValues();
		}
		if(this.$$("PV") != null) {
			const eventDP = this.$$("PV").getValues();
		}
		const receipts = $$("form_receipts").serialize();
		const volunteers = this.$$("event_volunteers").serialize();
//		if (!this.$$("form").validate())
//			return;
		
		event.volunteers = volunteers
		
		alert(JSON.stringify(event));
		
		closex();
	}
	
	setEventTypeName(eventTypeName) {
		this.eventTypeName_ = eventTypeName;
	}
	
	getEventTypeName() {
		return this.eventTypeName_;
	}
}