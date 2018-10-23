import {JetView} from "webix-jet";
import EventsTable from "views/tables/events";

export default class EventsTableDP extends EventsTable {
	config() {
		var config = super.config();
		config.eventType = "DP";

        config.columns.insertAt({
            id: "SSI_DISPOSAL_MATERIAL_KG",
            header: "Material",
            sort:"int"
          }, config.columns.length);
		
        config.columns.insertAt({
            id: "SSI_DISPOSAL_CONTACT",
            header: "Contact",
            adjust: true,
            sort:"string"
          }, config.columns.length);
        
		return config;
	}
	
	init(view) {
		super.init(view);
		
		view.hideColumn("SSI_EVENT_ARGUMENT");
	}
}

