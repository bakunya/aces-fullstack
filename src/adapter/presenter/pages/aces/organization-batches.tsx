import { AcesTMLHOC } from "@presenter/html/aces";
import { BatchRoleNav } from "@presenter/pages/aces/components/batch-role-nav";
import { route } from "@src/infra/singeleton/RouteCollection";

interface OrganizationBatchesPageProps {
	organization: {
		uuid: string;
		name: string;
		code: string;
	};
	batches: {
		uuid: string;
		token: string;
		title: string;
		organization_uuid: string;
		organization_name: string;
		split: number;
		status: number;
		regrouping: number;
		type: string;
		batch_time_start_date?: string;
		batch_time_start_time?: string;
		batch_time_end_date?: string;
		batch_time_end_time?: string;
	}[]
}

function Page({ organization, batches }: OrganizationBatchesPageProps) {
	return (
		<div className="mx-auto w-7xl px-2 px-8">

			<BatchRoleNav />

			<div className="flex justify-between items-center mb-6">
				<div>
					<h1 className="text-2xl font-bold">Batch { organization.name }</h1>
				</div>
			</div>

			<table className="w-full text-left text-sm text-gray-500">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50">
					<tr>
						<th colspan={ 5 } className="px-6 py-3">
							<p className="text-gray-600">
								Total: { batches.length }
							</p>
						</th>
					</tr>
					<tr>
						<th scope="col" className="px-6 py-3">
							Judul
						</th>
						<th scope="col" className="px-6 py-3">
							Status
						</th>
						<th scope="col" className="px-6 py-3">
							Tipe Batch
						</th>
						<th scope="col" className="px-6 py-3">
							Token
						</th>
						<th scope="col" className="px-6 py-3">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{ batches.map(batch => (
						<tr>
							<td className="px-6 py-4">{ batch.title }</td>
							<td className="px-6 py-4">{ batch.status }</td>
							<td className="px-6 py-4 uppercase">{ batch.type }</td>
							<td className="px-6 py-4">{ batch.token }</td>
							<td className="px-6 py-4">
								<a
									href={ route("get.aces.batch.batch_id", [batch.uuid]) }
									className="text-xs cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded-md"
								>Detail</a>
							</td>
						</tr>
					)) }
				</tbody>
			</table>

		</div>
	)
}

export const OrganizationBatchesPage = AcesTMLHOC(Page, {
	viteGenerated: ["aces-organization"]
});
