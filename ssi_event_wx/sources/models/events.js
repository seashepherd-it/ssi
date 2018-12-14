export function getEvents(eventType){
	var data = webix.ajax().get("http://localhost:8080/ssi/service/searchEvent?eventType="+eventType);
	return data;
};
