import {JetView} from "webix-jet";
import {getEventTypes} from "models/eventTypes";
import {getAreas} from "models/areas";
import {getVolunteers} from "models/volunteers";

export default class InsertEventView extends JetView {
	
	config(){
		const _ = this.app.getService("locale")._;
		const eventTypes = getEventTypes();
		const areas = getAreas();
		const volunteers = getVolunteers();
		
		const date_format = "%d %M %Y";

		return {
			view:"window",
			position:"center",
			modal:true,
			move:true,
			resize:true,
			head:_("Insert Event"),
			width:800,
			body:{	
				view:"form",
				localId:"form",
				elementsConfig:{labelPosition:"left" },
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
						name:"text",
						label:_("Text")
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
						view:"text",
						name:"eventDive",
						label:_("Dive")
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
						name:"eventPlaceCountry",
						label:_("Country")
					},
					{ 
						view:"text",
						name:"eventPlaceProvince",
						label:_("Province")
					},
					{ 
						view:"text",
						name:"eventPlace",
						label:_("Place")
					},
					{ 
						view:"combo",
						name:"eventAccount",
						label:_("Account"),
//						suggest: volunteers
						options:{
							data:volunteers
						}
					},
					{ 
						view:"text",
						name:"eventArgument",
						label:_("Argument")
					},
					{ 
						view:"text",
						name:"eventPeopleQty",
						label:_("People Qty")
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
								value:_("Insert"), type:"form",
								click:() => this.insertEvent()
							}
						]
					}

				],
				rules:{
					text:webix.rules.isNotEmpty,
					areaId:webix.rules.isNotEmpty,
					eventDate:webix.rules.isNotEmpty,
					areaId:webix.rules.isNotEmpty,
					eventPlaceProvince:webix.rules.isNotEmpty,
					eventPlace:webix.rules.isNotEmpty
				}
			}
		};
	}
	showWindow(){
		this.getRoot().show();
	}
	close(){
		this.getRoot().hide();
	}
	insertEvent() {
		const event = this.$$("form").getValues();
		if (this.$$("form").validate()){
			this.app.callEvent("add:event",[event]);
			this.close();
		}
	}
}
	