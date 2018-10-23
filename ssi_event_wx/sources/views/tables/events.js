import {JetView} from "webix-jet";
import {getEvents} from "models/events";

export default class EventsView extends JetView {
	
	config(){
		const _ = this.app.getService("locale")._;
		var config = {
			localId:"events",
			view:"datatable",
			eventType: null
		}
			
		var columns = [
			{ id:"SSI_EVENT_TYPE", header:"Type" }
		];
		
        config.columns = webix.toArray(columns);

        config.columns.insertAt({
            id: "SSI_EVENT_ID",
            header: "Id",
            adjust:true,           
            sort:"int"
          }, config.columns.length);

        config.columns.insertAt({
            id: "SSI_EVENT_TEXT",
            header: "Text",
            adjust:true,
            sort:"string"
          }, config.columns.length);
        
        config.columns.insertAt({
            id: "SSI_AREA_ID",
            header: "Area Id"
          }, config.columns.length);
        
        config.columns.insertAt({
            id: "AN_SSI_AREA_V",
            header: "Area",
            adjust:true,
            sort:"string"
          }, config.columns.length);
        
        config.columns.insertAt({
            id: "SSI_EVENT_ARGUMENT",
            header: "Argument",
            adjust:true,
            sort:"string"
          }, config.columns.length);

        config.columns.insertAt({
            id: "SSI_EVENT_PEOPLE_QTY",
            header: "People",
            adjust:true,            
            format:webix.Number.numToStr({decimalSize:0}),
            css:{'text-align':'right'},
            sort:"int"
          }, config.columns.length);
        
        config.columns.insertAt({
            id: "SSI_EVENT_DATE_FROM",
            header: "From",
//            format:webix.i18n.dateFormatStr,
            sort:"date"
          }, config.columns.length);
        
        config.columns.insertAt({
            id: "SSI_EVENT_DATE_TO",
            header: "To",
//          format:webix.i18n.dateFormatStr,            
            sort:"date"
          }, config.columns.length);

        config.columns.insertAt({
            id: "SSI_EVENT_PLACE_COUNTRY",
            header: "Country",
            sort:"string"
          }, config.columns.length);

        config.columns.insertAt({
            id: "SSI_EVENT_PLACE_PROVINCE",
            header: "Province",
            sort:"string"
          }, config.columns.length);

        config.columns.insertAt({
            id: "SSI_EVENT_PLACE",
            header: "Place",
            adjust: true,
            sort:"string"
          }, config.columns.length);
        
		return config;
	}
	
	init(view){		
		view.hideColumn("SSI_EVENT_TYPE");
		view.hideColumn("SSI_AREA_ID");
				
		view.parse(getEvents(view.config.eventType));
		
		this.on(this.app,"search:event", (eventDate, eventArea) => {

			view.hideOverlay();
						
			if (eventDate) {
				var myparse = webix.Date.strToDate("%d %M %Y");
				var dateFrom = myparse(eventDate.start);
				var dateTo = myparse(eventDate.end);

				myparse = webix.Date.dateToStr("%Y-%m-%d");
				dateFrom = myparse(dateFrom);
				dateTo = myparse(dateTo);
				
				view.filter(obj => {				
					if((obj.SSI_EVENT_DATE_FROM >= dateFrom) && (obj.SSI_EVENT_DATE_TO <= dateTo))
						return true;
					else 
						return false;
				});
			}

			if(eventArea) {
				view.filter(obj => {				
					if(obj.SSI_AREA_ID == eventArea)
						return true;
					else 
						return false;
				});
			}
			
			if(eventDate == null && area == null)
				view.filter();			
			
			if (view.count() === 0)
				view.showOverlay("Sorry, there are no events");
		});
	}
}
