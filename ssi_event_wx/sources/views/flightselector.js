import {JetView} from "webix-jet";
import SearchingFlight from "views/filters/searchingflight";
import Registration from "views/forms/registration";
		
export default class FlightSelectorView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		const theme = this.app.config.theme;

		return {
			multi:false,
			margin:1,
			css:theme,
			rows:[
				{
					header:_("Look for a Event"),
					body:SearchingFlight
				},
				{
					header:_("Register"),
					css:"registration",
					collapsed:true,
					body:Registration
				}
			]
		};
	}
}