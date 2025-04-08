import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

document.body.addEventListener("onSuccess", function (evt: any) {
	const message = evt?.detail?.value ?? "Success"
	Toastify({
		text: message,
		className: "success",
		duration: 1000,
		style: {
			background: "linear-gradient(to right, #00b09b, #96c93d)",
		}
	}).showToast();
})

document.body.addEventListener("requestError", function (evt: any) {
	const message = evt?.detail?.value ?? "Error"
	Toastify({
		text: message,
		className: "error",
		duration: 1000,
		style: {
			background: "linear-gradient(to right, #ff416c, #ff4b2b)",
		}
	}).showToast();
})