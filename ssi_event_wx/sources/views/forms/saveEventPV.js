import {JetView} from "webix-jet";
import {getInstituteTypes} from "models/instituteTypes";

export default class EventFormPV extends JetView {
	
	config(){
		const _ = this.app.getService("locale")._;

		return {
			view:"form",
			gravity: 3,
			elementsConfig:{
				labelPosition:"left" 
			},
			elements:[
				{ 
					view:"text",
					name:"shipName",
					label:_("Ship Name")
				},
				{ 
					view:"combo",
					name:"instituteTypeId",
					label:_("Type"), 
					options:{
						data:getInstituteTypes()
					}
				},
				{ 
					view:"text",
					name:"instituteName",
					label:_("Name")
				},
				{ 
					view:"text",
					name:"instituteSpeaker",
					label:_("Speaker")
				},
				{ 
					view:"text",
					name:"instituteContact",
					label:_("Contact")
				}				
			]
		};
	}
}