import {JetView} from "webix-jet";
import {getAreas} from "models/areas";

export default class FilterEventsView extends JetView {
	
	config(){
		const _ = this.app.getService("locale")._;
		const areas = getAreas();
		const date_format = "%d %M %Y";

		return {
			view:"form",
			borderless:true,
			elementsConfig:{labelAlign:"right" },
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
					view:"button",
					type:"form",
					value:_("Search"),
					click:function(){
						const data = this.getFormView().getValues();
						this.$scope.app.callEvent("search:event",[data.eventDate, data.eventArea]);
					}
				}
			]
		};
	}
}
	