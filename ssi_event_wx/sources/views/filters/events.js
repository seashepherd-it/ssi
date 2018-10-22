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
<<<<<<< HEAD
			elementsConfig:{ labelAlign:"right" },
=======
			elementsConfig:{labelAlign:"right" },
>>>>>>> branch 'master' of https://github.com/seashepherd-it/ssi.git
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
<<<<<<< HEAD
						this.$scope.app.callEvent("search:event",[data.eventDate]);
=======
						if (data.departure_point || data.destination || data.departure_date){
							const from = data.departure_point ? cities[data.departure_point].value : "";
							const to = data.destination ? cities[data.destination].value : "";
							this.$scope.app.callEvent("search:event",[from,to,data.departure_date]);
						}
						else
							this.$scope.app.callEvent("search:event");
>>>>>>> branch 'master' of https://github.com/seashepherd-it/ssi.git
					}
				}
			]
		};
	}
}
	