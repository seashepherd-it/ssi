import {JetView} from "webix-jet";
import LanguagesPopup from "views/lists/languages";
import NotificationsPopup from "views/lists/notifications";

export default class ToolbarMenu extends JetView{
	config(){
		const _ = this.app.getService("locale")._;
		const theme = this.app.config.theme;

		return {

			view:"toolbar",
			css:theme,
			elements:[
				{
					rows:[
						{
							cols:[
								{
									view:"icon", icon:"mdi mdi-menu",
									click:() => this.app.callEvent("menu:toggle")
								},
								{
									view:"label",
									template:"SSI Activities"
								}
//								,
//								{
//									view:"icon",
//									icon:"mdi mdi-invert-colors",
//									tooltip:_("Click to change the theme"),
//									color:theme,
//									click:function(){
//										let color = this.config.color;
//										color = !color ? "webix_dark" : "";
//										webix.storage.local.put("theme_color",color);
//										this.$scope.app.config.theme = color;
//										this.$scope.app.refresh();
//									}
//								},
//								{
//									view:"icon", icon:"mdi mdi-bell",
//									localId:"bell",
//									badge:0, tooltip:_("Latest notifications"),
//									click:function(){
//										this.$scope.notifications.showPopup(this.$view);
//									}
//								},
//								{
//									view:"icon", icon:"mdi mdi-earth",
//									tooltip:_("Change the language"),
//									click:function(){
//										this.$scope.languages.showPopup(this.$view);
//									}
//								}
							]
						}
					]
				}
			]
		};
	}
	
	init(){
//		this.languages = this.ui(LanguagesPopup);
//		this.notifications = this.ui(NotificationsPopup);

		this.on(this.app,"read:notifications",() => {
			this.$$("bell").config.badge = 0;
			this.$$("bell").refresh();

			setTimeout(() => {
				this.$$("bell").config.badge += 0;
				this.$$("bell").refresh();
//				this.app.callEvent("new:notification");
			},10000);
		});
	}
}
