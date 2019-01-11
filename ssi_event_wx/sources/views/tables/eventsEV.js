import EventsTable from "views/tables/events";

export default class EventsTableEV extends EventsTable {
	
	config() {
		var config = super.config("EV");
		return config;
	}
}

