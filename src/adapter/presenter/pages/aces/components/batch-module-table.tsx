import { route } from "@src/infra/singeleton/RouteCollection";

type Props = {
	modules: {
		batch_uuid: string;
		module_uuid: string;
		uuid: string;
		created: string;
		priority: number;
		updated?: string;
		module?: {
			type: string;
			title: string;
			category: string;
		};
	}[]
}

export function BatchModuleTable({ modules }: Props) {
	return (
		<div class="overflow-x-auto rounded-md border border-base-content/5 bg-base-100">
			<table class="table">
				<thead class="bg-zinc-300">
					<tr>
						<th>Tipe</th>
						<th>Module</th>
						<th>Kategori</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{ modules.map((module) => (
						<tr key={ module.uuid }>
							<td>{ module.module?.type }</td>
							<td>{ module.module?.title }</td>
							<td>{ module.module?.category }</td>
							<td className="flex gap-2">
								<button 
									hx-swap="none"
									className="btn btn-error btn-sm"
									hx-delete={ route("delete.aces.hx.batch.batch_id.module.module_id", [module.batch_uuid, module.uuid]) }
								>Delete</button>
							</td>
						</tr>
					)) }
				</tbody>
			</table>
		</div>
	)
}