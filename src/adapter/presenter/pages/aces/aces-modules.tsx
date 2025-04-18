import { AcesTMLHOC } from "@presenter/html/aces";
import { ModuleStatusMapping } from "@src/domain/Module";
import { route } from "@src/infra/singeleton/RouteCollection";

type Modules = {
	uuid: string
	type: string
	title: string
	category: string
	status: number
	developer_name: string
}

const Page = ({ modules }: { modules: Modules[] }) => {
	return (
		<div className="p-5">
			<div className="flex mb-5 items-start justify-between">
				<h1 className="text-xl font-bold">Daftar Module</h1>
				<a href={route("get.aces.dashboard.modules.new")} className="btn btn-neutral">Buat Modules</a>
			</div>
			<div className="overflow-x-auto">
				<table className="table">
					{/* head */ }
					<thead>
						<tr className="bg-base-200">
							<th>Judul</th>
							<th>Kategori</th>
							<th>Tipe</th>
							<th>Status</th>
							<th>Developer</th>
						</tr>
					</thead>
					<tbody>
						{ modules.map((module) => (
							<tr className="hover:bg-base-200">
								<td>{ module.title }</td>
								<td>{ module.category }</td>
								<td>{ module.type }</td>
								<td>{ ModuleStatusMapping.toString(module.status) }</td>
								<td>{ module.developer_name }</td>
							</tr>
						)) }
					</tbody>
				</table>
			</div>
		</div>
	)
}

export const AcesModulesPage = AcesTMLHOC(Page, { viteGenerated: [] });