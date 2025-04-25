import { Context } from "@src/adapter/http/contracts/binding";
import { GetAllocation } from "@src/application/usecase/GetAllocation";
import { BatchAssessorTable } from "@presenter/pages/aces/components/batch-assessor-table";
import { GroupRepositoryImpl } from "@src/infra/databases/d1/repositories/GroupRepositoryImpl";
import { AssessorRepositoryImpl } from "@src/infra/databases/d1/repositories/AssessorRepositoryImpl";

export async function acesGetBatchAssessorTableController(c: Context) {
	const moduleType = c.req.param("module_type")
	const allocationUsecase = GetAllocation.create(
		GroupRepositoryImpl.create(c.env.DB),
		AssessorRepositoryImpl.create(c.env.DB)
	)
	const assessors = await allocationUsecase.getAssessorAllocated(c.req.param("batch_id"))
	// @ts-ignore
	const assessor = assessors[`${moduleType}_assessors`]
	if (!assessor) {
		return c.text("Module type not found", 404)
	}

	return c.html(<BatchAssessorTable assessors={assessor} batch_uuid={c.req.param("batch_id")} />)
}