import { route } from "@src/infra/singeleton/RouteCollection"

type Props = {
	batchId: string
	shouldShow: boolean
}

export function PersonUploader({ batchId, shouldShow }: Props) {
	return shouldShow 
	? (
		<section class="w-full mx-auto p-6 bg-white rounded-lg shadow-lg text-center" x-data="uploadPerson()">
			<div x-show="!data?.length" class="border-2 border-dashed border-gray-300 rounded-lg p-8">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-12 w-12 mx-auto text-gray-400 mb-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l6-6m0 0l-6-6m6 6H5a2 2 0 00-2 2v2a2 2 0 002 2h14a2 2 0 002-2v-2a2 2 0 00-2-2z"
					/>
				</svg>

				<p class="text-gray-600 mb-4">
					Upload file peserta.
				</p>
				<p class="text-sm text-gray-500 mb-6">
					Hanya file dengan format <strong>.csv</strong> yang diperbolehkan.
				</p>

				<input
					type="file"
					name="csv"
					accept=".csv"
					class="hidden"
					id="file-upload"
					x-on:change="changeFile($event)"
				/>

				<label
					for="file-upload"
					class="btn btn-neutral btn-sm"
				>
					Pilih File
				</label>

				<p class="text-sm text-gray-500 mt-6">
					Atau download <a href="/assets/template.xlsx" target="_blank"><strong>Template File.</strong></a>
				</p>

				<p class="text-red-600 mt-5" x-text="errorMessage"></p>
			</div>

			<div x-show="data?.length" className="flex flex-col gap-8">
				<div className="flex flex-col gap-3">
					<p class="text-sm text-gray-600">File yang dipilih: <strong x-text="fileName" /></p>
					<p class="text-sm text-gray-600">Jumlah Peserta: <strong x-text="data.length" /></p>
				</div>
				<div class="flex justify-center gap-3">
					<button
						type="button"
						class="btn btn-error btn-sm"
						x-on:click="resetFile()"
					>
						Cancel
					</button>
					<form
						hx-post={route("post.aces.hx.batch.batch_id.person", [batchId])}
						hx-swap="none"
					>
						<input type="hidden" name="persons" x-ref="personsInput"  />
						<button
							type="submit"
							class="btn btn-neutral btn-sm"
						>
							Upload
						</button>
					</form>
				</div>
			</div>
		</section>
	)
	: null
}