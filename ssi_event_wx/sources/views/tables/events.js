import {JetView} from "webix-jet";
import {getEvents} from "models/events";

export default class EventsView extends JetView {

	config(){
		const _ = this.app.getService("locale")._;
<<<<<<< HEAD
		
		var config = {
			localId:"events",
=======
		const schema = [
			 { id:"SSI_EVENT_TYPE", header:"Type", sort:"string" },
			 { id:"SSI_EVENT_ID", header:"Id", sort:"int" },
			 { id:"SSI_EVENT_TEXT", header:_("Text"), fillspace:6, sort:"string" },
			 { id:"SSI_EVENT_DIVE", header:_("Dive"), fillspace:6, sort:"string" },
			 { id:"SSI_EVENT_PLACE_COUNTRY", header:_("Place"), fillspace:3, sort:"string"
			 },
			 { id:"SSI_EVENT_PLACE_PROVINCE", header:_("Province"), fillspace:2,
			 sort:"string" },
			 { id:"SSI_EVENT_DATE_FROM", header:_("Date From"), fillspace:3, sort:"date",
			 format:webix.i18n.longDateFormatStr},
			 { id:"SSI_EVENT_DATE_TO", header:_("Date To"), fillspace:3, sort:"date",
			 format:webix.i18n.longDateFormatStr},
			 { id:"SSI_EVENT_PEOPLE_QTY", header:"People", sort:"int" }
		 ];

		return {
>>>>>>> branch 'master' of https://github.com/seashepherd-it/ssi.git
			view:"datatable",
<<<<<<< HEAD
			eventType: null
=======
			autoConfig:true,
// localId:"datatable",
// select:true,
			 columns: schema
>>>>>>> branch 'master' of https://github.com/seashepherd-it/ssi.git
		};
				
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
				
		view.parse(getEvents(view.config.eventType));
		
<<<<<<< HEAD
		this.on(this.app,"search:event", (eventDate) => {

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
=======
		this.on(this.app,"search:event", (from,to,date) => {
			
			alert("ecchime!!");
			
			grid.hideOverlay();
			if (from || to || date)
				grid.filter(obj => {
					const data_from = from ? obj.direction.indexOf(from) : 0;
					const data_to = to ? obj.direction.indexOf(to) : 100;
					const date_f = date ? obj.date.toString().slice(0,14) === date.toString().slice(0,14) : 1;
					return data_from !== -1 && data_to !== -1 && data_from < data_to && date_f;
>>>>>>> branch 'master' of https://github.com/seashepherd-it/ssi.git
				});
			}
			else
				view.filter();
			
			if (view.count() === 0)
				view.showOverlay("Sorry, there are no events");
		});
	}
}
