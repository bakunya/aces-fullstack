import { HXTriggerEvent, HXEvent } from "@browser/type/htmx"
import { showAlertError, showAlertErrorFromQueryString } from "@browser/utils/alert"
import Alpine from "alpinejs"


document.addEventListener("DOMContentLoaded", () => {
	showAlertErrorFromQueryString()
	Alpine.start()
})

// refer to src\adapter\http\contracts\response\hx-header-error.ts
document.body.addEventListener("requestError", (evt) => {
	const e = evt as HXTriggerEvent<string>
	showAlertError(e.detail.value)
})

document.body.addEventListener("htmx:afterRequest", (evt) => {
	const e = evt as HXEvent
	if (!e.detail.failed) {
		e.detail.requestConfig.elt.reset()
		const hideEl = e.detail.requestConfig.elt.getAttribute("hx-hide")
		if (hideEl) {
			const el = document.querySelector(hideEl)
			if (el) {
				el.classList.add("hidden")
			}
		}
	}
})


// @ts-ignore
window.addModuleStore = function () {
	return {
		// @ts-ignore
		moduleCategory: undefined,
		selectedModule: undefined,
		filteredAvailableModules() {
			if (this.moduleCategory === undefined) {
				return []
			}
			// @ts-ignore
			return (window?.serverData?.availableModules)?.[this.moduleCategory] ?? []
		}
	}
}