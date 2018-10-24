import {JetView, plugins} from "webix-jet";

export default class CenterView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		const theme = this.app.config.theme;

		return {
			gravity:3,
			rows:[
				{					
					view:"toolbar",
					css:theme,
					cols:[
						{ view:"label", template:_("Events") },
						{
							view:"segmented",
							localId:"events",
							options:[
								{ id:"tables.eventsEV", value:_("Divulgazione")},
								{ id:"tables.eventsPS", value:_("Scuole")},
								{ id:"tables.eventsPV", value:_("Visite")},								
								{ id:"tables.eventsEP", value:_("Spiagge")},
								{ id:"tables.eventsDP", value:_("Fondali")}								
							]
						},
						{ view: "icon",  icon:"mdi mdi-file-excel", 
							click:function(){
								webix.toExcel($$("events"));
							}
						}
					]
				},
				{$subview: true}
			]
		};
	}

	init(){
		this.use(plugins.Menu,"events");
	}
}
