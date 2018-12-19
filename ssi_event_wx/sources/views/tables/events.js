import {JetView} from "webix-jet";
import {getEvents} from "models/events";

export default class EventsTable extends JetView {
	
	config(){
		const _ = this.app.getService("locale")._;
		var actions = "<span class='mdi mdi-trash-can'></span><span class='mdi mdi-update'></span>";
		
		var config = {
			view:"datatable",
			id:"events",
			dragColumn:true,
			headermenu:true,
			footer:true,
			leftSplit:4,
			resizeColumn:true,
			eventType: null,
		    onClick:{ 
		    	"mdi-trash-can": function  (event, id, node) {
		    		var dtable = this;
		    	    webix.confirm("Are you sure, to delete this?", function(action) {
			    	    if(action === true) {
			    	    	dtable.remove(id.row)
			    	    }
		    	    });
		        },
		    	"mdi-update": function  (event, id, node) {
		    		var dtable = this;
		    	    webix.confirm("Are you sure, to update this?", function(action) {
			    	    if(action === true) {
			    	    	dtable.remove(id.row)
			    	    }
		    	    });
		        }

		    }
		}
			
		var columns = [ {
			id: "actions",
	        header: "Actions",
            adjust:true,	        
	        template: actions 
		} ];
		
        config.columns = webix.toArray(columns);

        config.columns.insertAt({
        	id:"SSI_EVENT_TYPE", 
        	header:"Type"
        }, config.columns.length);

        config.columns.insertAt({
            id: "SSI_EVENT_ID",
            header: "Id",
            adjust:true,           
            sort:"int"
          }, config.columns.length);

        config.columns.insertAt({
            id: "SSI_EVENT_TEXT",
            header: "Text",
            width:280,
//            adjust:true,
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
            id: "SSI_EVENT_PEOPLE_QTY",
            header: "People",
            adjust:true,            
            format:webix.Number.numToStr({decimalSize:0}),
            css:{'text-align':'right'},
            sort:"int", 
            footer:{content:"summColumn", css:{'text-align':'right'}}
          }, config.columns.length);
        
        config.columns.insertAt({
            id: "SSI_EVENT_ARGUMENT",
            header: "Argument",
            adjust:true,
            sort:"string"
          }, config.columns.length);
        
        config.columns.insertAt({
            id: "SSI_EVENT_DATE_FROM",
            header: "From",
//            format:webix.i18n.dateFormatStr,
            sort:"string"
          }, config.columns.length);
        
        config.columns.insertAt({
            id: "SSI_EVENT_DATE_TO",
            header: "To",
//          format:webix.i18n.dateFormatStr,            
            sort:"string"
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
