import { route } from "@src/infra/singeleton/RouteCollection";

export function BatchRoleNav() {
	return (
		<nav className="mb-5" >
			<div className="relative flex h-16 items-center justify-between" >
				<div className="flex flex-1 items-center justify-center items-stretch justify-start" >
					<div className="flex shrink-0 items-center" >
						<img className="h-8 w-auto" src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
					</div>
					<div className="ml-6 block">
						<div className="flex space-x-4" >
							<a href={ route("get.batch.organization") } className="rounded-md px-3 py-2 text-sm font-medium text-gray-500"> Organisasi </a>
							<a href={ route("get.batch.assessment") } className="rounded-md px-3 py-2 text-sm font-medium text-gray-500"> Assessment </a>
						</div>
					</div>
				</div>
			</div>
		</nav>
	)
}