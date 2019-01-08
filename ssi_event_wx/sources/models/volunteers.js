import {getServicePath} from "config/host";

export function getVolunteers(){
	
	var data = new webix.DataCollection( {} );
	data.parse(webix.ajax().get(getServicePath() + "/searchVolunteer"));
	return data;
};