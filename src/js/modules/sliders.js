import Swiper, { Navigation, Pagination } from 'swiper';

var sliders = {
	selector: ".js-slider",

	settings: {
		slidesPerView: 2,
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
		},
	},

	build: (selector) => {
		let data = $(selector).attr("data-settings")
			? $(selector).data("settings")
			: {};

		let clone = JSON.parse(JSON.stringify(sliders.settings));

		let current = Object.assign(clone, data);
		current.modules = [Navigation, Pagination]

		new Swiper(selector, current);
	},

	destroy: (selector) => {

	},

	run: (selector) => {
		sliders.build(selector);
	},

	init: () => {
		if (!$(sliders.selector).length) return false;

		$(window).on("load", (e) => {
			$(sliders.selector).each((i, el) => {
				sliders.run(el);
			});
		});
	},
};

export { sliders };
