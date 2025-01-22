import { Context } from "@src/adapter/http/contracts/binding"
import { AsesiDashboardPage } from "@presenter/pages/asesi/dashboard"
import { BatchRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchRepositoryImpl"
import { GetAsesiUseCase } from "@src/application/usecase/GetAsesiBatch"
import { Asesi } from "@src/domain/Asesi"
import { UserTypeCookie } from "@src/adapter/http/contracts/cookie/user-type"

export async function asesiDashboardController(c: Context) {
	const batchRepo = new BatchRepositoryImpl(c.env.DB)
	const usecase = new GetAsesiUseCase(batchRepo)
	const token = c.get("decodedToken") as UserTypeCookie<Asesi>
	const res = await usecase.execute(token.id!)

	return c.html(<AsesiDashboardPage modules={res.modules} batch={res.batch} />)
}