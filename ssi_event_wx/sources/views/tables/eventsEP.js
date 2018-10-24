import {JetView} from "webix-jet";
import EventsTable from "views/tables/events";

export default class EventsTableEP extends EventsTable {
	config() {
		var config = super.config();
		config.eventType = "EP";
		
        config.columns.insertAt({
            id: "SSI_DISPOSAL_MATERIAL_KG",
            header: "Material(Kg)",
            format:webix.Number.numToStr({decimalSize:0}),
            css:{'text-align':'right'},
            sort:"int", 
            footer:{content:"summColumn"}
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

