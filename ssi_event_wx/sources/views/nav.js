import {JetView} from "webix-jet";

import ToolbarMenu from "views/menus/toolbar";
import ApplicationMenu from "views/menus/application";


export default class NavView extends JetView{
	config(){
		
		return {
			rows:[
				ToolbarMenu, {
					cols:[
						ApplicationMenu,
						{$subview: true}
					]
				}
			]
		};
	}
}
