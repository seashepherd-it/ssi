import {JetView} from "webix-jet";
import EventsTable from "views/tables/events";

export default class EventsTableEV extends EventsTable {
	
	config() {
		var config = super.config();		
		config.eventType = "EV";		
		return config;
	}
}

