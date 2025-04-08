import Quill from "quill";
import * as QuillTableUI from 'quill-table-ui'
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill-table-ui/dist/index.css";

export function initQuill(selector: string | Element, readOnly = false) {
	if (typeof selector === "string" && !document.querySelector(selector)) return

	Quill?.register?.({ 'modules/tableUI': QuillTableUI.default }, true)
	
	const quill = new Quill(selector as string | HTMLElement, {
		readOnly,
		theme: 'snow',
		modules: {
			table: true,
			tableUI: true
		}
	});

	return { 
		quill, 
		table: quill.getModule('table'), 
	}
}