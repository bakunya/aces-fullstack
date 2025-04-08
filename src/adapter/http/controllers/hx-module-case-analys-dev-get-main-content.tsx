import { QuillElement } from "@presenter/components/quill-element";
import { Context } from "@src/adapter/http/contracts/binding";
import { HxCaseAnalysMainContentUrlParam } from "@src/adapter/http/contracts/request/hx-case-analys-main-content";
import { CaseAnalysRepositoryImpl } from "@src/infra/databases/d1/repositories/CaseAnalysRepositoryImpl";

export async function hxModuleCaseAnalysGetQuillMainContentController(c: Context) {
	const repo = CaseAnalysRepositoryImpl.create(c.env.DB)
	const mainContent = await repo.getMainContent(c.req.param(HxCaseAnalysMainContentUrlParam.id))

	return c.html(<QuillElement initFunction="initMainContentEditor()" dataSaved={mainContent} />)
}