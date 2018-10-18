import {JetView} from "webix-jet";
import {getNotifications} from "models/notifications";

export default class NotificationsPopup extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		return {
			view:"popup",
			body:{
				view:"list",
				localId:"list",
				borderless:true,
				css:"notifications",
				width:250,
				template:obj => {
					return "<span class='m_title'>" + _(obj.title) + "</span>" +
						"<span class='message'>" + _(obj.message) + "</span>";
				},
				type:{
					height:"auto"
				}
			},
			on:{
				onHide:() => {
					const list = this.$$("list");
					list.clearAll();
					list.showOverlay(`<div style='margin:20px; font-size:14px;'>${_("No new notifications")}</div>`);
					list.define({ height:80 });
        			list.resize();
					this.app.callEvent("read:notifications");
				}
			}
		};
	}
	init(){
		const list = this.$$("list");
		list.parse(getNotifications());

		webix.extend(list,webix.OverlayBox);
	}
	showPopup(pos){
		this.getRoot().show(pos);
	}
}
