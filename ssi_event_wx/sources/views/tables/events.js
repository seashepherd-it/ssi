import {JetView} from "webix-jet";
import {getEvents, deleteEvent} from "models/events";
import FilterEventsView from "views/filters/events";
import ImportEventsView from "views/forms/importEvents";
import SaveEventView from "views/forms/saveEvent";

export default class EventsTable extends JetView {

	config(eventType) {
		this.eventType_ = eventType;
		
		const _ = this.app.getService("locale")._;
		
		var actions = "<span class='mdi mdi-trash-can'></span><span class='mdi mdi-update'></span>";
		
		var columns = webix.toArray([ {
			id: "actions",
	        header: "Actions",
            adjust:true,	        
	        template: actions 
		} ]);
        
        columns.insertAt({
        	id:"SSI_EVENT_TYPE", 
        	header:"Type"
        }, columns.length);
        
        columns.insertAt({
            id: "SSI_EVENT_ID",
            header: "Id",
            adjust:true,           
            sort:"int"
          }, columns.length);
		
        columns.insertAt({
            id: "SSI_EVENT_TEXT",
            header: "Text",
//            width:280,
            adjust:true,
            sort:"string"
          }, columns.length);
        
        columns.insertAt({
            id: "SSI_AREA_ID",
            header: "Area Id"
          }, columns.length);
        
        columns.insertAt({
            id: "SSI_EVENT_DATE_FROM",
            header: "From",
            sort:"string"
          }, columns.length);
        
        columns.insertAt({
            id: "SSI_EVENT_DATE_TO",
            header: "To",       
            sort:"string"
          }, columns.length);

        columns.insertAt({
            id: "SSI_EVENT_ARGUMENT",
            header: "Argument",
            adjust:true,
            sort:"string"
          }, columns.length);        

        columns.insertAt({
            id: "SSI_EVENT_ACCOUNT_TEXT",
            header: "Account",
            adjust:true,
            sort:"string"
          }, columns.length);

        columns.insertAt({
            id: "SSI_EVENT_PLACE_COUNTRY",
            header: "Country",
            sort:"string"
          }, columns.length);
        
        columns.insertAt({
            id: "AN_SSI_AREA_V",
            header: "Area",
            adjust:true,
            sort:"string"
          }, columns.length);

        columns.insertAt({
            id: "SSI_EVENT_PLACE_PROVINCE",
            header: "Province",
            sort:"string"
          }, columns.length);

        columns.insertAt({
            id: "SSI_EVENT_PLACE",
            header: "Place",
            adjust: true,
            sort:"string"
          }, columns.length);

        columns.insertAt({
            id: "SSI_EVENT_LINK",
            header: "Link",
            adjust:true,
            sort:"string",
            template:"<a href='#SSI_EVENT_LINK#' target='_new'>#SSI_EVENT_LINK#</a>"
          }, columns.length);

        columns.insertAt({
            id: "SSI_EVENT_NOTE",
            header: "Note",
            adjust:true,
            sort:"string"
          }, columns.length);
        
        columns.insertAt({
            id: "SSI_EVENT_DAYS",
            header: "Days",
            adjust:true,            
            format:webix.Number.numToStr({decimalSize:0}),
            css:{'text-align':'right'},        
            sort:"int",
            footer:{content:"summColumn", css:{'text-align':'right'}}
          }, columns.length);

        columns.insertAt({
            id: "SSI_EVENT_PEOPLE_QTY",
            header: "People",
            adjust:true,            
            format:webix.Number.numToStr({decimalSize:0}),
            css:{'text-align':'right'},
            sort:"int", 
            footer:{content:"summColumn", css:{'text-align':'right'}}
          }, columns.length);
        
        columns.insertAt({
            id: "SSI_VOLUNTEER_TOT",
            header: "Volunteers",
            adjust:true,            
            format:webix.Number.numToStr({decimalSize:0}),
            css:{'text-align':'right'},
            sort:"int", 
            footer:{content:"summColumn", css:{'text-align':'right'}}
          }, columns.length);        

        columns.insertAt({
            id: "SSI_VOLUNTEER_HOURS",
            header: "Hours",
            adjust:true,            
            format:webix.Number.numToStr({decimalSize:0}),
            css:{'text-align':'right'},
            sort:"int", 
            footer:{content:"summColumn", css:{'text-align':'right'}}
          }, columns.length);

        columns.insertAt({
            id: "SSI_EVENT_RECEIPTS_TOT",
            header: "Receipts Tot",
            adjust:true,            
            format:webix.Number.numToStr({decimalSize:0}),
            css:{'text-align':'right'},
            sort:"int", 
            footer:{content:"summColumn", css:{'text-align':'right'}}
          }, columns.length);

        columns.insertAt({
            id: "SSI_EVENT_RECEIPTS_QTY",
            header: "Receipts Qty",
            adjust:true,            
            format:webix.Number.numToStr({decimalSize:0}),
            css:{'text-align':'right'},
            sort:"int", 
            footer:{content:"summColumn", css:{'text-align':'right'}}
          }, columns.length);
        
        var datatable = {
				view:"datatable",
				localId:"events_table",
				dragColumn:true,
				headermenu:true,
				footer:true,
				leftSplit:4,
				resizeColumn:true,
				columns: columns,
			    onClick:{ 
			    	"mdi-trash-can": function  (event, id, node) {
				    	var dtable = this;
			    	    var event = dtable.getItem(id);
				    	webix.confirm("Delete " + event.SSI_EVENT_TEXT + "?", function(action) {
					    if(action === true) {
					    	if(deleteEvent(event.SSI_EVENT_TYPE, event.SSI_EVENT_ID) === true)
					    		dtable.remove(id.row);
					    	}
				    	});
			    	},
			    	"mdi-update": function  (event, id, node) {
				    	var dtable = this;
			    	    var item = dtable.getItem(id);
			    	    this.$scope.saveEvent.showWindow(item.SSI_EVENT_TYPE, item.SSI_EVENT_ID);
			    	}
			    }			
			}
        
        this.setDatatable(datatable);
        
		return {
			id: "listEvents",
			rows:[ 
				{					
					view:"toolbar",
//					css:theme,
					cols:[
						{ view:"label", template:_("Events") },
						{ view: "icon",  icon:"mdi mdi-plus-box-outline",
							click:() => this.saveEvent.showWindow(this.getEventType())
						},						
						{ view: "icon",  icon:"mdi mdi-filter-outline", 
							click:() => this.setFilter.showWindow()
						},
						{ view: "icon",  icon:"mdi mdi-file-upload", 
							click:() => this.importEvents.showWindow()
						},
						{ view: "icon",  icon:"mdi mdi-file-excel",
							click:() => this.download()
						}
					]
				},
				datatable
			]
		}
	}
	
	init(config) {
		
		var datatable = this.$$("events_table");

//		this.importEvents = this.ui(ImportEventsView);
		this.setFilter = this.ui(FilterEventsView);
		this.saveEvent = this.ui(SaveEventView);
		
		datatable.hideColumn("SSI_EVENT_TYPE");
		datatable.hideColumn("SSI_EVENT_PLACE_COUNTRY");
		datatable.hideColumn("SSI_AREA_ID");
		
		datatable.clearAll();
		
		datatable.sync(getEvents(this.getEventType()));
		
		this.on(this.app,"search:event", (eventDate, eventArea) => {

			datatable.hideOverlay();
						
			if (eventDate) {
				var myparse = webix.Date.strToDate("%d %M %Y");
				var dateFrom = myparse(eventDate.start);
				var dateTo = myparse(eventDate.end);

				myparse = webix.Date.dateToStr("%Y-%m-%d");
				dateFrom = myparse(dateFrom);
				dateTo = myparse(dateTo);
				
				datatable.filter(obj => {				
					if((obj.SSI_EVENT_DATE_FROM >= dateFrom) && (obj.SSI_EVENT_DATE_TO <= dateTo))
						return true;
					else 
						return false;
				});
			}

			if(eventArea) {
				datatable.filter(obj => {				
					if(obj.SSI_AREA_ID == eventArea)
						return true;
					else 
						return false;
				});
			}
			
			if(eventDate == null && area == null)
				datatable.filter();			
			
			if (datatable.count() === 0)
				datatable.showOverlay("Sorry, there are no events");
		});
	}
	
	getEventType() {
		return this.eventType_;
	}
	
	setDatatable(datatable) {
		this.datatable_ = datatable;
	}
	
	getDatatable() {
		return this.datatable_;
	}
	
	download() {
		webix.toExcel(this.$$("events_table"));		
	}
}