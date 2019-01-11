import {JetView} from "webix-jet";
import {getEventTypes} from "models/eventTypes";
import {getAreas} from "models/areas";
import {getProvinces} from "models/provinces";
import {getVolunteers} from "models/volunteers";

export default class EventFormEV extends JetView {
	
	config(){
		const _ = this.app.getService("locale")._;
		
		const date_format = "%d %M %Y";

		return {
			view:"form",
			gravity: 3,
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
		};
	}
}