export function getVolunteers(){
	webix.ajax().sync().get("http://localhost:8080/ssi/service/searchVolunteer"), function (text, xml, xhr) {
		return xhr.json();
	};
};