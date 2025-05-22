import { ModuleBinding } from "@src/application/bindings/ModuleBinding";
import { ModuleGetAll } from "@src/application/dto/module-get-all";
import { BatchModuleRepository } from "@src/application/repositories/BatchModuleRepository";
import { IBatchModule } from "@src/application/usecase-interface/IBatchModule";
import { IUsecase } from "@src/application/usecase-interface/IUsecase";
import { TableBatchModule } from "@src/infra/databases/d1/dto/tables";

export class GetBatchModuleUsecase implements IBatchModule, IUsecase<[string], { modules: Map<string, ModuleGetAll[]>; batchModule: Map<string, (TableBatchModule & { module?: ModuleGetAll })[]> }> {
	constructor(private readonly batchModuleRepo: BatchModuleRepository, private readonly moduleBinding: ModuleBinding) { }

	static create(batchModuleRepo: BatchModuleRepository, moduleBinding: ModuleBinding) {
		return new GetBatchModuleUsecase(batchModuleRepo, moduleBinding);
	}

	async getBatchModules(batchId: string): Promise<(TableBatchModule & { module?: ModuleGetAll })[]> {
		const [batchModule, modules] = await Promise.all([
			this.batchModuleRepo.getByBatch(batchId),
			this.moduleBinding.getAll()
		])
		const batchModuleWithModules = batchModule.map(batchModule => {
			const module = modules.find(module => module.uuid === batchModule.module_uuid)
			return {
				...batchModule,
				module,
			}
		})
		return batchModuleWithModules
	}

	async getBatchModulesByToken(token: string): Promise<(TableBatchModule & { module?: ModuleGetAll })[]> {
		const [batchModule, modules] = await Promise.all([
			this.batchModuleRepo.getByBatchToken(token),
			this.moduleBinding.getAll()
		])

		const batchModuleWithModules = batchModule.map(batchModule => {
			const module = modules.find(module => module.uuid === batchModule.module_uuid)
			return {
				...batchModule,
				module,
			}
		})

		return batchModuleWithModules
	}

	async execute(batchId: string) {
		const [batchModule, modules] = await Promise.all([
			this.batchModuleRepo.getByBatch(batchId),
			this.moduleBinding.getAll()
		])

		const filteredModules = modules.filter(module => {
			return !batchModule.find(batchModule => batchModule.module_uuid === module.uuid)
		})

		const batchModuleWithModules = batchModule.map(batchModule => {
			const module = modules.find(module => module.uuid === batchModule.module_uuid)
			return {
				...batchModule,
				module,
			}
		})

		const filteredModuleMapByCategory = new Map<string, ModuleGetAll[]>()
		const batchModuleWithModulesMapByCategory = new Map<string, (TableBatchModule & { module?: ModuleGetAll })[]>()

		for (const module of filteredModules) {
			if (!filteredModuleMapByCategory.has(module.category)) {
				filteredModuleMapByCategory.set(module.category, [])
			}
			filteredModuleMapByCategory.get(module.category)?.push(module)
		}

		for (const module of batchModuleWithModules) {
			if (!batchModuleWithModulesMapByCategory.has(module.module?.category || "")) {
				batchModuleWithModulesMapByCategory.set(module.module?.category || "", [])
			}
			batchModuleWithModulesMapByCategory.get(module.module?.category || "")?.push(module)
		}

		return {
			modules: filteredModuleMapByCategory,
			batchModule: batchModuleWithModulesMapByCategory,
		}
	}
}