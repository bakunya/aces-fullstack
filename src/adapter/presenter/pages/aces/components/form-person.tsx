import { route } from "@src/infra/singeleton/RouteCollection"

type Props = {
	shouldShow: boolean,
	batchId: string,
}

export function FormPerson({ batchId, shouldShow }: Props) {
	return shouldShow
		? (
			<form 
				hx-swap="none"
				hx-put={route("put.aces.hx.batch.batch_id.person", [batchId])}
				class={ "rounded border border-gray-300 p-5 flex flex-col" }
				x-init="deletePerson()"
			>
				<h1 class={"font-bold text-lg mb-5"} x-show="id === undefined">Tambah Peserta</h1>
				<h1 class={"font-bold text-lg mb-5"} x-show="id !== undefined">Ubah Peserta</h1>
				<input type="hidden" name="person_id" x-model="id" />
				<fieldset class="fieldset w-full">
					<legend class="fieldset-legend">Nama Peserta<span className="text-red-600">*</span></legend>
					<input type="text" required name="person_name" class="input w-full" placeholder="Type here" x-model="name" />
				</fieldset>
				<fieldset class="fieldset w-full">
					<legend class="fieldset-legend">NIP<span className="text-red-600">*</span></legend>
					<input type="text" required name="person_nip" class="input w-full" placeholder="Type here" x-model="nip" />
				</fieldset>
				<fieldset class="fieldset w-full">
					<legend class="fieldset-legend">Email<span className="text-red-600">*</span></legend>
					<input type="email" required name="person_email" class="input w-full" placeholder="Type here" x-model="email" />
				</fieldset>
				<fieldset class="fieldset w-full">
					<legend class="fieldset-legend">Username<span className="text-red-600">*</span></legend>
					<input type="text" required name="person_username" class="input w-full" placeholder="Type here" x-model="username" />
				</fieldset>
				<fieldset class="fieldset w-full">
					<legend class="fieldset-legend">Gender<span className="text-red-600">*</span></legend>
					<input type="text" required name="person_gender" class="input w-full" placeholder="Type here" x-model="gender" />
				</fieldset>
				<fieldset class="fieldset w-full">
					<legend class="fieldset-legend">Password<span className="text-red-600" x-show="id === undefined">*</span></legend>
					<input type="text" x-model="plain" name="person_password" class="input w-full" placeholder="Type here" />
				</fieldset>
				<div className="flex gap-3 w-full mt-8">
					<button type="button" x-on:click="deletePerson()" class={ "btn flex-grow btn-sm btn-danger" }>Cancel</button>
					<button type="submit" class={ "btn flex-grow btn-sm btn-primary" }>Save</button>
				</div>
			</form>
		)
		: null
}