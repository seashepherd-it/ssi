import {JetView} from "webix-jet";
import EventsTable from "views/tables/events";

export default class EventsTablePV extends EventsTable {
	config() {
		var config = super.config("PV");

		var datatable = this.getDatatable();
		var columns = webix.toArray(datatable.columns);
		
		columns.insertAt({
            id: "SSI_SHIP_NAME",
            header: "Ship Name",
            adjust:true,
            sort:"string"
          }, columns.length);

		columns.insertAt({
            id: "SSI_INSTITUTE_TYPE_TEXT",
            header: "Institute Type",
            adjust:true,
            sort:"string"
          }, columns.length);
        
		columns.insertAt({
            id: "SSI_INSTITUTE_NAME",
            header: "Institute Name",
            adjust:true,
            sort:"string"
          }, columns.length);
        
		columns.insertAt({
            id: "SSI_INSTITUTE_SPEAKER",
            header: "Institute Speaker",
            adjust:true,
            sort:"string"
          }, columns.length);
        
		columns.insertAt({
            id: "SSI_INSTITUTE_CONTACT",
            header: "Institute Contact",
            adjust:true,
            sort:"string"
          }, columns.length);
		
		datatable.columns = columns;
		
        return config;
	}
}

