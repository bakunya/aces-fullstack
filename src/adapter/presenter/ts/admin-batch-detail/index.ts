import { InitAllModal } from "@browser/utils/modal"
import { HXTriggerEvent, HXEvent } from "@browser/type/htmx"
import { showAlertError, showAlertErrorFromQueryString } from "@browser/utils/alert"
import { onUpdateBatchTitleSuccess } from "@response_contracts/hx-header-update-batch-title"


document.addEventListener("DOMContentLoaded", () => {
	InitAllModal({})
	showAlertErrorFromQueryString()
})

// refer to src\adapter\http\contracts\response\hx-header-error.ts
document.body.addEventListener("requestError", (evt) => {
	const e = evt as HXTriggerEvent<string>
    showAlertError(e.detail.value)
})

document.body.addEventListener(onUpdateBatchTitleSuccess, (evt) => {
	const e = evt as HXTriggerEvent<string>
	const inputEl = document.querySelector("#modal-update-batch #title") as HTMLInputElement
	const modal = document.querySelector("#modal-update-batch") as HTMLDivElement
	if(inputEl) {
		inputEl.value = e.detail.value
		inputEl.setAttribute("value", e.detail.value)
	}
	if(modal) {
		modal.classList.add("hidden")
	}
})

document.body.addEventListener("htmx:afterRequest", (evt) => {
	const e = evt as HXEvent
	if(!e.detail.failed) {
		e.detail.requestConfig.elt.reset()
		const hideEl = e.detail.requestConfig.elt.getAttribute("hx-hide")
		if(hideEl) {
			const el = document.querySelector(hideEl)
			if(el) {
				el.classList.add("hidden")
			}
		}
	}
})
