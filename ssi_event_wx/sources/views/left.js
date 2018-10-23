import {JetView} from "webix-jet";
import FilterEvents from "views/filters/events";
import ImportEvents from "views/forms/events";
import DownloadModels from "views/lists/events";
		
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
				,
				{
					header:_("Download Models"),
					collapsed:true,
					body:DownloadModels
				}
			]
		};
	}
}