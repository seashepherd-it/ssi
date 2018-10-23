import {JetView} from "webix-jet";
import EventsTable from "views/tables/events";

export default class EventsTableGC extends EventsTable {
	config() {
		var config = super.config();
		config.eventType = "GC";
		return config;
	}
}

