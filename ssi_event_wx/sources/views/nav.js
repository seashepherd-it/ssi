import {JetView} from "webix-jet";

import ToolbarMenu from "views/menus/toolbar";
import ApplicationMenu from "views/menus/application";

export default class NavView extends JetView{
	config(){
		
		const theme = this.app.config.theme;
		
		return {
			css:theme,
			rows:[
				{
					view:"template",
					type:"header",
					height:80,
					template:"<table width=100% bgcolor=black><tr><td><h3><font size=+4 color=white face=\"Verdana\">SSI Onlus Manager</font></h3></td><td align=\"right\"><a href=main.php><img src=\"images/top-bar-Jolly-Roger-01-blue.png\" height=\"75\"/></a></td></tr></table>"
				},
//				ToolbarMenu, 
				{
					cols:[
						ApplicationMenu,
						{$subview: true}						
					]
				}
			]
		};
	}
}
