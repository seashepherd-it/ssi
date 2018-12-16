import {JetView} from "webix-jet";

export default class FormEventsView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		return {
			view:"form", 
			elementsConfig:{ labelAlign:"right" },
		    rows:[
		        {
		            view:"uploader",
		            id: "events_upl1",
		            autosend:false,
		            value:"Upload files",
		            link:"mylist",
		            upload:"http://localhost:8080/ssi/service/importEvent"
		        }, 
		        {
		            view:"list",  
		            id:"mylist", 
		            type:"uploader",
		            borderless:true
		        },
		        { 
		            view:"button",
		            label:"Send files",
		            click: "$$('events_upl1').send()"
		        }
		    ], 
		    scroll: true
		};		
	}
	
	init(view) {
		$$("events_upl1").attachEvent("onUploadComplete", function(response){
			// webix.message("Done");
		});
		$$("events_upl1").attachEvent("onFileUpload", function(file, response){
			if(response.warning === "") {
			    webix.message({		    	
			        type:"success",
			        text:response.info
			    });
			}
			else {
			    webix.message({		    	
			        type:"success",
			        text:response.info
			    });
			    webix.message({		    	
			        type:"debug",
			        text:response.info + "<br/>" + response.warning,
			        expire: 20000
			    });				
			}
		});
		$$("events_upl1").attachEvent("onFileUploadError", function(file, response){			
		    webix.message({
		        type:"error",
		        text:response.info + "<br/>" + response.error,
		        expire: -1
		    });
		    
			if(response.warning != "") {
				webix.message({
			        type:"debug",
			        text:response.info + "<br/>" + response.warning,
			        expire: 20000
			    });			        
			};
		});
	}
}
