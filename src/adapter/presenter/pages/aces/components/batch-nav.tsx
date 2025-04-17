import { route } from "@src/infra/singeleton/RouteCollection";

export function BatchNav({ batchId }: { batchId: string }) {
	return (
		<nav className="mb-5" >
			<div className="relative flex items-center justify-between" >
				<div className="flex flex-1 items-center justify-center items-stretch justify-start" >
					<div className="block">
						<div className="flex space-x-4" >
							<a href={ route("get.aces.batch.batch_id", [batchId]) } className="rounded-md pr-2 text-sm font-medium text-gray-500">Modules</a>
							<a href={ route("get.aces.batch.batch_id.person", [batchId]) } className="rounded-md px-2 text-sm font-medium text-gray-500">Peserta</a>
						</div>
					</div>
				</div>
			</div>
		</nav>
	)
}