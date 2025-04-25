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
			<div className="p-5 bg-gray-100 rounded">
				<h3 class="font-bold mb-3 capitalize">Daftar Asesor { type }</h3>
				<div x-data="{ search: '' }" >
					<input 
						type="text" 
						class="mb-5 bg-white rounded p-2 w-full border border-gray-300" 
						placeholder="Search..."
						x-model="search"
					/>
					<div class="max-h-[300px] overflow-x-auto flex flex-col gap-3">
						{ assessor.map(v => (
							<button
								class="btn justify-start btn-soft" 
								x-bind:style={`'display: ' + ("${v.fullname}".toLowerCase().includes(search.toLowerCase()) ? 'flex' : 'none')`}
								hx-post={route("post.aces.hx.batch.batch_id.assessor.assessor_id.allocate", [batchId, v.user_uuid], { type })}
								type="button"
								hx-swap="none"
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