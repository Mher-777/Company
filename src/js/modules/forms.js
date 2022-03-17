import validate from "jquery-validation";
import "inputmask/dist/jquery.inputmask.min";
import { config } from "../config";
import "./defaults";

var forms = {
	mask: () => {
		$("[data-inputmask]").inputmask();
	},
	switcher: () => {

	},
	focusUpdate: (set = false, field) => {
		let input = $(field);

		let val = Number(
			input
				.val()
				.replace(/\s/g, "")
				.match(/[+-]?([0-9]*[.])?[0-9]+/g)
		);

		if (set) {
			if (val == 0) input.val("").trigger("change");
			else input.val(config.numberWithSpaces(val)).trigger("change");
		} else {
			if (val == 0) input.val("").trigger("change");
			else input.val(val).trigger("change");
		}
	},
	validate: () => {
		$.extend($.validator.messages, {
			required: "Поле обязательно для заполнения.",
			email: "Пожалуйста, введите действительный адрес электронной почты.",
		})

		$("form.is-validate").each((i, el) => {
			var $form = $(el);

			$form.validate({
				errorPlacement: function (error, element) {
					if (element.attr("type") !== "checkbox") {
						element.parent().after(error);
					}
				},
				highlight: (element, errorClass, validClass) => {
					$(element)
						.parent()
						.addClass(errorClass)
						.removeClass(validClass);
				},
				unhighlight: (element, errorClass, validClass) => {
					$(element)
						.parent()
						.removeClass(errorClass)
						.addClass(validClass);
				},
				submitHandler: (form) => {
					form.submit();
				},
				errorElement: 'span',
				ignore: "input.is-deactive",
				debug: false,
				rules: {
					email: 'email'
				},
				messages: {

				}

			});
		});
	},

	events: () => {
		$(".input__field")
			.on("focus", (e) => {
				let $input = $(e.target);
				$input.parent().addClass("is-focus");
			})
			.on("blur change", (e) => {
				let $input = $(e.target);

				if ($input.val() == "") $input.parent().removeClass("is-focus");
			});
	},

	init: () => {
		forms.mask();
		forms.switcher();
		forms.validate();
		forms.events();
	},
};

export { forms };
