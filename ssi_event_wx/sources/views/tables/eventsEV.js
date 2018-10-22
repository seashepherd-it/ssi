import {JetView} from "webix-jet";
import EventsView from "views/tables/events";

export default class EventsViewEV extends EventsView {
	
	config() {
		var config = super.config();		
		config.eventType = "EV";		
		return config;
	}
}

