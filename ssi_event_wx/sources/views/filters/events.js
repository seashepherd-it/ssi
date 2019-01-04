import {JetView} from "webix-jet";
import {getAreas} from "models/areas";

export default class FilterEventsView extends JetView {
	
	config(){
		const _ = this.app.getService("locale")._;
		const areas = getAreas();
		const date_format = "%d %M %Y";

		return {
			view:"window",
			position:"center",
//			modal:true,
			move:true,
			resize:true,
			head:_("Filter Events"),
			body:{	
				view:"form",
				localId:"form",
				elementsConfig:{labelPosition:"top" },
				elements:[
					{
						view:"combo",
						name:"eventArea",
						label:_("Area"), 
						placeholder:_("Select area"),
						options:{
							data:areas
						}
					},				
					{
						view:"daterangepicker",
						name:"eventDate",
						label:_("Event Date"),
						value:{start: webix.Date.add(new Date(), -2, "year"), end: webix.Date.add(new Date(), 1, "month")},
						format:date_format
					},
					{
						cols:[
							{
								view:"button", value:_("Close"),
								click:() => this.close()
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
	close(){
		this.getRoot().hide();
	}
	searchEvents() {
		const data = this.$$("form").getValues();
		this.app.callEvent("search:event",[data.eventDate, data.eventArea]);
//		this.close();
	}
}
	