import {JetView} from "webix-jet";

import "locales/webix/it.js";


export default class LanguagesPopup extends JetView {
	config(){
		return {
			view:"popup",
			width:100,
			body:{
				view:"list",
				scroll:false,
				yCount:2,
				select:true,
				borderless:true,
				template:"#lang#",
				data:[
					{ id:"en", code:"US", lang:"English" },
					{ id:"it", code:"IT", lang:"Italian" }
				],
				on:{
					onAfterSelect:id => {
						const code = this.getRoot().getBody().getItem(id).code;
						this.toggleLanguage(id,code);
						this.getRoot().hide();
					}
				},
				ready(){
					const clang = webix.storage.local.get("clang");
					this.select(clang||"en");
				}
			}
		};
	}
	showPopup(pos){
		this.getRoot().show(pos);
	}
	toggleLanguage(value,country){
		webix.i18n.setLocale(value+"-"+country);
		const langs = this.app.getService("locale");
		const clang = langs.getLang();
		if (value !== clang){
			webix.storage.local.put("clang",value);
			langs.setLang(value);
		}
	}
}
