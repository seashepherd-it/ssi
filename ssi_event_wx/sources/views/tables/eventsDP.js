import {JetView} from "webix-jet";
import EventsTable from "views/tables/events";

export default class EventsTableDP extends EventsTable {
	config() {
		var config = super.config("DP");

		var datatable = this.getDatatable();
		var columns = webix.toArray(datatable.columns);
				
        columns.insertAt({
            id: "SSI_EVENT_DIVE",
            header: "Dive",
            adjust: true,
            sort:"string"
          }, columns.length);
		
        columns.insertAt({
            id: "SSI_DISPOSAL_MATERIAL_KG",
            header: "Material",
            format:webix.Number.numToStr({decimalSize:0}),
            sort:"int",
            footer:{content:"summColumn", css:{'text-align':'right'}},
            css:{'text-align':'right'}
          }, columns.length);
		
        columns.insertAt({
            id: "SSI_DISPOSAL_CONTACT",
            header: "Contact",
            adjust: true,
            sort:"string"
          }, columns.length);
		
		datatable.columns = columns;
		
		return config;
	}
	
	init(view) {
		super.init(view);
		
		this.$$("events_table").hideColumn("SSI_EVENT_ARGUMENT");
	}
}

