import {JetView} from "webix-jet";
import {getEvent, getEventVolunteers, deleteEvent} from "models/events";
import {getEventTypeText} from "models/eventTypes";
import {getVolunteers} from "models/volunteers";
import EventFormEV from "views/forms/saveEventEV";
import EventFormPS from "views/forms/saveEventPS";
import EventFormEP from "views/forms/saveEventEP";
import EventFormDP from "views/forms/saveEventDP";
import EventFormPV from "views/forms/saveEventPV";
import EventFormReceipts from "views/forms/saveEventReceipts";

export default class SaveEventView extends JetView {
	
	config(){
		const _ = this.app.getService("locale")._;		
		const actions = "<span class='mdi mdi-trash-can'></span>";
		const date_format = "%d %M %Y";

		return {
			view:"window",
			position:"center",
			modal:false,
			move:true,
			resize:true,
			head:{
			    view:"toolbar", 
			    localId:"toolbar",
			    cols:[
			        {
						view:"label",
						localId:"toolbar_label",
			        }
			    ]
			},
			width:1200,
			body:{	
				view:"form",
				localId:"form_save",
				elementsConfig:{
					labelPosition:"left" 
				},
				elements:[
					{
						height:700,
						cols:[
							{
								rows:[
									{
										view: "tabbar",  
										localId:"tabbar",
										multiview: true,
							         	options:[
							         		{localId: "base", value: "Base"},
							         		{localId: "receipts", value: "Receipts"}
							            ]
									},
									{
										keepView:true, 
										cells:[                                   
											{
												view:"form",
												id:"base",
												elements:[
													EventFormEV
												] 
											},
											{
												view:"form",
												id:"receipts",
												elements:[
													EventFormReceipts
												] 
											},
											{
												view:"form",
												id:"PS",
												elements:[
													EventFormPS
												] 
											},
											{
												view:"form",
												id:"EP",
												elements:[
													EventFormEP
												] 
											},
											{
												view:"form",
												id:"DP",
												elements:[
													EventFormDP
												] 
											},
											{
												view:"form",
												id:"PV",
												elements:[
													EventFormPV
												] 
											}											
										]
									}
								]
							},
							{
								rows:[ 
								    { 
								        cols:[{
								        	view:"button", 
								        	label:"Add Row",
								        	click:function() {
								        		var data = {};
								        		this.$$('event_volunteers').editStop();
								        		var id = this.$$('event_volunteers').add(data, this.$$('event_volunteers').count());
								        		this.$$('event_volunteers').editRow(id);
								        		this.$$("event_volunteers").focusEditor({
								        		    row:id,
								        		    column:"volunteerId"
								        		});
								          }
								        }]
								    },
									{					
										view:"datatable",
										localId:"event_volunteers",
										resizeColumn:true,
										footer:true,
									    editable:true,
									    editaction:"click", 
										columns: [
											{
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
						]
					},
					{
						cols:[
							{
								view:"button", value:_("Close"),
								click:() => this.closex()
							},
							{
								view:"button",
								value:_("Save"), type:"form",
								click:() => this.saveEvent()
							}
						]
					}
				],
				rules:{
					eventText:webix.rules.isNotEmpty,
					eventDateFrom:webix.rules.isNotEmpty,
					eventDateTo:webix.rules.isNotEmpty,
					eventAccountId:webix.rules.isNotEmpty,
					areaId:webix.rules.isNotEmpty,
					eventPlaceCountry:webix.rules.isNotEmpty,					
					eventPlaceProvince:webix.rules.isNotEmpty,
					eventPlace:webix.rules.isNotEmpty
				}
			}
		};
	}
	
	showWindow(eventType, eventId){
		const _ = this.app.getService("locale")._;
		
		this.$$("base").clear();
		this.$$("base").setValues({ eventTypeName: eventType });
		this.$$("receipts").clear();		
		this.$$("event_volunteers").clearAll();

		if(this.$$("PS") != null)
			this.$$("PS").clear();
		if(this.$$("EP") != null)
			this.$$("EP").clear();
		if(this.$$("DP") != null) 
			this.$$("DP").clear();
		if(this.$$("PV") != null)
			this.$$("PV").clear();

		
		this.setEventTypeName(eventType);

		if(eventType != "EV") {
			this.$$("tabbar").removeOption(eventType);
			this.$$("tabbar").addOption(eventType, getEventTypeText(eventType));
		}
		
		if(eventId != null) {	
			const view = this;
    	    const event = getEvent(eventType, eventId, function() {
    			view.$$("toolbar_label").setValue(_("Update Event") + " " + event.getValues().eventText + " (" + eventType + "-" + eventId + ")");
    			view.$$("base").setValues(event.getValues());
    			view.$$("receipts").setValues(event.getValues());
    			view.$$("event_volunteers").sync(getEventVolunteers(eventType, eventId));
    			
    			if(view.$$("PS") != null)
    				view.$$("PS").setValues(event.getValues());
    			if(view.$$("EP") != null)
    				view.$$("EP").setValues(event.getValues());
    			if(view.$$("DP") != null)
    				view.$$("DP").setValues(event.getValues());
    			if(view.$$("PV") != null)
    				view.$$("PV").setValues(event.getValues());

    			view.getRoot().show();
    	    });
		}
		else {
			this.$$("toolbar_label").setValue(_("Insert Event") + " " + eventType);
			this.getRoot().show();
		}
		
		this.$$("tabbar").removeOption("receipts");
		this.$$("tabbar").addOption("receipts", "Receipts");		
	}

	closex(){
		this.getRoot().hide();
	}
	
	saveEvent() {
		const event = this.$$("EV").getValues();

		if(this.$$("PS") != null) {
			const eventPS = this.$$("PS").getValues();
		}
		if(this.$$("EP") != null) {
			const eventEP = this.$$("mEP").getValues();
		}
		if(this.$$("DP") != null) {
			const eventDP = this.$$("DP").getValues();
		}
		if(this.$$("PV") != null) {
			const eventDP = this.$$("PV").getValues();
		}
//		const receipts = $$("form_receipts").serialize();
		const volunteers = this.$$("event_volunteers").serialize();
//		if (!this.$$("form").validate())
//			return;
		
		event.volunteers = volunteers
		
		alert(JSON.stringify(event));
		
		closex();
	}
	
	setEventTypeName(eventTypeName) {
		this.eventTypeName_ = eventTypeName;
	}
	
	getEventTypeName() {
		return this.eventTypeName_;
	}
}