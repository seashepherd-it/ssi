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
					localId:"toolbar",
					css:theme,
					cols:[
						{ view:"label", template:_("Events") },
						{
							view:"segmented", 
							localId:"offers",				
							options:[
								{ id:"tables.events?eventType=DP", value:_("Fondali")},								
								{ id:"tables.events?eventType=EP", value:_("Spiagge")},
								{ id:"tables.events?eventType=EV", value:_("Divulgazione")},
								{ id:"tables.events?eventType=GC", value:_("Rifornimenti")},
								{ id:"tables.events?eventType=PS", value:_("Scuole")},
								{ id:"tables.events?eventType=PV", value:_("Visite")}
							]
						}
					]
				},
				{ $subview:true }
			]
		};
	}
	init(){
		this.use(plugins.Menu,"offers");
	}
}
