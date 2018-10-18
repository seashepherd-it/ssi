export function getEvents(eventType){
	var data = webix.ajax().get("http://localhost:8080/ssi_events/service/searchEvent?eventType="+eventType);
	return data;
};
