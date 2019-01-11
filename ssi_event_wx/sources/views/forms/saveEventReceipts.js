import {JetView} from "webix-jet";

export default class EventFormReceipts extends JetView {
	
	config(){
		const _ = this.app.getService("locale")._;
		
		const date_format = "%d %M %Y";

		return {
			view:"form",
			gravity: 3,
			elementsConfig:{labelPosition:"left" },
			elements:[				
				{ 
					view:"text",
					name:"eventReceiptsQty",
					label:_("Quantity"),
					labelWidth:100, 
					format:"1111"
				},
				{ 
					view:"text",
					name:"eventReceiptsTot",
					label:_("Total"),
					labelWidth:100, 
					format:"1111.11"
				},
				{ 
					view:"text",
					name:"eventReceiptsTotPOS",
					label:_("Total POS"),
					labelWidth:100, 
					format:"1111.11"
				},
				{
					cols:[
						{ 
							view:"text",
							name:"eventReceiptsTicketFrom",
							label:_("Ticket From"),
							labelWidth:100, 
							format:"1111"
						},
						{ 
							view:"text",
							name:"eventReceiptsTicketTo",
							label:_("Ticket To"),
							format:"1111"
						}
					]
				}
			]
		};
	}
}