import { Context } from "@src/adapter/http/contracts/binding"
import { BatchAssessorRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchAssessorRepositoryImpl"
import { ModuleCategory, ModuleCategoryMapping } from "@src/domain/ModuleType"
import { GroupingRepositoryImpl } from "@src/infra/databases/d1/repositories/GroupingRepositoryImpl"
import { AssessorGroupingPair } from "@presenter/pages/aces/components/assessor-grouping-pair"
import { BatchGroupingDetailAggregation } from "@src/infra/databases/d1/dto/aggregations"
import { getSlotPosition } from "@src/application/utils/get-slot-position"

export async function acesGetAssessorGroupingsPairController(c: Context) {
	const batchId = c.req.param("batch_id")
	const type = ModuleCategoryMapping.fromString(c.req.param("type")) as ModuleCategory.FACE | ModuleCategory.CASE

	const [assessors, groupings] = await Promise.all([
		BatchAssessorRepositoryImpl.create(c.env.DB).getDetail(batchId),
		GroupingRepositoryImpl.create(c.env.DB).getDetail(batchId)
	])

	return c.html(
		<AssessorGroupingPair
			type={ type }
			groupings={ getSlotPosition<BatchGroupingDetailAggregation>(groupings, type) }
			assessors={ assessors.filter(x => ModuleCategoryMapping.fromString(x.type) === type) ?? [] }
		/>
	)
}
