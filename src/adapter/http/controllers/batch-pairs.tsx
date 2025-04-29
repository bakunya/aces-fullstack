import { Context } from "@src/adapter/http/contracts/binding"
import { BatchPairsPage } from "@presenter/pages/aces/batch-pairs"
import { BatchAssessorRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchAssessorRepositoryImpl"
import { BatchRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchRepositoryImpl"
import { GroupRepositoryImpl } from "@src/infra/databases/d1/repositories/GroupRepositoryImpl"
import { Map } from "@src/infra/utils/Map"
import { GroupingRepositoryImpl } from "@src/infra/databases/d1/repositories/GroupingRepositoryImpl"
import { getSlotPosition } from "@src/application/utils/get-slot-position"
import { ModuleCategory } from "@src/domain/ModuleType"
import { BatchGroupingDetailAggregation } from "@src/infra/databases/d1/dto/aggregations"

export async function batchPairsController(c: Context) {
	const batchId = c.req.param("batch_id")

	const map = new Map()

	const [batch, groups, assessors, groupings] = await Promise.all([
		BatchRepositoryImpl.create(c.env.DB).getBatchById(batchId),
		GroupRepositoryImpl.create(c.env.DB).getDetail(batchId),
		BatchAssessorRepositoryImpl.create(c.env.DB).getDetail(batchId),
		GroupingRepositoryImpl.create(c.env.DB).getDetail(batchId)
	])

	return c.html(
		<BatchPairsPage
			batch={ batch }
			groups={ groups }
			groupingsFace={ getSlotPosition<BatchGroupingDetailAggregation>(groupings, ModuleCategory.FACE) }
			groupingsCase={ getSlotPosition<BatchGroupingDetailAggregation>(groupings, ModuleCategory.CASE) }
			assessors={ map.fromArrayToArray("type", assessors) }
		/>
	)
}
