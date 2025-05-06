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
			// .with("#modal-new-batch", () => {
				// const modalTitle = el.getAttribute("modal-title")
				// const submitUrl = el.getAttribute("modal-submit-url")
				// const modalEl = (document.querySelector(target!) as HTMLDialogElement)
				// if (!(submitUrl || modalEl)) return
				// el.addEventListener("click", () => {
				// 	modalEl.querySelector(".title")!.textContent = modalTitle || ""
				// 	const form = modalEl.querySelector("form") as HTMLFormElement
				// 	form.action = submitUrl!
				// 	modalEl?.showModal()
				// 	// if (target) {
				// 	// 	if modalEl
				// 	// 	modalEl?.querySelector(".title")
				// 	// 	const form = modalEl.querySelector("form") as HTMLFormElement
				// 	// 	form.setAttribute("action", submitUrl)
				// 	// 	modalEl?.showModal()
				// 	// }
				// })
			// })
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

// @ts-ignore
window.modalNewBatchHandler = function() {
	return {
		modalTitle: undefined,
		submitUrl: undefined,
		isShow() {
			return this.modalTitle && this.submitUrl
		},
		open(title: string, url: string) {
			this.modalTitle = title as any
			this.submitUrl = url as any
		},
		close() {
			this.modalTitle = undefined
			this.submitUrl = undefined
		}
	}
}

Alpine.start()