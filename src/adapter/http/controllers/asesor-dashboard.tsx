import { Context } from "@src/adapter/http/contracts/binding"
import { AsesorDashboardPage } from "@presenter/pages/asesor/dashboard"
import { BatchRepositoryImpl } from "@src/infra/databases/d1/repositories/BatchRepositoryImpl"
import { UserTypeCookie } from "@src/adapter/http/contracts/cookie/user-type"
import { Asesor } from "@src/domain/Asesor"
import { GetAsesorUseCase } from "@src/application/usecase/GetAsesorBatch"

export async function asesorDashboardController(c: Context) {
	const batchRepo = new BatchRepositoryImpl(c.env.DB)
	const usecase = new GetAsesorUseCase(batchRepo)
	const token = c.get("decodedToken") as UserTypeCookie<Asesor>
	const res = await usecase.execute(token.id!)

	return c.html(<AsesorDashboardPage batch={res} />)
}