import { AcesTMLHOC } from "@presenter/html/aces";
import { BatchRoleNav } from "@presenter/pages/aces/components/batch-role-nav";
import { OrganizationTable } from "@presenter/pages/aces/components/organization-table";
import { HTMX_EVENTS } from "@src/adapter/constant/htmx-events";
import { route } from "@src/infra/singeleton/RouteCollection";

interface PageProps {
	organizations: {
		uuid: string
		name: string
		code: string
		created?: string
		updated?: string
	}[]
}



function Page({ organizations }: PageProps) {
	return (
		<div className="mx-auto w-7xl px-2 px-8">
			<BatchRoleNav />

			<div className="flex justify-between">
				<h1 className="text-2xl font-bold">Daftar Organisasi</h1>
				<button className="btn btn-neutral" trigger="modal" data-target="#modal-organization">Tambah Organisasi</button>
				<dialog id="modal-organization" className="modal">
					<div className="modal-box">
						<h2 className="text-lg font-semibold text-gray-800 mb-5">Tambah Organisasi</h2>
						<form method="post" id="form-new-organization" className="space-y-6 mb-5">
							<div>
								<label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama</label>
								<input
									required
									type="text"
									id="name"
									name="name"
									className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
								/>
							</div>
							<div>
								<label htmlFor="code" className="block text-sm font-medium text-gray-700">Kode</label>
								<input
									required
									type="text"
									id="code"
									name="code"
									className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
								/>
							</div>
						</form>
						<div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-3">
							<button 
								hx-swap="none"
								class="btn btn-neutral"
								id="modal-organization-form"
								hx-include="#form-new-organization"
								hx-post={ route("post.aces.hx.organization") }
							>Simpan</button>
							<form method="dialog">
								<button class="btn btn-error">Cancel</button>
							</form>
						</div>
					</div>
				</dialog>
			</div>

			<dialog id="modal-new-batch" className="modal">
				<div className="modal-box">
					<h2 className="title text-lg font-semibold text-gray-800 mb-5"></h2>
					<form
						method="post"
						id="modal-new-batch-form"
						className="space-y-6 mb-5"
					>
						<div>
							<input type="hidden" name="organization_uuid" />
							<label htmlFor="title" className="block text-sm font-medium text-gray-700">Nama Batch</label>
							<input
								required
								id="title"
								type="text"
								name="title"
								className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
							/>
						</div>
					</form>
					<div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-3">
						<button type="submit" form="modal-new-batch-form" class="btn btn-neutral">Simpan</button>
						<form method="dialog">
							<button class="btn btn-error">Cancel</button>
						</form>
					</div>
				</div>
			</dialog>
		
			<div
				hx-target="this"
				hx-swap="innerHTML"
				hx-trigger={`${HTMX_EVENTS.ACES_GetOrganizationTable} from:body`}
				hx-get={route("get.aces.hx.organization_table")}
				className="relative overflow-x-auto my-12"
			>
				<OrganizationTable organizations={ organizations } />
			</div>
		</div>
	)
}

export const BatchOrganizationPage = AcesTMLHOC(Page, {
	viteGenerated: ["aces-organization"]
});