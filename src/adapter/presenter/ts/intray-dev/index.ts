import Alpine from '@browser/utils/alpine'
import { initQuill } from "@browser/utils/initQuill"

// @ts-ignore
window.initQuill = (mainContainerId: string, inputSelector: string) => {
	const mainContentContainer = document.querySelector(mainContainerId)
	const quillElement = mainContentContainer?.querySelector(".quill")!
	const inputEl = mainContentContainer?.querySelector(inputSelector) as HTMLInputElement
	if (!inputEl || !mainContentContainer || !quillElement) throw new Error("Element not found")
	const html = quillElement.getAttribute("data-saved")

	const mainContentQuill = initQuill(quillElement, false)
	mainContentQuill?.quill.clipboard.dangerouslyPasteHTML(html || "")

	mainContentContainer.querySelector(`.insert-table`)!.addEventListener('click', function () {
		mainContentQuill?.quill.focus({ preventScroll: false });
		(mainContentQuill?.table as any)?.insertTable(3, 3);
	});

	inputEl!.setAttribute("value", mainContentQuill?.quill?.getSemanticHTML?.() ?? "")
	inputEl.value = mainContentQuill?.quill?.getSemanticHTML?.() ?? ""
	mainContentQuill?.quill.on("text-change", () => {
		inputEl!.setAttribute("value", mainContentQuill?.quill?.getSemanticHTML?.() ?? "")
		inputEl.value = mainContentQuill?.quill?.getSemanticHTML?.() ?? ""
	})
}

Alpine.start()