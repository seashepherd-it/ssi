import {JetView} from "webix-jet";
import {getInstituteTypes} from "models/instituteTypes";

export default class EventFormPS extends JetView {
	
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