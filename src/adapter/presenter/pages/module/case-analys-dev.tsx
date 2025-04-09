import { CaseAnalysAssignmentList } from "@presenter/components/case-analys-assignment-list";
import { QuillElement } from "@presenter/components/quill-element";
import { ModuleHTMLHOC } from "@presenter/html/module";
import { HTMX_EVENTS } from "@src/adapter/constant/htmx-events";
import { route } from "@src/infra/singeleton/RouteCollection";

type TElement = {
	id: string,
	name: string,
	domain: string,
	description: string,
}

type TCaseAnalysQuestionData = {
	modUuid: string,
	modTitle: string,
	mainContent: string,
	assignmentId: string,
	assignmentTitle: string,
	assignmentContent: string,
	questionId: string,
	questionContent: string,
	questionSequence: number,
	assignmentSequence: number,
	caseAnalysElement?: {
		id: string,
		idElement: string,
		idModCaQuestion: string,
	}[]
}

const Page = ({ caseAnalys, elements }: { elements: Map<string, TElement>, caseAnalys: TCaseAnalysQuestionData[] }) => {
	return (
		<div className="p-5">
			<div className="max-w-4xl mx-auto px-6">
				<div className="flex flex-col mt-5 mb-8">
					<span className="text-sm font-semibold text-gray-500">Case Analysis</span>
					<h1 className="font-bold text-xl capitalize">Judul: { caseAnalys[0].modTitle }</h1>
				</div>
				<div className="flex flex-col gap-5" data-elements={ JSON.stringify(elements) } id="case-analys-question-sheet">
					<div className="bg-gray-200 p-5 rounded flex flex-col gap-4" id="main-content">
						<div
							hx-target="this"
							hx-swap="innerHTML"
							hx-trigger={`${HTMX_EVENTS.MODULE_GetCaseAnalysMainContent} from:body`}
							hx-get={ route("get.module.hx.case_analysis.id.dev.main.content", [caseAnalys[0].modUuid]) }
						>
							<QuillElement initFunction="initMainContentEditor()" dataSaved={ caseAnalys[0].mainContent } />
						</div>
						<form hx-swap="none" hx-put={ route("put.module.hx.case_analysis.id.dev.main.content", [caseAnalys[0].modUuid]) }>
							<input type="hidden" name="main-content" />
							<button
								data-update="case_analys"
								className="btn btn-primary ml-auto block"
							>Simpan</button>
						</form>
					</div>
					<div
						hx-target="this"
						hx-swap="innerHTML"
						hx-trigger={`${HTMX_EVENTS.MODULE_GetCaseAnalysAssignmentList} from:body`}
						hx-get={route("get.module.hx.case_analysis.id.dev.assignment.list", [caseAnalys[0].modUuid])}
					>
						<CaseAnalysAssignmentList caseAnalys={ caseAnalys } elements={ elements } />
					</div>
					<hr className="mb-12" />
					<button
						hx-swap="none"
						className="btn btn-neutral"
						hx-post={ route("post.module.hx.case_analysis.id.dev.assignment", [caseAnalys[0].modUuid]) }
					>Tambah tugas</button>
				</div>
			</div>
		</div>
	)
}

export const ModuleCaseAnalysDevPage = ModuleHTMLHOC(Page, { viteGenerated: ["case-analys-dev"] });