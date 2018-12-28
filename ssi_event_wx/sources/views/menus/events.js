import {JetView} from "webix-jet";
import FilterEvents from "views/filters/events";
import ImportEvents from "views/forms/events";
import DownloadModels from "views/lists/events";
		
export default class LeftMenu extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		const theme = this.app.config.theme;

		return {
			view:"accordion",
			css:theme,
			rows:[
				{
					header:_("Search Events"),
					collapsed:false,
					body:FilterEvents
				},
				{
					header:_("Import Events"),
					collapsed:true,
					body:ImportEvents
				}
				, {}
			]
		};
	}
}