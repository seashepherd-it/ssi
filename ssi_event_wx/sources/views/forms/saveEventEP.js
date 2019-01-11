import {JetView} from "webix-jet";

export default class EventFormEP extends JetView {
	
	config(){
		const _ = this.app.getService("locale")._;

		return {
			view:"form",
			gravity: 3,
			elementsConfig:{
				labelPosition:"left",
				labelWidth:100
			},
			elements:[				
				{ 
					view:"text",
					name:"disposalMaterialKG",
					label:_("Material(Kg)"),
					format:"11"
				},
				{ 
					view:"text",
					name:"disposalContact",
					label:_("Contact")
				}			
			]
		};
	}
}