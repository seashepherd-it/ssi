import {JetView} from "webix-jet";
import {getEventTypes} from "models/eventTypes";

export default class FormEventsView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		const types = getEventTypes();
		return {
			view:"list",
			id:"event1",
			data:types,
		    scroll: true
		};		
	}
	
	init(view) {
		$$("event1").attachEvent("onItemClick", function(id, e, node){
		    var item = this.getItem(id);
			webix.message(item.id);
		});
	}
}
