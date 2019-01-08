import {JetView} from "webix-jet";
import {getEventTypes} from "models/eventTypes";
import {getAreas} from "models/areas";
import {getVolunteers} from "models/volunteers";
import {getProvinces} from "models/provinces";
import {getEvent, getEventVolunteers, getEvents, deleteEvent} from "models/events";
import SaveEventVolunteersView from "views/forms/saveEventVolunteers";

export default class SaveEventView extends JetView {
	
	config(){
		const _ = this.app.getService("locale")._;
		
		const eventTypes = getEventTypes();
		const areas = getAreas();
		const provinces = getProvinces();
		
		const date_format = "%d %M %Y";

		return {
			view:"window",
			position:"center",
			modal:false,
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
				view:"form",
				localId:"form",
				elementsConfig:{labelPosition:"left" },
				cols:[
					{
						gravity: 2,
						rows:[
							{
								view:"combo",
								name:"eventType",
								label:_("Type"), 
								options:{
									data:eventTypes
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
									data:areas
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
											data:provinces
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
								name:"eventDive",
								label:_("Dive")
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
							},					
							{
								cols:[
									{
										view:"button", value:_("Close"),
										click:() => this.close()
									},
									{
										view:"button",
										value:_("Save"), type:"form",
										click:() => this.saveEvent()
									}
								]
							}
		
						]
					}, 
					SaveEventVolunteersView
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
			}
		};
	}
	
	showWindow(eventType, eventId){
		const _ = this.app.getService("locale")._;
			
		const view = this;
		
		if(eventId != null) {			
    	    const event = getEvent(eventType, eventId, function() {
    			view.$$("toolbar_label").setValue(_("Update Event") + " " + event.getValues().eventText + " (" + eventType + "-" + eventId + ")");
    			view.$$("form").setValues(event.getValues());
    			$$("event_volunteers").sync(getEventVolunteers(eventType, eventId));
    			view.getRoot().show();
    	    });
		}
		else {
			this.$$("toolbar_label").setValue(_("Insert Event") + " " + eventType);
			this.$$("form").clear();
			$$("event_volunteers").clearAll();
			view.getRoot().show();
		}
	}

	close(){
		this.getRoot().hide();
	}
	
	saveEvent() {
		const event = this.$$("form").getValues();
		const volunteers = $$("event_volunteers").serialize();
//		if (!this.$$("form").validate())
//			return;
		
		event.volunteers = volunteers
		
		alert(JSON.stringify(event));
		
		this.close();
	}
}