import {getServicePath} from "config/host";

export function getVolunteers(callback){
	
	var data = new webix.DataCollection( {} );
	if(callback != null)
		data.attachEvent("onAfterLoad", callback);	

	data.parse(webix.ajax().get(getServicePath() + "/searchVolunteer"));
	return data;
};