import { route } from "@src/infra/singeleton/RouteCollection";

type Props = {
	batch: {
		uuid: string;
		token: string;
		title: string;
		regrouping: number;
		organization_uuid: string;
		organization_name: string;
	},
}

export function BatchNav({ batch }: Props) {
	return (
		<nav className="mb-5" >
			<div className="relative flex flex-col" >
				{ batch.regrouping ? (
					<div role="alert" className="alert alert-warning alert-vertical sm:alert-horizontal alert-soft mb-5">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-warning h-6 w-6 shrink-0">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
						</svg>
						<span>Batch harus diregrouping.</span>
						<div>
							<form action={route("post.aces.regrouping.batch_id", [batch.uuid])} method="post">
								<button className="btn btn-sm btn-warning">Regroup</button>
							</form>
						</div>
					</div>
				): null }
				<div className="flex items-center justify-between">
					<div className="flex flex-1 items-center justify-center items-stretch justify-start" >
						<div className="block">
							<div className="flex space-x-4" >
								<a href={ route("get.aces.batch.batch_id", [batch.uuid]) } className="rounded-md pr-2 text-sm font-medium text-gray-500">Modules</a>
								<a href={ route("get.aces.batch.batch_id.person", [batch.uuid]) } className="rounded-md px-2 text-sm font-medium text-gray-500">Peserta</a>
								<a href={ route("get.aces.batch.batch_id.assessors", [batch.uuid]) } className="rounded-md px-2 text-sm font-medium text-gray-500">Asesor</a>
								<a href={ route("get.aces.batch.batch_id.groupings", [batch.uuid]) } className="rounded-md px-2 text-sm font-medium text-gray-500">Grouping</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	)
}