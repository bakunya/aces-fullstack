type Props = {
	persons: {
		batchId: string,
		name: string,
		nip: string,
		hash: string,
		email: string,
		gender: string,
		username: string,
		id?: string,
		batchGroupId?: number,
		organizationId?: string,
	}[],
	shouldShow: boolean,
}

export function PersonTable({ persons, shouldShow }: Props) {
	return shouldShow 
	? (
		<div class="overflow-x-auto">
			<table className="w-full text-left text-sm text-gray-500">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50">
					<tr>
						<th scope="col" className="px-6 py-3">
							Nama Peserta
						</th>
						<th scope="col" className="px-6 py-3">
							NIP
						</th>
						<th scope="col" className="px-6 py-3">
							Email
						</th>
						<th scope="col" className="px-6 py-3">
							Username
						</th>
						<th scope="col" className="px-6 py-3">
							Gender
						</th>
						<th scope="col" className="px-6 py-3">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{ persons.map((x) => (
						<tr>
							<td className="px-6 py-4">{ x.name }</td>
							<td className="px-6 py-4">{ x.nip }</td>
							<td className="px-6 py-4">{ x.email }</td>
							<td className="px-6 py-4">{ x.username }</td>
							<td className="px-6 py-4">{ x.gender }</td>
							<td className="px-6 py-4">
								<div className="flex gap-2">
									<button className="btn btn-error btn-sm">Hapus</button>
									<button 
										className="btn btn-primary btn-sm"
										x-on:click={`setPerson('${JSON.stringify(x)}')`}
									>Edit</button>
								</div>
							</td>
						</tr>
					)) }
				</tbody>
			</table>
		</div>
	)
	: null
}