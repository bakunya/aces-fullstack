import { QuillElement } from "@presenter/components/quill-element";
import { route } from "@src/infra/singeleton/RouteCollection";

export type TIntrayTask4Props = {
	data: {	
		id: number;
		mod_uuid: string;
		title: string;
		name: string;
		time_in_seconds: number;
		content: string;
		label_1: string;
		label_2: string;
		label_3: string;
		label_4: string;
	}
}

export function IntrayTask4({ data }: TIntrayTask4Props) {
	return (
		<div className="my-10" id="intray-editor-dev">
			<input type="hidden" name="id" value={data.id} />
			<fieldset className="fieldset">
				<legend className="fieldset-legend">Judul section</legend>
				<input type="text" name="title" className="input input-neutral" value={data.title} />
			</fieldset>
			<fieldset className="fieldset">
				<legend className="fieldset-legend">Label 1</legend>
				<input type="text" name="label_1" className="input input-neutral w-[500px]" value={data.label_1} />
			</fieldset>
			<fieldset className="fieldset">
				<legend className="fieldset-legend">Label 2</legend>
				<input type="text" name="label_2" className="input input-neutral w-[500px]" value={data.label_2} />
			</fieldset>
			<fieldset className="fieldset">
				<legend className="fieldset-legend">Label 3</legend>
				<input type="text" name="label_3" className="input input-neutral w-[500px]" value={data.label_3} />
			</fieldset>
			<fieldset className="fieldset">
				<legend className="fieldset-legend">Label 4</legend>
				<input type="text" name="label_4" className="input input-neutral w-[500px]" value={data.label_4} />
			</fieldset>
			<div id="content" className="mt-5">
				<input type="hidden" name="content" className="store-data" />
				<QuillElement height="!h-[300px]" dataSaved={data.content} initFunction="initQuill('#content', '.store-data')" />
			</div>
			
			<button 
				className="btn btn-neutral mt-5 ml-auto block px-10"
				hx-put={route("put.module.hx.dashboard.intray.id.dev.section.section_type", [data.mod_uuid, "intray_task_4"])}
				hx-swap="none"
				hx-include="#intray-editor-dev input"
			>Save</button>
		</div>
	)
}