import {JetView} from "webix-jet";
import {getEvents} from "models/events";

export default class EventsView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		return {
			rows:[
				{
					view:"datatable",
					localId:"datatable",
					select:true,
					columns:[
						{ id:"SSI_EVENT_TYPE", header:"Type", sort:"string" },						
						{ id:"SSI_EVENT_ID", header:"Id", sort:"int" },
						{ id:"SSI_EVENT_TEXT", header:_("Text"), fillspace:6, sort:"string" },
						{ id:"SSI_EVENT_DIVE", header:_("Dive"), fillspace:6, sort:"string" },
						{ id:"SSI_EVENT_PLACE_COUNTRY", header:_("Place"), fillspace:3, sort:"string" },						
						{ id:"SSI_EVENT_PLACE_PROVINCE", header:_("Province"), fillspace:2, sort:"string" },						
						{ id:"SSI_EVENT_DATE_FROM", header:_("Date From"), fillspace:3, sort:"date", format:webix.i18n.longDateFormatStr},
						{ id:"SSI_EVENT_DATE_TO", header:_("Date To"), fillspace:3, sort:"date", format:webix.i18n.longDateFormatStr},
						{ id:"SSI_EVENT_PEOPLE_QTY", header:"People", sort:"int" }
					]
				}
			]
		};
	}
	init(){
		const grid = this.$$("datatable");
		grid.sync(getEvents());

		this.on(this.app,"search:event", (from,to,date) => {
			grid.hideOverlay();
			if (from || to || date)
				grid.filter(obj => {
					const data_from = from ? obj.direction.indexOf(from) : 0;
					const data_to = to ? obj.direction.indexOf(to) : 100;
					const date_f = date ? obj.date.toString().slice(0,14) === date.toString().slice(0,14) : 1;
					return data_from !== -1 && data_to !== -1 && data_from < data_to && date_f;
				});
			else
				grid.filter();
			if (grid.count() === 0)
				grid.showOverlay("Sorry, there are no events for this route");
		});
	}
}
