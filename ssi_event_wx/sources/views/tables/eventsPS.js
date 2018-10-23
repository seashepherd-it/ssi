import {JetView} from "webix-jet";
import EventsTable from "views/tables/events";

export default class EventsTablePS extends EventsTable {
	config() {
		var config = super.config();
		config.eventType = "PS";
		
        config.columns.insertAt({
            id: "SSI_INSTITUTE_TYPE",
            header: "Institute Type",
            adjust:true,
            sort:"string"
          }, config.columns.length);
        
        config.columns.insertAt({
            id: "SSI_INSTITUTE_NAME",
            header: "Institute Name",
            adjust:true,
            sort:"string"
          }, config.columns.length);
        
        config.columns.insertAt({
            id: "SSI_INSTITUTE_SPEAKER",
            header: "Institute Speaker",
            adjust:true,
            sort:"string"
          }, config.columns.length);
        
        config.columns.insertAt({
            id: "SSI_INSTITUTE_CONTACT",
            header: "Institute Contact",
            adjust:true,
            sort:"string"
          }, config.columns.length);
        
        return config;
	}
}

