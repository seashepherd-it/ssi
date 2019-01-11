import {JetView} from "webix-jet";
import {getServicePath} from "config/host";

export default class ImportEventsView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		return {
			view:"window",
			move:true,
			position:"center",
			modal:true,
			resize:true,
			head:_("Import Events"),
			width: 600,
			body:{	
				view:"form",
				localId:"form_import",
				elementsConfig:{ labelAlign:"right" },
			    rows:[
			        {
			            view:"uploader",
			            localId: "events_upl1",
			            autosend:false,
			            value:"Upload files",
			            link:"mylist",
			            upload:getServicePath() + "/importEvent"
			        }, 
			        {
			            view:"list",  
			            id:"mylist", 
			            type:"uploader",
			            borderless:true
			        },
			        {
			        	type:"head",
			        	cols:[
					        { 
					            view:"button",
					            label:"Send",
					            click:() => this.send()
					        },
					        { 
					            view:"button",
					            label:"Clear",
					            click:() => this.clear()
					        },
					        {
								view:"button", value:_("Close"),
								click:() => this.closex()
							}
			        	]
			        },
			    ], 
			    scroll: true
			}
		};		
	}
	
	init(view) {
		
		this.$$("events_upl1").attachEvent("onUploadComplete", function(response){
			// webix.message("Done");
		});
		this.$$("events_upl1").attachEvent("onFileUpload", function(file, response){
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
//			        expire: -1
			    });				
			}
		});
		
		this.$$("events_upl1").attachEvent("onFileUploadError", function(file, response){
			
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
//			        expire: -1
			    });			        
			};
		});
	}
	showWindow(){
		this.getRoot().show();
	}
	closex(){
		this.getRoot().hide();
	}
	send() {
		this.$$('events_upl1').send();		
	}
	clear() {
		this.$$('events_upl1').files.data.clearAll();		
	}
}
