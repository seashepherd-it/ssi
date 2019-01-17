import {getServicePath} from "config/host";

export function getEvents(eventType, callback){
	
	var data = new webix.DataCollection( {} );
	if(callback != null)
		data.attachEvent("onAfterLoad", callback);
	
	data.parse(webix.ajax().get(getServicePath() + "/getEventsByType.php?eventType="+eventType));
//	data.parse(webix.ajax().get("/mos/services/getEventsByType.php?eventType="+eventType));
	
	return data;
};

export function getEvent(eventType, eventId, callback){
	
	var data = new webix.DataRecord( {} );
	if(callback != null)
		data.attachEvent("onAfterLoad", callback);
	data.parse(webix.ajax().get(getServicePath() + "/getEventByTypeId.php?eventType="+eventType+"&eventId="+eventId));
	
	return data;
};

export function getEventVolunteers(eventType, eventId, callback){
	
	var data = new webix.DataCollection( {} );
	if(callback != null)
		data.attachEvent("onAfterLoad", callback);
	data.parse(webix.ajax().get(getServicePath() + "/getEventVolunteersByTypeId.php?eventType="+eventType+"&eventId="+eventId));
	
	return data;
};

export function deleteEvent(eventType, eventId){
	
	var result = false;	
	var data = webix.ajax().sync().get(getServicePath() + "/deleteEvent.php?eventType="+eventType+"&eventId="+eventId, null, function(text, xml, xhr) {
		if(text == "OK") {
			result = true;
		}
		else {
			result = false;
		}
	});	
	
	return result;
};

export function saveEvent(event){
	
	var result = false;	
	var data = webix.ajax().sync().post(getServicePath() + "/saveEvent.php", "event="+webix.ajax().stringify(event), function(text, xml, xhr) {
		
		if(text.startsWith("ERROR")) {
			result = false;
		}
		else {
			result = true;
		}
	});	
	
	return result;
};