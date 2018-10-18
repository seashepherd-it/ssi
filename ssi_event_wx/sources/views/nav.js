import {JetView} from "webix-jet";

import TopView from "views/top";
import LeftView from "views/left";
import CenterView from "views/center";


export default class NavView extends JetView{
	config(){
		const _ = this.app.getService("locale")._;
		const theme = this.app.config.theme;
		
		return {
			rows:[
				TopView,
				{
					type:"space",
					cols:[
						{
							rows:[
								LeftView,
								{}
							]
						},
						CenterView
					]
				}
			]
		};
	}
}
