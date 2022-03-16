import { defaults } from "./modules/defaults";
import { config } from "./config";
import { sliders } from "./modules/sliders";
import { button } from "./modules/button";
// import "./vendor/dynamicAdapt"

var App = () => {};

App.prototype.init = () => {

	defaults.init();
	sliders.init();
	button.init();
	config.log('app init')

};

export { App };