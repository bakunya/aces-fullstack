import { ModuleHTMLHOC } from "@presenter/html/module";
import { ModuleStatusMapping } from "@src/domain/Module";
import { route } from "@src/infra/singeleton/RouteCollection";

type Modules = {
	uuid: string
	type: string
	title: string
	status?: number
	category: string
}

const Page = ({ modules }: { modules: Modules[] }) => {
	return (
		<div className="p-5">
			<div className="flex mb-5 items-start justify-between">
				<h1 className="text-xl font-bold">Daftar Module</h1>
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
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{ modules.map((module) => (
							<tr className="hover:bg-base-200">
								<td>{ module.title }</td>
								<td>{ module.category }</td>
								<td>{ module.type }</td>
								<td>{ ModuleStatusMapping.toString(module.status!) }</td>
								<td>{ module.status === 0 && (
									<a href={route(`get.module.dashboard.${module.type.replaceAll("-", "_")}.id.dev`, [module.uuid])} className="btn btn-neutral btn-square">
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className="size-5">
											<path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
										</svg>
									</a>
								) }</td>
							</tr>
						)) }
					</tbody>
				</table>
			</div>
		</div>
	)
}

export const ModuleDashboardPage = ModuleHTMLHOC(Page, { viteGenerated: [] });