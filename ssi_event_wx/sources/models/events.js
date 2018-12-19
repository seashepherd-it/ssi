export function getEvents(eventType){
	var data = webix.ajax().get("http://localhost:8080/ssi/service/searchEvent?eventType="+eventType);
	return data;
};

export function deleteEvent(eventType, eventId){
	
	var result = false;
	
	var data = webix.ajax().sync().get("http://localhost:8080/ssi/service/deleteEvent?eventType="+eventType+"&eventId="+eventId, null, function(text, xml, xhr) {
		if(text === "OK") {
			result = true;
		}
		else {
			result = false;
		}
	});	
	
	return result;
};
