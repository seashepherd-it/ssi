import {getServicePath} from "config/host";

export function getUserInfo(callback) {
	
	var data = new webix.DataRecord( {} );
	if(callback != null)  
		data.attachEvent("onAfterLoad", callback);
	
	data.parse(webix.ajax().get(getServicePath() + "/getUserInfo.php"));
	
	return data;
};
