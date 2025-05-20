import { route } from "@src/infra/singeleton/RouteCollection";

type Props = {
	batchId: string
	availableModulesObject: Record<string, {
		uuid: string
		type: string
		title: string
		description: string
		category: string
		hash?: string
	}[]>,
	batchInModulesObject: Record<string, {
        batch_uuid: string;
        module_uuid: string;
        uuid: string;
        created: string;
        priority: number;
        updated?: string;
        module?: {
            type: string;
            title: string;
        };
    }[]>,
	shouldShow: boolean
}

export function FormAddBatchModule({ batchId,  availableModulesObject, batchInModulesObject, shouldShow }: Props) {
	const currentCategoriesSelected = Object.keys(batchInModulesObject)
	const availableModuleCategories = Array.from(new Set(Object.values(availableModulesObject).flat(2)
		.map((module) => {
			if (currentCategoriesSelected.includes("FACE") && module.category === "FACE") return null
			if (currentCategoriesSelected.includes("DISC") && module.category === "DISC") return null
			return module.category
		})))
		.filter(Boolean) as string[]
	


	return shouldShow 
	? (
		<>
			<script dangerouslySetInnerHTML={{ __html: `
				window.serverData = {}
				window.serverData.availableModules = ${ JSON.stringify(availableModulesObject) };
				window.serverData.batchInModules = ${ JSON.stringify(batchInModulesObject) };
			` }} />
			<div className="p-5 border-gray-300 border rounded-md" x-data="addModuleStore()">
				<p class={ "font-semibold mb-5" }>Tambah Modules</p>
				<div className="flex flex-col">
					<fieldset class="fieldset">
						<legend class="fieldset-legend">Pilih kategori module</legend>
						<select class="select w-full" x-model="moduleCategory">
							<option selected value={""}>--</option>
							{ availableModuleCategories.map((category) => (
								<option value={ category }>{ category }</option>
							))}
						</select>
					</fieldset>
					<fieldset class="fieldset" x-show="moduleCategory !== undefined">
						<legend class="fieldset-legend">Pilih judul module</legend>
						<select class="select w-full" x-model="selectedModule">
							<option selected value={""}>--</option>
							<template x-for="module in filteredAvailableModules()">
								<option x-bind:value="module.uuid" x-text="module.title"></option>
							</template>
						</select>
					</fieldset>
					<form 
						hx-post={ route("post.aces.hx.batch.batch_id.module", [batchId]) }
						hx-swap="none"
						x-show="selectedModule !== undefined"
					>
						<input type="hidden" name="module_category" x-model="moduleCategory" />
						<input type="hidden" name="module" x-model="selectedModule" />
						<button className="btn btn-neutral mt-5 w-full">Tambahkan</button>
					</form>
				</div>
				{/* watcher */}
				<div x-effect="if (moduleCategory === '') moduleCategory = undefined"></div>
				<div x-effect="if (selectedModule === '') selectedModule = undefined"></div>
				<div x-effect="if (moduleCategory) selectedModule = undefined"></div>
				<div x-effect="if (!moduleCategory) selectedModule = undefined"></div>
			</div>
		</>
	)
	: null
}