import {JetView} from "webix-jet";

export default class FormEventsView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		return {
			rows:[
				{
					view:"form", 
					borderless:true,
					elementsConfig:{ labelAlign:"right" },
				    elements:[
				        {
				            view:"uploader",
				            id: "uploader_1",
				            value:"Upload files",
				            link:"mylist",
				            autosend:false,
				            upload:"http://localhost:8080/ssi_events/service/importEvent",
				            datatype:"json"
				        }, 
				        {
				            view:"list",  
				            id:"mylist", 
				            type:"uploader",
				            borderless:true 
				        },
				        { 
				            view:"button",
				            value:"Send files",
				            click: "$$('uploader_1').send()"
				        }
				    ]
				}
			]
		};
	}
}
