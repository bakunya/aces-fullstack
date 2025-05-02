import { BatchAssessorTable } from "@presenter/pages/aces/components/batch-assessor-table";
import { HTMX_EVENTS } from "@src/adapter/constant/htmx-events";
import { AssessorRequirement } from "@src/application/dto/assessor-requreiment";
import { TableAssessorBatch } from "@src/infra/databases/d1/dto/tables";
import { route } from "@src/infra/singeleton/RouteCollection";

type AssessorAllocated = (TableAssessorBatch & {
	email: string;
	username: string;
	fullname: string;
})
type Props = { batch_uuid: string; type: string; assessorReqs: AssessorRequirement; title: string; assessors: AssessorAllocated[] }

export function AssessorAllocation(props: Props) {
	const { batch_uuid, type, assessorReqs, title, assessors } = props;
	// @ts-ignore
	const minimum = assessorReqs[`min${type}`]
	// @ts-ignore
	const maximum = assessorReqs[`max${type}`]

	if (minimum == 0) return <></>
	return (
		<div>
			<div class="flex items-center justify-between">
				<h3 class="font-bold">
					{ title }: { minimum } - { maximum }
				</h3>
				<div id={ `${type}-load-bucket` }>
					<button 
						x-on:click={`
							show = true; 
							type = '${type}';
							setTimeout(() => htmx.trigger(document.body, '${HTMX_EVENTS.ACES_GetAssessorBucketAllocation}'), 100)
							`}
						class="btn-sm btn"
						x-bind:class={`type === '${type}' ? 'btn-neutral' : 'bg-transparent btn-outline'`}
						x-text={`type === '${type}' ? 'Reload' : 'Tampilkan Data Asesor'`}
					/>
				</div>
			</div>
			<div className="mt-5">
				<div
					hx-get={route("get.aces.hx.batch.batch_id.batch_assessor_table.module_type", [batch_uuid, type])}
					hx-trigger={ `${HTMX_EVENTS.ACES_GetBatchAssessorTable}_${type} from:body` }
					hx-target="this"
					hx-swap="innerHTML"
					hx-indicator="#bucket-loader"
				>
					<BatchAssessorTable assessors={assessors} batch_uuid={batch_uuid} />
				</div>
			</div>
		</div>
	);
};