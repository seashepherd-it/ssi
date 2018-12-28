import {JetView} from "webix-jet";

import TopMenu from "views/menus/top";
import LeftMenu from "views/menus/left";
import CenterView from "views/center";


export default class NavView extends JetView{
	config(){
		
		return {
			rows:[
				TopMenu, 
				{
					cols:[
						LeftMenu,
						CenterView
					]
				}
			]
		};
	}
}
