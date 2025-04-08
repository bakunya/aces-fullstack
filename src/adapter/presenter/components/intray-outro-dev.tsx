import { QuillElement } from "@presenter/components/quill-element";
import { route } from "@src/infra/singeleton/RouteCollection";

export type TIntrayOutroDevProps = {
	data: {
		id: number;
		mod_uuid: string;
		title: string;
		name: string;
		content: string;
	}
}

export function IntrayOutroDev({ data }: TIntrayOutroDevProps) {
	return (
		<div className="my-10" id="intray-editor-dev">
			<input type="hidden" name="id" value={data.id} />
			<fieldset className="fieldset">
				<legend className="fieldset-legend">Judul section</legend>
				<input type="text" name="title" className="input input-neutral" value={data.title} />
			</fieldset>
			<div id="content" className="mt-5">
				<input type="hidden" name="content" className="store-data" />
				<QuillElement height="!h-[300px]" dataSaved={data.content} initFunction="initQuill('#content', '.store-data')" />
			</div>
			
			<button 
				className="btn btn-neutral mt-5 ml-auto block px-10"
				hx-put={route("put.module.hx.dashboard.intray.id.dev.section.section_type", [data.mod_uuid, "intray_outro"])}
				hx-swap="none"
				hx-include="#intray-editor-dev input"
			>Save</button>
		</div>
	)
}