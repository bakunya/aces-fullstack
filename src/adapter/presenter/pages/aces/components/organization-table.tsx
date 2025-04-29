import { route } from "@src/infra/singeleton/RouteCollection"

interface OrganizationTableProps {
	organizations: {
		uuid: string
		name: string
		code: string
		created?: string
		updated?: string
	}[]
}

export function OrganizationTable({ organizations }: OrganizationTableProps) {
	return (
		<table className="w-full text-left text-sm text-gray-500">
			<thead className="text-xs text-gray-700 uppercase bg-gray-50">
				<tr>
					<th scope="col" className="px-6 py-3">
						Nama
					</th>
					<th scope="col" className="px-6 py-3">
						Kode
					</th>
					<th scope="col" className="px-6 py-3">
						Created
					</th>
					<th scope="col" className="px-6 py-3">
						Updated
					</th>
					<th scope="col" className="px-6 py-3">
						Batch Assessment
					</th>
					<th scope="col" className="px-6 py-3">
						Action
					</th>
				</tr>
			</thead>
			<tbody>
				{ organizations.map((organization) => (
					<tr>
						<td className="px-6 py-4">{ organization.name }</td>
						<td className="px-6 py-4">{ organization.code }</td>
						<td className="px-6 py-4">{ organization.created }</td>
						<td className="px-6 py-4">{ organization.updated }</td>
						<td className="px-6 py-4">
							<button 
								trigger="modal" 
								data-target="#modal-new-batch"
								modal-title={`Batch ${ organization.name }`}
								modal-submit-url={ route("post.aces.organization.organization_id.batch", [organization.uuid]) }
								className="text-xs cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded-md"
							>Tambah</button>
							{/* <button className="ml-2 text-xs cursor-pointer px-4 py-2 bg-teal-600 text-white rounded-md">Lihat</button> */}
						</td>
						<td className="px-6 py-4">
							{/* <button className="text-xs cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded-md">Edit</button>
							<button className="ml-2 text-xs cursor-pointer px-4 py-2 bg-red-600 text-white rounded-md">Hapus</button> */}
						</td>
					</tr>
				)) }
			</tbody>
		</table>
	)
}
