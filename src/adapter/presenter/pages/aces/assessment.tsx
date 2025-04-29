import { BatchHTMLHOC } from "@presenter/html/batch";
import { BatchRoleNav } from "@presenter/pages/aces/components/batch-role-nav";
import { AssessmentTable } from "@presenter/pages/aces/components/assessment-table";

interface PageProps {
	assessment: {
		uuid: string,
		token: string,
		title: string,
		organization_name: string,
		batch_time_start?: string,
	}[]
}


function Page({ assessment }: PageProps) {
	return (
		<div className="mx-auto w-7xl px-2 px-8">
			<BatchRoleNav />

			<div className="flex justify-between">
				<h1 className="text-2xl font-bold">Daftar Assessment</h1>
			</div>

			<div className="relative overflow-x-auto my-12" id="assessment-table">
				<AssessmentTable assessment={assessment} />
			</div>
		</div>
	)
}

export const BatchAssessmentPage = BatchHTMLHOC(Page, {
	viteGenerated: []
});