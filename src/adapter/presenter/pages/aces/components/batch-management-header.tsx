import { route } from "@src/infra/singeleton/RouteCollection";
import { ulidFactory } from "ulid-workers";

type Props = {
	batch: {
		uuid: string;
		token: string;
		title: string;
		organization_uuid: string;
		organization_name: string;
	},
}

export function BatchManagementHeader({ batch }: Props) {
	const id = `modal_id_${ulidFactory()()}`

	return (

		<div className="flex items-start justify-between">
			<div className="flex flex-col">
				<h1 className="text-2xl font-bold" id="batch-title">Batch { batch.title }</h1>
				<p className="mt-2 text-sm text-gray-500">Token: { batch.token }</p>
				<p className="text-sm text-gray-500">Organization: { batch.organization_name }</p>
			</div>

			<button onclick={ `${id}.showModal()` } className="btn btn-neutral btn-sm">
				Ubah Judul Batch
			</button>

			<dialog id={ id } class="modal">
				<div class="modal-box">
					<h2 className="title text-lg font-semibold text-gray-800 mb-5">Update Judul</h2>
					<form
						hx-put={ route("put.aces.hx.batch.batch_id", [batch.uuid]) }
						hx-target="#batch-title"
						hx-swap="outerHTML"
						method="post"
						id="modal-update-batch-form"
						className="space-y-6 mb-5"
					>
						<div>
							<input
								required
								type="text"
								id="title"
								name="title"
								value={ batch.title }
								className="mt-1 input w-full"
							/>
						</div>
					</form>
					<div class="modal-action">
						<button
							type="submit"
							form="modal-update-batch-form"
							class="btn btn-neutral"
						>Simpan</button>
						<form method="dialog">
							<button 
								class="btn"
							>Close</button>
						</form>
					</div>
				</div>
			</dialog>
		</div>
	)
}