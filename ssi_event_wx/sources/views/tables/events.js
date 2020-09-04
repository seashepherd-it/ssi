import {JetView} from "webix-jet";
import {getEvents, deleteEvent} from "models/events";
import FilterEventsView from "views/filters/events";
import ImportEventsView from "views/forms/importEvents";
import SaveEventView from "views/forms/saveEvent";
import {getUserInfo} from "models/users";

export default class EventsTable extends JetView {

	config(eventType) {
		this.eventType_ = eventType;
		
		const _ = this.app.getService("locale")._;
		
		var columns = webix.toArray([]);
        
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
        	id:"SSI_EVENT_STATUS", 
        	header:"Status",
            adjust:true,
            sort:"string"
        }, columns.length);
        
        columns.insertAt({
        	id:"SSI_EVENT_STATUS_TEXT", 
        	header:"Status",
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
            id: "SSI_EVENT_ACCOUNT_ID",
            header: "Account Id",
            adjust:true
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
				leftSplit:3,
				resizeColumn:true,
				columns: columns,
				select:true,
				onContext:{}		
			}
        
        this.setDatatable(datatable);
        
		return {
			id: "events_list",
			rows:[ 
				{					
					view:"toolbar",
//					css:theme,
					cols:[
						{ view:"label", label:_("Events")},
						{ view: "icon",  icon:"mdi mdi-refresh", 
							click:() =>  this.reloadData()
						},
						{ view: "icon",  icon:"mdi mdi-filter-outline", 
							click:() => this.ui(FilterEventsView).showWindow()
						},
						{ view: "icon",  icon:"mdi mdi-plus-box-outline",
							click:() => this.ui(SaveEventView).showWindow(this.getEventType())
						},						
						{ view: "icon",  icon:"mdi mdi-file-upload", 
							click:() => this.ui(ImportEventsView).showWindow()
						},
						{ view: "icon",  icon:"mdi mdi-file-excel",
							click:() => this.download()
						},
						{ view:"icon", icon:"mdi mdi-menu",
						  click:() => this.app.callEvent("menu:toggle")
						}				
					]
				},
				datatable
			]
		}
	}
	
	init(config) {
		
		var datatable = this.$$("events_table");
	
		datatable.hideColumn("SSI_EVENT_TYPE");
		datatable.hideColumn("SSI_EVENT_STATUS");
		datatable.hideColumn("SSI_EVENT_PLACE_COUNTRY");
		datatable.hideColumn("SSI_AREA_ID");
		datatable.hideColumn("SSI_EVENT_ACCOUNT_ID");
		
		datatable.$scope.reloadData();

		var eventMenu = webix.ui({
	        view:"contextmenu",
//		    id:"event_menu",
	        data:[
                {id:"modify",value:"Modify"},
                {id:"delete",value:"Delete"}
                ],
	        on:{
	            onItemClick:function(id) {
        	    	var contextMenu = this;
	                var context = this.getContext();
	                var itemMenu = contextMenu.getItem(id);
	                var dtable = context.obj;	                
	                var rowId = context.id;
	                var event = dtable.getItem(rowId);

//	                if(itemMenu.isEnabled()) {
	                	switch(itemMenu.id){
			                case 'modify': {
			                	dtable.$scope.ui(SaveEventView).showWindow(event.SSI_EVENT_TYPE, event.SSI_EVENT_ID);
			                  break;
			                }
			                case 'delete': {
						    	webix.confirm("Delete " + event.SSI_EVENT_TEXT + "?", function(action) {
								    if(action == true) {
								    	deleteEvent(event.SSI_EVENT_TYPE, event.SSI_EVENT_ID);
								    	dtable.remove(rowId);
								    }
						    	});
			                  break;
		                	}
		                }
//	            	}
	        	}
	        }
		});
	
//	    var eventMenu = $$("event_menu");
	    eventMenu.attachTo(datatable);
	    
	    datatable.attachEvent('onAfterContextMenu', function(id, e, node) {
    		eventMenu.showItem("modify");	
    		eventMenu.showItem("delete");
    		
	    	var event = datatable.getItem(id);
	    	if(event.SSI_EVENT_STATUS == "80") {
	    		eventMenu.hideItem("modify");	
	    		eventMenu.hideItem("delete");
	    		
	            var userInfo = getUserInfo(() => {
	    	    	if(userInfo.getValues().userLevel >= 5) {
	    	    		eventMenu.showItem("modify");	
	    	    		eventMenu.showItem("delete");
	    	    	}		        	    		
        	    });
	    	}
	    });
	    
		this.on(this.app,"search:event", (eventDate, eventArea, eventStatus, eventAccount) => {

			if (eventDate) {
				var myparse = webix.Date.strToDate("%d %M %Y");
				var dateFrom = myparse(eventDate.start);
				var dateTo = myparse(eventDate.end);

				myparse = webix.Date.dateToStr("%Y-%m-%d");
				dateFrom = myparse(dateFrom);
				dateTo = myparse(dateTo);
							
				datatable.filter(obj => {				
					if((dateFrom == "" || obj.SSI_EVENT_DATE_FROM >= dateFrom) && (dateTo == "" || obj.SSI_EVENT_DATE_TO <= dateTo))
						return true;
					else 
						return false;
				});
			}

			if(eventArea != "") {
				datatable.filter(obj => {				
					if(obj.SSI_AREA_ID == eventArea)
						return true;
					else 
						return false;
				});
			}

			if(eventStatus != "") {
				datatable.filter(obj => {
					if(obj.SSI_EVENT_STATUS == eventStatus)
						return true;
					else 
						return false;
				});
			}

			if(eventAccount != "") {
				datatable.filter(obj => {				
					if(obj.SSI_EVENT_ACCOUNT_ID == eventAccount)
						return true;
					else 
						return false;
				});
			}

			if(eventDate == null && eventArea == null && eventStatus == null && eventAccount == null)
				datatable.filter();			
			
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
	
	reloadData() {
		var datatable = this.$$("events_table");

		datatable.clearAll();		
		datatable.sync(getEvents(this.getEventType()));		
	}
	
	download() {
		webix.toExcel(this.$$("events_table"));		
	}
}
