import {JetView} from "webix-jet";
import {getEventTypes} from "models/eventTypes";

export default class FilterEventsView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		const eventTypes = getEventTypes();
		const date_format = "%d %M %Y";

		return {
			view:"form",
			borderless:true,
			elementsConfig:{ labelAlign:"right" },
			elements:[
				{
					view:"combo",
					id:"eventTypes:combo",
					name:"eventType",
					label:_("Type"), 
					placeholder:_("Select event type"),
					options:{
						data:eventTypes
					}
				},
				{
					view:"daterangepicker",
					localId:"event:date",
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
						this.$scope.app.callEvent("search:event",[data.eventDate]);
					}
				}
			]
		};
	}
}
	