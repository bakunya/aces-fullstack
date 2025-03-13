import { BatchHTMLHOC } from "@presenter/html/batch";
import { BatchRoleNav } from "@presenter/pages/batch/components/batch-role-nav";
import { BatchNav } from "@presenter/pages/batch/components/batch-nav";
import { route } from "@src/infra/singeleton/RouteCollection";

interface PageProps {
	batch: {
		uuid: string;
		token: string;
		title: string;
		organization_uuid: string;
		organization_name: string;
	}
}



function Page({ batch }: PageProps) {
	return (
		<div className="mx-auto w-7xl px-2 px-8">
			<BatchRoleNav />

			<div className="flex items-start justify-between">
				<div className="flex flex-col">
					<h1 className="text-2xl font-bold" id="batch-title">Batch { batch.title }</h1>
					<p className="mt-2 text-sm text-gray-500">Token: { batch.token }</p>
					<p className="text-sm text-gray-500">Organization: { batch.organization_name }</p>
				</div>
				<button trigger="modal" target="#modal-update-batch" className="mt-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500">
					Ubah Judul Batch
				</button>
			</div>

			<hr className="border-gray-400 my-8" />
			<BatchNav batchId={ batch.uuid } />

			<div class="relative z-10 hidden" id="modal-update-batch" aria-labelledby="modal-title" role="dialog" aria-modal="true">
				<div class="fixed inset-0 bg-gray-500/75" aria-hidden="true"></div>
				<div class="fixed inset-0 z-10 w-screen overflow-y-auto">
					<div class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
						<div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-[500px]">
							<div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
								<h2 className="title text-lg font-semibold text-gray-800 mb-5">Update</h2>
								<form
									hx-put={ route("put.batch.hx.batch.batch_id", [batch.uuid]) }
									hx-target="#batch-title"
									hx-swap="outerHTML"
									method="post"
									id="modal-update-batch-form"
									className="space-y-6 mb-5"
								>
									<div>
										<label htmlFor="title" className="block text-sm font-medium text-gray-700">Judul</label>
										<input
											required
											type="text"
											id="title"
											name="title"
											value={ batch.title }
											className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
										/>
									</div>
								</form>
							</div>
							<div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
								<button
									type="submit"
									form="modal-update-batch-form"
									class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 sm:ml-3 sm:w-auto"
								>Simpan</button>
								<button
									type="button"
									hide="modal"
									target="#modal-update-batch"
									class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
								>Cancel</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export const BatchBatchDetailPage = BatchHTMLHOC(Page, {
	viteGenerated: ["Batch-batch-detail"]
});