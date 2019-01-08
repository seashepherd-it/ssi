import {JetView} from "webix-jet";
import {getVolunteers} from "models/volunteers";

export default class SaveEventVolunteersView extends JetView {
	
	config(){
		const _ = this.app.getService("locale")._;
		var actions = "<span class='mdi mdi-trash-can'></span>";
		
		return {
			rows:[ 
			    { 
			        cols:[{
			        	view:"button", 
			        	label:"Add Row",
			        	click:function() {
			        		var data = {};
			        		$$('event_volunteers').editStop();
			        		var id = $$('event_volunteers').add(data, $$('event_volunteers').count());
			        		$$('event_volunteers').editRow(id);
			        		$$("event_volunteers").focusEditor({
			        		    row:id,
			        		    column:"volunteerId"
			        		});
			          }
			        }]
			    },
				{					
					view:"datatable",
					id:"event_volunteers",
					resizeColumn:true,
					footer:true,
				    editable:true,
				    editaction:"click", 
					columns: [
						{
							id: "actions",
					        header: "Actions",
					        template: actions 
						},
				        {
				            id: "volunteerId",
				            header: "Volunteer",
				            fillspace:true,
				            editor:"combo",
							options:getVolunteers(),
				            sort:"string"
				        },
				        {
				            id: "eventHours",
				            header: "Hours",
				            editor:"text",
				            format:webix.Number.numToStr({decimalSize:0}),
				            css:{'text-align':'right'},
				            sort:"int", 
				            footer:{content:"summColumn", css:{'text-align':'right'}}
				        }
					],
					rules:{
						eventHours:webix.rules.isNotEmpty,
						volunteerId:webix.rules.isNotEmpty
					},
				    onClick:{ 
				    	"mdi-trash-can": function  (event, id, node) {
				    		var dtable = this;
			    	    	dtable.remove(id.row);
				        }
				    }
				}
			]
		}
	}
}
	