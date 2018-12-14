import {JetView, plugins} from "webix-jet";
import {getEventTypes} from "models/eventTypes";

export default class FormEventsView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		const types = getEventTypes();
		return {
			view:"tree",
			type: "menuTree2",
			id:"event1",
			data:types,
		    scroll: true
		};		
	}
	
	init(view) {
		this.use(plugins.Menu, "event1");
		$$("event1").attachEvent("onItemClick", function(id, e, node){
		    var item = this.getItem(id);
			webix.message(item.id);
		});
	}
}
