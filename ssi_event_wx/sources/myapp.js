import "./styles/app.css";

import { JetApp, EmptyRouter, HashRouter, plugins } from "webix-jet";

export default class MyApp extends JetApp{
	constructor(config){
		super({
				webix,
				id 		: APPNAME,
				version : VERSION,
				router 	: HashRouter,
				debug 	: !PRODUCTION,
				start 	: "/nav/tables.eventsEV",
				theme	: webix.storage.local.get("theme_color") || ""
			}				
		);
		
		this.use(plugins.Locale);
	}
}

if (!BUILD_AS_MODULE){
	webix.ready(() => {
		if (!webix.env.touch && webix.env.scrollSize && webix.CustomScroll)
			webix.CustomScroll.init();
		
		webix.i18n.setLocale( "it-IT" );
		
		new MyApp().render();
	});
}