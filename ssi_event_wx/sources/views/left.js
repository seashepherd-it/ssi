import {JetView} from "webix-jet";
import FilterEvents from "views/filters/events";
import ImportEvents from "views/forms/events";
		
export default class LeftView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		const theme = this.app.config.theme;

		return {
			multi:false,
			css:theme,
			rows:[
				{
					header:_("Search Events"),
					body:FilterEvents
				},
				{
					header:_("Import Events"),
					collapsed:true,
					body:ImportEvents
				}
			]
		};
	}
}