import { ModuleCategory } from "@src/domain/ModuleType"
import { BatchAssessorDetailAggregation, BatchGroupDetailAggregation } from "@src/infra/databases/d1/dto/aggregations"
import { route } from "@src/infra/singeleton/RouteCollection"

type AssessorDiscPair = {
	groups: BatchGroupDetailAggregation[],
	assessors: BatchAssessorDetailAggregation[]
	show?: boolean
}

export function AssessorDiscPair({ groups, assessors, show = false }: AssessorDiscPair) {
	const shouldRender = groups.find(x => [x.slot_module_category_1, x.slot_module_category_2, x.slot_module_category_3, x.slot_module_category_4].includes(ModuleCategory.DISC))
	if (!shouldRender) return null

	const groupBySlot = [
		groups.filter(x => x.slot_module_category_1 === ModuleCategory.DISC),
		groups.filter(x => x.slot_module_category_2 === ModuleCategory.DISC),
		groups.filter(x => x.slot_module_category_3 === ModuleCategory.DISC),
		groups.filter(x => x.slot_module_category_4 === ModuleCategory.DISC),
	]
	const assessorByAvailability = [
		assessors.filter(x => x.slot1 === 1),
		assessors.filter(x => x.slot2 === 1),
		assessors.filter(x => x.slot3 === 1),
		assessors.filter(x => x.slot4 === 1),
	]

	return (
		<>
			<h1 class="mt-12 mb-5 font-semibold">Pemasangan Asesor Diskusi</h1>
			<div class="overflow-x-auto" x-data={`{show: ${show}}`}>
				<table class="table">
					<thead class="bg-gray-300 text-gray-500">
						<tr>
							<th colspan={ 3 } class="capitalize">
								<div className="flex justify-between items-center">
									<span>Assessor Diskusi</span>
									<button 
										class="btn btn-sm btn-primary"
										x-on:click="show = !show"
										type="button"
										x-text="show ? 'Sembunyikan' : 'Tampilkan'"
									/>
								</div>
							</th>
						</tr>
						<tr>
							<th>Slot</th>
							<th>Judul</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody x-bind:class="show ? '' : 'hidden'">
						{ groupBySlot.map((d, i) => (
							<>
								{ d.map((x) => (
									<tr class="hover:bg-gray-200">
										<td class="p-3">
											Slot { i + 1 }
										</td>
										<td class="p-3">
											{ x.name }
										</td>
										<td className="p-3">
											<select
												class="select"
												name="assessor_id"
												id={ `id-${x.uuid}` }
												hx-swap="none"
												hx-trigger="change"
												hx-include={ `#id-${x.uuid}[name=assessor_id]` }
												hx-put={ route("put.aces.hx.batch.batch_id.manual_pair.group.group_id", [x.batch_uuid, x.uuid]) }
											>
												<option value="">---------</option>
												{ assessorByAvailability[i].map(y => (
													<option disabled={ Boolean(d.find(z => z.disc_assessor_uuid === y.user_uuid)) } selected={ y.user_uuid === x.disc_assessor_uuid } value={ y.user_uuid }>{ y.user_fullname }</option>
												)) }
											</select>
										</td>
									</tr>
								)) }
							</>
						)) }
					</tbody>
				</table>
			</div>
		</>
	)
}