import { AcesTMLHOC } from "@presenter/html/aces";
import { route } from "@src/infra/singeleton/RouteCollection";

type ModuleTypes = {
	id: number;
	type: string;
	category: string;
}

type User = {
	uuid: string;
	fullname: string;
	username: string;
}

const Page = ({ modules, users }: { users: User[], modules: ModuleTypes[] }) => {
	return (
		<div className="p-5">
			<div className="flex mb-5 items-start justify-between">
				<h1 className="text-xl font-bold">Buat Module Baru</h1>
			</div>
			<form action={route("post.aces.dashboard.modules.new")} method="post" className="flex flex-col gap-5 max-w-[600px]">
				<fieldset className="fieldset w-full">
					<legend className="fieldset-legend">Tipe Module</legend>
					<select name="module_type" required className="w-full select">
						{ modules.map(v => <option value={ v.type }>{ v.category } - { v.type }</option>) }
					</select>
				</fieldset>
				<fieldset className="fieldset w-full">
					<legend className="fieldset-legend">Developer Module</legend>
					<select name="module_developer" required className="w-full select">
						{ users.map(v => <option value={ v.uuid }>{ v.fullname }</option>) }
					</select>
				</fieldset>
				<fieldset className="fieldset w-full">
					<legend className="fieldset-legend">Judul Module</legend>
					<input name="module_title" required type="text" className="w-full input" placeholder="Type here" />
				</fieldset>
				<button type="submit" className="btn btn-neutral mt-5">Simpan</button>
			</form>
		</div>
	)
}

export const AcesModulesPageNew = AcesTMLHOC(Page, { viteGenerated: [] });