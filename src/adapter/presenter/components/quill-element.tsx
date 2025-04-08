export const QuillElement = ({ dataSaved, initFunction, height = "" }: { height?: string, initFunction: string, dataSaved: string }) => {
	return (
		<>
			<button id="insert-table" className="insert-table block w-fit btn btn-sm btn-neutral mb-3">Insert Table</button>
			<div>
				<div
					class={`quill ${height}`}
					x-init={ initFunction }
					data-saved={ dataSaved }
				></div>
			</div>
		</>
	)
}