import { initQuill } from "@browser/utils/initQuill"
import Alpine from '@browser/utils/alpine'

// @ts-ignore
window.initMainContentEditor = () => {
	const mainContentContainer = document.getElementById("main-content")
	const quillElement = mainContentContainer?.querySelector(".quill")!
	const html = quillElement.getAttribute("data-saved")
	const inputEl = mainContentContainer?.querySelector("input[type='hidden']") as HTMLInputElement

	const mainContentQuill = initQuill(quillElement, false)
	mainContentQuill?.quill.clipboard.dangerouslyPasteHTML(html || "")

	document.querySelector('#main-content #insert-table')!.addEventListener('click', function () {
		mainContentQuill?.quill.focus({ preventScroll: false });
		(mainContentQuill?.table as any)?.insertTable(3, 3);
	});

	inputEl!.setAttribute("value", mainContentQuill?.quill?.getSemanticHTML?.() ?? "")
	inputEl.value = mainContentQuill?.quill?.getSemanticHTML?.() ?? ""
	mainContentQuill?.quill.on("text-change", () => {
		inputEl!.setAttribute("value", mainContentQuill?.quill.getSemanticHTML())
		inputEl.value = mainContentQuill?.quill.getSemanticHTML()
	})
}

// @ts-ignore
window.initAssignmentQuill = (assignmentId) => {
	const mainContentContainer = document.getElementById(`assignment-id-${assignmentId}`)
	const quillElement = mainContentContainer?.querySelector(".quill")!
	const html = quillElement.getAttribute("data-saved")
	const inputEl = mainContentContainer?.querySelector("input[type='hidden']") as HTMLInputElement

	const mainContentQuill = initQuill(quillElement, false)
	mainContentQuill?.quill.clipboard.dangerouslyPasteHTML(html || "")

	document.querySelector(`#assignment-id-${assignmentId} #insert-table`)!.addEventListener('click', function () {
		mainContentQuill?.quill.focus({ preventScroll: false });
		(mainContentQuill?.table as any)?.insertTable(3, 3);
	});

	inputEl!.setAttribute("value", mainContentQuill?.quill?.getSemanticHTML?.() ?? "")
	inputEl.value = mainContentQuill?.quill?.getSemanticHTML() ?? ""
	mainContentQuill?.quill.on("text-change", () => {
		inputEl!.setAttribute("value", mainContentQuill?.quill.getSemanticHTML())
		inputEl.value = mainContentQuill?.quill?.getSemanticHTML() ?? ""
	})
}

// @ts-ignore
window.initQuestionQuill = (questionId) => {
	const mainContentContainer = document.getElementById(`question-id-${questionId}`)
	const quillElement = mainContentContainer?.querySelector(".quill")!
	const html = quillElement.getAttribute("data-saved")
	const inputEl = mainContentContainer?.querySelector("input[name='question-content']") as HTMLInputElement

	const mainContentQuill = initQuill(quillElement, false)
	mainContentQuill?.quill.clipboard.dangerouslyPasteHTML(html || "")

	document.querySelector(`#question-id-${questionId} #insert-table`)!.addEventListener('click', function () {
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

// @ts-ignore
window.selectionApp = (selector: string, inputSelector: string, defaultSelected: string[]) => {
	const el = document.querySelector(selector)
	const data = el?.getAttribute('data-input')
	const inputEl = document.querySelector(inputSelector) as HTMLInputElement;
	
	if (!data || !inputEl) return
	const items = (typeof data === 'string' ? JSON.parse(data) : data) as { id: string | number, value: string }[]
	
	return {
		items,
		searchQuery: '',
		selectedItems: [] as (string | number)[],
		modalOpen: false,
		init() {
			this.selectedItems = defaultSelected
			this.updateHiddenInput()
		},
		filteredItems() {
			const query = this.searchQuery.toLowerCase();
			return this.items.filter((item) =>
				item.value.toLowerCase().includes(query)
			);
		},
		toggleSelection(id: string | number) {
			if (this.selectedItems.includes(id)) {
				this.selectedItems = this.selectedItems.filter(itemId => itemId !== id);
			} else {
				this.selectedItems.push(id);
			}
			this.updateHiddenInput();
		},
		// Fungsi untuk menghapus item yang sudah dipilih (ketika di halaman diklik)
		removeSelected(id: string | number) {
			this.selectedItems = this.selectedItems.filter(itemId => itemId !== id);
			this.updateHiddenInput();
		},
		updateHiddenInput() {
			inputEl.value = JSON.stringify(this.selectedItems);
			inputEl.setAttribute('value', JSON.stringify(this.selectedItems));
		}
	}
}

Alpine.start()