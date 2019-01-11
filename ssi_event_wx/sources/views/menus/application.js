import {JetView, plugins} from "webix-jet";
		
export default class ApplicationMenu extends JetView {
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
					icon:"mdi mdi-timetable", value:_("Events"), 
					data:[
						{ id: "tables.eventsEV", icon:"mdi mdi-circle", value: "Divulgazione"},
						{ id: "tables.eventsPS", icon:"mdi mdi-circle", value: "Scuole"},
						{ id: "tables.eventsEP", icon:"mdi mdi-circle", value: "Spiagge"},
						{ id: "tables.eventsDP", icon:"mdi mdi-circle", value: "Fondali"},
						{ id: "tables.eventsPV", icon:"mdi mdi-circle", value: "Imbarcazioni"}
					]
				}
			],
		    onClick:{ 
		    	"mdi-timetable": function  (event, id, node) {
//		    		alert("ecchime!!");
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