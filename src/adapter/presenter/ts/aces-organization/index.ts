import { HXTriggerEvent } from "@browser/type/htmx"
import { showAlertError, showAlertErrorFromQueryString } from "@browser/utils/alert"
import { HTMX_EVENTS } from '@constant/htmx-events'
import Alpine from "alpinejs"
import { match } from "ts-pattern"

document.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll("button[trigger='modal']").forEach((el: Element) => {
		const target = (el as HTMLButtonElement).dataset.target
		match(target)
			.with("#modal-organization", () => {
				el.addEventListener("click", () => {
					if (target) {
						(document.querySelector(target) as HTMLDialogElement)?.showModal()
					}
				})
			})
			.with("#modal-new-batch", () => {
				el.addEventListener("click", () => {
					if (target) {
						const modalEl = (document.querySelector(target) as HTMLDialogElement)
						modalEl?.showModal()
					}
				})
			})
			.otherwise(() => {})
	})

	showAlertErrorFromQueryString()
})

// refer to src\adapter\http\contracts\response\hx-header-error.ts
document.body.addEventListener("requestError", (evt) => {
	const e = evt as HXTriggerEvent<string>
	showAlertError(e.detail.value)
})

document.body.addEventListener(HTMX_EVENTS.ACES_OrganizationCreated, () => {
	const el = document.getElementById("modal-organization")
	if (!el) return
	(el as HTMLDialogElement).close()
	const form = document.getElementById("form-new-organization") as HTMLFormElement
	form.reset()
})

Alpine.start()