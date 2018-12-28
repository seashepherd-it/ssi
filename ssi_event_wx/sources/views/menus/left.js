import {JetView} from "webix-jet";
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
			collapsed: true,
			data:[
				{ id:"events", value:_("Events"), icon:"mdi mdi-cart" }
			]
		};
	}
	
	init(sidebar){
		this.on(this.app,"menu:toggle",() => {
			sidebar.toggle();
		});
	}
}