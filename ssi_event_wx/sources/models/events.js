import {getServicePath} from "config/host";

export function getEvents(eventType, callback){
	
	var data = new webix.DataCollection( {} );
	if(callback != null)
		data.attachEvent("onAfterLoad", callback);	
	data.parse(webix.ajax().get(getServicePath() + "/searchEvent?eventType="+eventType));

	return data;
};

export function getEvent(eventType, eventId, callback){
	
	var data = new webix.DataRecord( {} );
	if(callback != null)
		data.attachEvent("onAfterLoad", callback);
	data.parse(webix.ajax().get(getServicePath() + "/lookupEvent?eventType="+eventType+"&eventId="+eventId));
	
	return data;
};

export function getEventVolunteers(eventType, eventId, callback){
	
	var data = new webix.DataCollection( {} );
	if(callback != null)
		data.attachEvent("onAfterLoad", callback);
	data.parse(webix.ajax().get(getServicePath() + "/lookupEventVolunteers?eventType="+eventType+"&eventId="+eventId));
	
	return data;
};

export function deleteEvent(eventType, eventId){
	
	var result = false;	
	var data = webix.ajax().sync().get(getServicePath() + "/deleteEvent?eventType="+eventType+"&eventId="+eventId, null, function(text, xml, xhr) {
		if(text === "OK") {
			result = true;
		}
		else {
			result = false;
		}
	});	
	
	return result;
};
