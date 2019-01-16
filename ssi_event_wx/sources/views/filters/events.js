import {JetView} from "webix-jet";
import {getEventStates} from "models/eventStates";
import {getVolunteers} from "models/volunteers";
import {getAreas} from "models/areas";

export default class FilterEventsView extends JetView {
	
	config(){
		const _ = this.app.getService("locale")._;

		return {
			view:"window",
			position:"center",
//			modal:true,
			move:true,
			resize:true,
			head:_("Filter Events"),
			body:{	
				view:"form",
				localId:"form_filter",
				elementsConfig:{labelPosition:"top" },
				elements:[
					{
						view:"combo",
						name:"eventStatus",
						label:_("Status"), 
						placeholder:_("Select status"),
						required:false,
						options:{
							data:getEventStates()
						}
					},
					{
						view:"daterangepicker",
						name:"eventDate",
						label:_("Event Date"),
						value:{start: webix.Date.add(new Date(), -2, "year"), end: webix.Date.add(new Date(), 1, "month")}
					},
					{ 
						view:"combo",
						name:"eventAccount",
						label:_("Account"),
						options:{ 
							data:getVolunteers()
						}
					},																			
					{
						view:"combo",
						name:"eventArea",
						label:_("Area"), 
						placeholder:_("Select area"),
						required:false,
						options:{
							data:getAreas()
						}
					},
					{
						cols:[
							{
								view:"button", value:_("Close"),
								click:() => this.closex()
							},
							{
								view:"button",
								value:_("Search"), type:"form",
								click:() => this.searchEvents()
							}
						]
					}
				]
			}
		};
	}
	showWindow(){
		this.getRoot().show();
	}
	closex(){
		this.getRoot().hide();
	}
	searchEvents() {
		const data = this.$$("form_filter").getValues();
		this.app.callEvent("search:event",[data.eventDate, data.eventArea, data.eventStatus, data.eventAccount]);
	}
}