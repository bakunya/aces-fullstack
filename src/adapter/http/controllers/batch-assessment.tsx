import { Context } from "@src/adapter/http/contracts/binding"
import { DateImpl } from "@src/infra/date"
import { BatchAssessmentPage } from "@presenter/pages/aces/assessment"
import { GetAssessmentListUsecase } from "@src/application/usecase/GetAssessmentList"
import { BatchRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchRepositoryImpl"

export async function batchAssessmentController(c: Context) {
	const organizationUsecase = new GetAssessmentListUsecase(new BatchRepositoryImpl(c.env.DB), new DateImpl())
	const res = await organizationUsecase.execute()

	return c.html(<BatchAssessmentPage assessment={res} />)
}