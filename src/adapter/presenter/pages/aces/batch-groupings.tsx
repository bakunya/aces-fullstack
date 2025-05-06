import { AcesTMLHOC } from "@presenter/html/aces";
import { BatchRoleNav } from "@presenter/pages/aces/components/batch-role-nav";
import { BatchNav } from "@presenter/pages/aces/components/batch-nav";
import { route } from "@src/infra/singeleton/RouteCollection";
import { HTMX_EVENTS } from "@src/adapter/constant/htmx-events";
import { BatchManagementHeader } from "@presenter/pages/aces/components/batch-management-header";
import { BatchGroupDetailAggregation, BatchPersonDetailAggregation } from "@src/infra/databases/d1/dto/aggregations";
import { BatchModuleDetail } from "@src/application/repositories/BatchModuleRepository";

interface PageProps {
	modules: BatchModuleDetail[];
	groups: BatchGroupDetailAggregation[];
	persons: BatchPersonDetailAggregation[],
	batch: {
		type: string;
		uuid: string;
		token: string;
		title: string;
		regrouping: number;
		organization_uuid: string;
		organization_name: string;
	},
}



function Page({ modules, groups, persons, batch }: PageProps) {
	const hasFaceModule = groups
		.map(entry => {
			return ['slot_module_category_1', 'slot_module_category_2', 'slot_module_category_3', 'slot_module_category_4']
				.some(slot => (entry as any)[slot]?.includes('FACE'))
		})
		.find(x => x);
	const hasCaseModule = groups
		.map(entry => {
			return ['slot_module_category_1', 'slot_module_category_2', 'slot_module_category_3', 'slot_module_category_4']
				.some(slot => (entry as any)[slot]?.includes('CASE'))
		})
		.find(x => x);

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

			<h1 class="mt-12 mb-5 font-semibold">Pembagian grup dan slot dalam batch ini</h1>
			<div class="overflow-x-auto">
				<table class="table">
					<thead>
						<tr class={ "bg-gray-300" }>
							<th>Nama</th>
							<th>Slot 1</th>
							<th>Slot 2</th>
							<th>Slot 3</th>
							<th>Slot 4</th>
						</tr>
					</thead>
					<tbody>
						{ groups.map((g) => (
							<tr>
								<td>{ g.name }</td>
								<td>{ modules.filter((m) => m.module_uuid == g.slot_module_uuid_1)[0]?.module_title || '---' }</td>
								<td>{ modules.filter((m) => m.module_uuid == g.slot_module_uuid_2)[0]?.module_title || '---' }</td>
								<td>{ modules.filter((m) => m.module_uuid == g.slot_module_uuid_3)[0]?.module_title || '---' }</td>
								<td>{ modules.filter((m) => m.module_uuid == g.slot_module_uuid_4)[0]?.module_title || '---' }</td>
							</tr>
						)) }
					</tbody>
				</table>
			</div>
			<div class="mt-12">
				{ groups.map((g) => (
					<div class="my-8">
						<p class="text-[15px] font-semibold mb-2">{ g.name }</p>
						<p class="text-[15px] font-semibold mb-2">{ g.disc_assessor_name }</p>
						<table class="table w-full">
							<thead>
								<tr class="border-b border-stone-300 bg-gray-300">
									<th class="text-left w-8">No</th>
									<th class="text-left">Peserta</th>
									{ hasFaceModule && <th class="text-left">Assessor Face</th> }
									{ hasCaseModule && <th class="text-left">Assessor Case</th> }
								</tr>
							</thead>
							<tbody>
								{ persons
									.filter((p) => p.group_uuid == g.uuid)
									.map((p, i) => (
										<tr class="border-b border-stone-300">
											<td class="w-8">{ i + 1 }</td>
											<td>{ p.name }</td>
											{ hasFaceModule && <td class="pr-2 py-2">{ p.face_assessor_name }</td> }
											{ hasCaseModule && <td class="pr-2 py-2">{ p.case_assessor_name }</td> }
										</tr>
									)) }
							</tbody>
						</table>
					</div>
				)) }
			</div>
		</div>
	)
}

export const BatchGroupingsPage = AcesTMLHOC(Page, {
	// viteGenerated: ["aces-batch-detail"]
});