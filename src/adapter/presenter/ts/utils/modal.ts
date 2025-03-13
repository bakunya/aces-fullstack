export function InitAllModal({ onOpen, onClose }: { onOpen?: (modal: Element, trigger: Element) => void, onClose?: (modal: Element) => void }) {
	document.querySelectorAll("[trigger='modal']").forEach(trigger => {
		trigger.addEventListener("click", () => {
			const target = trigger.getAttribute("target")
			if (!target) return
			const modal = document.querySelector(target)
			if (!modal) return
			if (onOpen) onOpen(modal, trigger)
			modal.classList.remove("hidden")
		})
	})

	document.querySelectorAll("[hide='modal']").forEach(hide => {
		hide.addEventListener("click", () => {
			const target = hide.getAttribute("target")
			if (!target) return
			const modal = document.querySelector(target)
			if (!modal) return
			if (onClose) onClose(modal)
			modal.classList.add("hidden")
		})
	})

	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") {
			document.querySelectorAll("[hide='modal']").forEach(hide => {
				const isStatic = hide.getAttribute("static")
				if (isStatic === "true") return
				if (onClose) {
					const target = hide.getAttribute("target")
					if (!target) return
					const modal = document.querySelector(target)
					if (!modal) return
					onClose(modal)
				}
				(hide as HTMLButtonElement).click()
			})
		}
	})
}
