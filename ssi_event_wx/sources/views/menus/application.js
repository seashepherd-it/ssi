import {JetView, plugins} from "webix-jet";
import FilterEvents from "views/filters/events";
import ImportEvents from "views/forms/events";
import DownloadModels from "views/lists/events";
		
export default class LeftMenu extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		const theme = this.app.config.theme;

		return {
			view:"sidebar",
			css:theme,
			collapsed: false,
		    multipleOpen:true,
			data:[
				{ 
					id:"events", icon:"mdi mdi-timetable", value:_("Events"), 
					data:[
						{ id: "tables.eventsEV", icon:"mdi mdi-circle", value: _("Divulgazione")},
						{ id: "tables.eventsPS", icon:"mdi mdi-circle", value: _("Scuole")},
						{ id: "tables.eventsEP", icon:"mdi mdi-circle", value: _("Spiagge")},
						{ id: "tables.eventsDP", icon:"mdi mdi-circle", value: _("Fondali")},
						{ id: "tables.eventsPV", icon:"mdi mdi-circle", value: _("Visite")}
					]
				}
			],
			on:{
				onAfterSelect: function(id){
//					webix.message("Selected: "+this.getItem(id).value)
				}
			}
		};
	}
	
	init(sidebar){
		
		this.use(plugins.Menu,{
			id:sidebar
//			urls:{
//				"customers":"customers?user=1/information"
//			}
		});
		
		this.on(this.app,"menu:toggle",() => {
			sidebar.toggle();
		});
		
		sidebar.openAll();
	}
}