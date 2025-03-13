import { InitAllModal } from "@browser/utils/modal"
import { HXTriggerEvent, HXEvent } from "@browser/type/htmx"
import { showAlertError, showAlertErrorFromQueryString } from "@browser/utils/alert"
import { match } from "ts-pattern"

document.addEventListener("DOMContentLoaded", () => {
	const onOpen = (modal: Element, trigger: Element) => {
		match(modal.id)
			.with("modal-new-batch", () => {
				const modalTitle = trigger.getAttribute("modal-title")
				const submitUrl = trigger.getAttribute("modal-submit-url")
				const titleEl = document.querySelector("h2.title")
				if (titleEl) {
					titleEl.textContent = modalTitle
				}
				const formEl = document.querySelector("#modal-new-batch-form") as HTMLFormElement
				if (formEl) {
					formEl.action = submitUrl as string
				}
			})
			.otherwise(() => {})
	}

	InitAllModal({ onOpen })

	showAlertErrorFromQueryString()
})

// refer to src\adapter\http\contracts\response\hx-header-error.ts
document.body.addEventListener("requestError", (evt) => {
	const e = evt as HXTriggerEvent<string>
    showAlertError(e.detail.value)
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
