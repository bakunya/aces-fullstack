import { AcesTMLHOC } from "@presenter/html/aces";
import { BatchRoleNav } from "@presenter/pages/aces/components/batch-role-nav";
import { BatchNav } from "@presenter/pages/aces/components/batch-nav";
import { route } from "@src/infra/singeleton/RouteCollection";
import { HTMX_EVENTS } from "@src/adapter/constant/htmx-events";
import { BatchManagementHeader } from "@presenter/pages/aces/components/batch-management-header";
import { BatchAssessorDetailAggregation, BatchGroupDetailAggregation, BatchGroupingDetailAggregation } from "@src/infra/databases/d1/dto/aggregations";
import { ModuleCategory } from "@src/domain/ModuleType";
import { AssessorDiscPair } from "@presenter/pages/aces/components/assessor-disc-pair";
import { AssessorGroupingPair } from "@presenter/pages/aces/components/assessor-grouping-pair";

interface PageProps {
	batch: {
		uuid: string;
		token: string;
		title: string;
		regrouping: number;
		organization_uuid: string;
		organization_name: string;
	},
	groups: BatchGroupDetailAggregation[],
	assessors: Map<string, BatchAssessorDetailAggregation[]>,
	groupingsFace: Record<number, BatchGroupingDetailAggregation[]>,
	groupingsCase: Record<number, BatchGroupingDetailAggregation[]>,
}


function Page({ batch, groups, assessors, groupingsFace, groupingsCase }: PageProps) {
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


			<div
				hx-get={ route("get.aces.hx.batch.batch_id.assessor_disc_pair", [batch.uuid]) }
				hx-trigger={ `${HTMX_EVENTS.ACES_DiscManualPair} from:body` }
				hx-target="this"
				hx-swap="innerHTML"
			>
				<AssessorDiscPair groups={ groups } assessors={ assessors.get(ModuleCategory.DISC) ?? [] } />
			</div>

			<div
				hx-get={ route("get.aces.hx.batch.batch_id.assessor_groupings_pair.type", [batch.uuid, ModuleCategory.FACE]) }
				hx-trigger={ `${HTMX_EVENTS.ACES_FaceManualPair} from:body` }
				hx-target="this"
				hx-swap="innerHTML"
				x-data={`{showSlot: ''}`}
			>
				<AssessorGroupingPair
					groupings={ groupingsFace }
					type={ ModuleCategory.FACE }
					assessors={ assessors.get(ModuleCategory.FACE) ?? [] }
				/>
			</div>

			<div
				hx-get={ route("get.aces.hx.batch.batch_id.assessor_groupings_pair.type", [batch.uuid, ModuleCategory.CASE]) }
				hx-trigger={ `${HTMX_EVENTS.ACES_CaseManualPair} from:body` }
				hx-target="this"
				hx-swap="innerHTML"
				x-data={`{showSlot: ''}`}
			>
				<AssessorGroupingPair
					groupings={ groupingsCase }
					type={ ModuleCategory.CASE }
					assessors={ assessors.get(ModuleCategory.CASE) ?? [] }
				/>
			</div>
		</div>
	)
}

export const BatchPairsPage = AcesTMLHOC(Page, {
	viteGenerated: ["aces-batch-pairs"]
});