import {JetView} from "webix-jet";
import EventsTable from "views/tables/events";

export default class EventsTableEP extends EventsTable {
	config() {
		var config = super.config("EP");

		var datatable = this.getDatatable();
		var columns = webix.toArray(datatable.columns);
		
        columns.insertAt({
            id: "SSI_DISPOSAL_MATERIAL_KG",
            header: "Material(Kg)",
            format:webix.Number.numToStr({
                groupSize:3,
                groupDelimiter:".",
                decimalSize:2,
                decimalDelimiter:","
            }),
            css:{'text-align':'right'},
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

