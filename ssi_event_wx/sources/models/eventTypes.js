export function getEventTypes(){
	return types;
};

export function getEventTypeText(eventType){
	
	var text = null;

	var i;
	for (i = 0; i < types.length; i++) {
		if(types[i].id == eventType) {
			text = types[i].value;
			break;
		}
	}
	
	return text;
};

const types = [
	{
		id: "EV",
		value: "Divulgazione"
	},
	{
		id: "DP",
		value: "Fondali"
	},
	{
		id: "EP",
		value: "Spiagge"
	},
	{
		id: "JA",
		value: "Jairo"
	},	
	{
		id: "PS",
		value: "Scuole"
	},
	{
		id: "PV",
		value: "Imbarcazioni"
	}
];