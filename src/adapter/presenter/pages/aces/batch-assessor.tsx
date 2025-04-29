import { AcesTMLHOC } from "@presenter/html/aces";
import { BatchRoleNav } from "@presenter/pages/aces/components/batch-role-nav";
import { BatchNav } from "@presenter/pages/aces/components/batch-nav";
import { BatchManagementHeader } from "@presenter/pages/aces/components/batch-management-header";
import { TableAssessorBatch } from "@src/infra/databases/d1/dto/tables";
import { AssessorRequirement } from "@src/application/dto/assessor-requreiment";
import { FormattedGroupAllocation } from "@src/application/dto/formatted-group-allocation";
import { match } from "ts-pattern";
import { route } from "@src/infra/singeleton/RouteCollection";
import { HTMX_EVENTS } from "@src/adapter/constant/htmx-events";
import { AssessorAllocation } from "@presenter/pages/aces/components/assessor-allocation";

type AssessorAllocated = (TableAssessorBatch & {
	email: string;
	username: string;
	fullname: string;
})

interface PageProps {
	batch: {
		uuid: string;
		token: string;
		title: string;
		regrouping: number;
		organization_uuid: string;
		organization_name: string;
	},
	allocation: {
		assessorAllocated: {
			face_assessors: AssessorAllocated[];
			disc_assessors: AssessorAllocated[];
			case_assessors: AssessorAllocated[];
		};
		assessorRequirement: AssessorRequirement;
		groupAllocation: FormattedGroupAllocation | undefined;
	}
}

function Page({ batch, allocation }: PageProps) {
	return (
		<div className="mx-auto w-7xl px-2 px-8 pb-12">

			<BatchRoleNav />
			<BatchManagementHeader batch={ batch } />

			<hr className="border-gray-400 my-8" />
			<div
				hx-get={ route("get.aces.hx.batch.batch_id.batch_navbar", [batch.uuid]) }
				hx-trigger={ `${HTMX_EVENTS.ACES_Regrouping} from:body` }
				hx-target="this"
				hx-swap="innerHTML"
			>
				<BatchNav batch={ batch } />
			</div>

			{ match(!!allocation.groupAllocation)
				.with(true, () => (
					<>
						<div className="overflow-x-auto rounded mt-10">
							<table className="table">
								<thead>
									<tr className="bg-gray-300">
										<th className="text-left p-3">Jenis Asesor</th>
										<th className="text-left p-3">Minimum</th>
										<th className="text-left p-3">Maksimum</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className="p-3">Asesor Grup:</td>
										<td className="p-3">{ allocation.assessorRequirement.mindisc }</td>
										<td className="p-3">{ allocation.assessorRequirement.maxdisc }</td>
									</tr>
									<tr>
										<td className="p-3">Asesor Case:</td>
										<td className="p-3">{ allocation.assessorRequirement.mincase }</td>
										<td className="p-3">{ allocation.assessorRequirement.maxcase }</td>
									</tr>
									<tr>
										<td className="p-3">Asesor Individu:</td>
										<td className="p-3">{ allocation.assessorRequirement.minface }</td>
										<td className="p-3">{ allocation.assessorRequirement.maxface }</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div className="grid grid-cols-12 gap-5" x-data="{ show: false, type: null }" x-ref="bucket_container">
							<div className="col-span-7 mt-8">
								<div className="flex flex-col gap-10">
									<AssessorAllocation
										batch_uuid={ batch.uuid }
										type="case"
										assessorReqs={ allocation.assessorRequirement }
										title="Asesor Case"
										assessors={ allocation.assessorAllocated.case_assessors }
									/>
									<AssessorAllocation
										batch_uuid={ batch.uuid }
										type="face"
										assessorReqs={ allocation.assessorRequirement }
										title="Asesor Face"
										assessors={ allocation.assessorAllocated.face_assessors }
									/>
									<AssessorAllocation
										batch_uuid={ batch.uuid }
										type="disc"
										assessorReqs={ allocation.assessorRequirement }
										title="Asesor Group"
										assessors={ allocation.assessorAllocated.disc_assessors }
									/>
								</div>
							</div>
							<div className="col-span-5 relative">
								<form id="form-bucket-settings" className="hidden">
									<input type="hidden" readonly name="show" x-model="show" />
									<input type="hidden" readonly name="type" x-model="type" />
								</form>
								<div
									hx-target="this"
									hx-swap="innerHTML"
									hx-include="#form-bucket-settings"
									className="w-full pt-8 sticky top-0"
									hx-trigger={ `${HTMX_EVENTS.ACES_GetAssessorBucketAllocation} from:body` }
									hx-post={route('post.aces.hx.batch.batch_id.assessor_bucket_allocation', [batch.uuid])}
								/>
							</div>
						</div>
					</>
				))
				.with(false, () => (
					<div class={ "w-full bg-gray-100 p-10 flex items-center justify-center rounded mt-4" }>
						<p>Batch ini belum membutuhkan asesor.</p>
					</div>
				))
				.exhaustive() }
		</div>
	)
}

export const BatchAssessorPage = AcesTMLHOC(Page, {
	viteGenerated: ["aces-batch-assessor"],
});