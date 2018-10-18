export function getEvents(){
	return events;
}

const events = new webix.DataCollection({
	scheme:{                                                                              
		$init:function(obj){                                                                          
		}                                                                                  
	},
	url:"data/events.json"
});
