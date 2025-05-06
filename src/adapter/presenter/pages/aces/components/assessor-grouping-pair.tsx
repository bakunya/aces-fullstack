import { ModuleCategory } from "@src/domain/ModuleType"
import { BatchAssessorDetailAggregation, BatchGroupingDetailAggregation } from "@src/infra/databases/d1/dto/aggregations"
import { route } from "@src/infra/singeleton/RouteCollection"

type AssessorDiscPair = {
	groupings: Record<number, BatchGroupingDetailAggregation[]>,
	assessors: BatchAssessorDetailAggregation[]
	type: ModuleCategory.CASE | ModuleCategory.FACE
}

export function AssessorGroupingPair({ groupings, assessors, type }: AssessorDiscPair) {
	const shouldRender = Object.values(groupings).some(x => x.length > 0)
	if (!shouldRender) return null

	const assessorByAvailability = [
		assessors.filter(x => x.slot1 === 1),
		assessors.filter(x => x.slot2 === 1),
		assessors.filter(x => x.slot3 === 1),
		assessors.filter(x => x.slot4 === 1),
	]

	return (
		<>
			<h1 class="mt-12 mb-5 font-semibold capitalize">Pemasangan Asesor { type.toLocaleLowerCase() }</h1>
			{ Object.entries(groupings).map(([key, val]) => (
				<>
					<div class="overflow-x-auto my-5">
						<table class="table">
							<thead class="bg-gray-300 text-gray-500">
								<tr>
									<th colspan={ 2 } class="capitalize">
										<div className="flex justify-between items-center">
											<span>Assessor { type.toLocaleLowerCase() } Group { key }</span>
											<button 
												type="button"
												class="btn btn-sm btn-primary"
												x-on:click={`showSlot = (showSlot == ${key} ? '' : ${key})`}
												x-text={`showSlot == ${key} ? 'Sembunyikan' : 'Tampilkan'`}
											/>
										</div>
									</th>
								</tr>
								<tr>
									<th>Slot</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody x-bind:class={`showSlot == ${key} ? '' : 'hidden'`}>
								{ val.map((x) => (
									<tr class="hover:bg-gray-200">
										<td class="p-3">
											{ x.person_name }
										</td>
										<td className="p-3">
											<form 
												hx-swap="none"
												x-data="{ disable: true }"
												className="flex gap-2 items-center"
												hx-put={ route("put.aces.hx.batch.batch_id.manual_pair.grouping.grouping_id.type.type", [x.batch_uuid, x.batch_groupings_id, type]) }
											>
												<select
													class="select"
													name="assessor_id"
													x-bind:disabled="disable"
													id={ `id-${type}-${x.batch_groupings_id}` }
												>
													<option value="">---------</option>
													{ assessorByAvailability[Number(key) - 1]?.map?.(y => (
														<option
															value={ y.user_uuid }
															selected={ y.user_uuid === x[`${type.toLocaleLowerCase()}_assessor_uuid` as keyof BatchGroupingDetailAggregation] }
															disabled={ Boolean(val.find(z => z[`${type.toLocaleLowerCase()}_assessor_uuid` as keyof BatchGroupingDetailAggregation] === y.user_uuid)) }
														>
															{ y.user_fullname }
														</option>
													)) }
												</select>
												<button x-show="!disable" type="submit" className="btn btn-primary"><small>Simpan</small></button>
												<button x-show="!disable" x-on:click="disable = true" type="reset" className="btn btn-neutral"><small>Cancel</small></button>
												<button x-show="disable" x-on:click="disable = false" type="button" className="btn btn-neutral"><small>Edit</small></button>
											</form>
										</td>
									</tr>
								)) }
							</tbody>
						</table>
					</div >
				</>
			)) }
		</>
	)
}