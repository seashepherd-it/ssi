import {JetView} from "webix-jet";
import {getEvents} from "models/events";

export default class EventsView extends JetView {
	
	config(){
		const _ = this.app.getService("locale")._;
		const schema = [
			 { id:"SSI_EVENT_TYPE", header:"Type", sort:"string" },
			 { id:"SSI_EVENT_ID", header:"Id", sort:"int" },
			 { id:"SSI_EVENT_TEXT", header:_("Text"), fillspace:6, sort:"string" },
			 { id:"SSI_EVENT_DIVE", header:_("Dive"), fillspace:6, sort:"string" },
			 { id:"SSI_EVENT_PLACE_COUNTRY", header:_("Place"), fillspace:3, sort:"string"
			 },
			 { id:"SSI_EVENT_PLACE_PROVINCE", header:_("Province"), fillspace:2,
			 sort:"string" },
			 { id:"SSI_EVENT_DATE_FROM", header:_("Date From"), fillspace:3, sort:"date",
			 format:webix.i18n.longDateFormatStr},
			 { id:"SSI_EVENT_DATE_TO", header:_("Date To"), fillspace:3, sort:"date",
			 format:webix.i18n.longDateFormatStr},
			 { id:"SSI_EVENT_PEOPLE_QTY", header:"People", sort:"int" }
		 ];

		return {
			view:"datatable",
			autoConfig:true,
// localId:"datatable",
// select:true,
			 columns: schema
		};
	}
	
	urlChange(view, url){
		var eventType = this.getParam("eventType");
		view.clearAll();
		view.parse(getEvents(eventType));        
    }
	
	init(view){
		
		this.on(this.app,"search:event", (from,to,date) => {
			
			alert("ecchime!!");
			
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
