import { HTMX_EVENTS } from "@src/adapter/constant/htmx-events";
import { TableAssessorBatch } from "@src/infra/databases/d1/dto/tables";
import { route } from "@src/infra/singeleton/RouteCollection";

type Props = {
	type: string;
	show: boolean;
	batchId: string;
	assessor: (TableAssessorBatch & {
		email: string;
		username: string;
		fullname: string;
	})[]
}

export function AssessorBucketAllocation({ show, assessor, type, batchId }: Props) {
	return show
		? (
			<div className="p-5 bg-gray-100 rounded relative">
				<div className="htmx-indicator hidden" id="bucket-loader">
					<div className="w-full h-full bg-black/20 absolute inset-0 rounded flex items-center justify-center">
						<svg class="mr-3 -ml-1 size-5 animate-spin text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
					</div>
				</div>
				<h3 class="font-bold mb-3 capitalize">Daftar Asesor { type }</h3>
				<div x-data="{ search: '' }">
					<input 
						type="text" 
						class="mb-5 bg-white rounded p-2 w-full border border-gray-300" 
						placeholder="Search..."
						x-model="search"
					/>
					<div class="max-h-[300px] overflow-x-auto flex flex-col gap-3">
						{ assessor.map(v => (
							<button
								type="button"
								hx-swap="none"
								class="btn justify-start btn-soft" 
								hx-indicator="#bucket-loader"
								hx-post={route("post.aces.hx.batch.batch_id.assessor.assessor_id.allocate", [batchId, v.user_uuid], { type })}
								x-bind:style={`'display: ' + ("${v.fullname}".toLowerCase().includes(search.toLowerCase()) ? 'flex' : 'none')`}
							>
								{ v.fullname }
							</button>
						)) }
					</div>
				</div>
				<button 
					class="btn btn-sm btn-neutral mt-5"
					x-on:click={`
						type = null;
						show = false;
						setTimeout(() => htmx.trigger(document.body, '${HTMX_EVENTS.ACES_GetAssessorBucketAllocation}'), 100)
					`}
				>
					Close
				</button>
			</div>
		)
		: null
}