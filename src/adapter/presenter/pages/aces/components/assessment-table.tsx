import { route } from "@src/infra/singeleton/RouteCollection"

interface AssessmentTableProps {
	assessment: {
		uuid: string,
		token: string,
		title: string,
		type: string,
		organization_name: string,
		batch_time_start?: string,
	}[]
}

export function AssessmentTable({ assessment }: AssessmentTableProps) {
	return (
		<table className="w-full text-left text-sm text-gray-500">
			<thead className="text-xs text-gray-700 uppercase bg-gray-50">
				<tr>
					<th scope="col" className="px-6 py-3">
						Nama Organisasi
					</th>
					<th scope="col" className="px-6 py-3">
						Judul
					</th>
					<th scope="col" className="px-6 py-3">
						Token
					</th>
					<th scope="col" className="px-6 py-3">
						Tipe
					</th>
					<th scope="col" className="px-6 py-3">
						Waktu Mulai
					</th>
					<th scope="col" className="px-6 py-3">
						Action
					</th>
				</tr>
			</thead>
			<tbody>
				{ assessment.map((x) => (
					<tr>
						<td className="px-6 py-4">{ x.organization_name }</td>
						<td className="px-6 py-4">{ x.title }</td>
						<td className="px-6 py-4">{ x.token }</td>
						<td className="px-6 py-4 uppercase">{ x.type }</td>
						<td className="px-6 py-4">{ x.batch_time_start ? `${x.batch_time_start} WIB` : "-" }</td>
						<td className="px-6 py-4">
							<a href={ route("get.aces.batch.batch_id", [x.uuid]) } className="text-xs cursor-pointer px-4 py-2 bg-teal-600 text-white rounded-md">Detail</a>
							{/* <button className="ml-2 text-xs cursor-pointer px-4 py-2 bg-red-600 text-white rounded-md">Hapus</button> */}
						</td>
					</tr>
				)) }
			</tbody>
		</table>
	)
}
