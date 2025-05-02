import { Context } from "@src/adapter/http/contracts/binding"
import { BatchAssessorRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchAssessorRepositoryImpl"
import { GroupRepositoryImpl } from "@src/infra/databases/d1/repositories/GroupRepositoryImpl"
import { AssessorDiscPair } from "@presenter/pages/aces/components/assessor-disc-pair"
import { ModuleCategory, ModuleCategoryMapping } from "@src/domain/ModuleType"

export async function acesGetAssessorDiscPairController(c: Context) {
	const batchId = c.req.param("batch_id")

	const [groups, assessors] = await Promise.all([
		GroupRepositoryImpl.create(c.env.DB).getDetail(batchId),
		BatchAssessorRepositoryImpl.create(c.env.DB).getDetail(batchId)
	])

	return c.html(<AssessorDiscPair groups={ groups } show={true} assessors={ assessors.filter(x => ModuleCategoryMapping.fromString(x.type) === ModuleCategory.DISC) ?? [] } />)
}
