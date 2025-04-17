import { ModuleGetAll } from "@src/application/dto/module-get-all";
import { BatchModuleRepository } from "@src/application/repositories/BatchModuleRepository";
import { ModuleRepository } from "@src/application/repositories/ModuleRepository";
import { TableBatchModule } from "@src/infra/databases/d1/dto/tables";

export class GetBatchModuleUsecase {
	constructor(private readonly batchModuleRepo: BatchModuleRepository, private readonly moduleRepo: ModuleRepository) { }

	static create(batchModuleRepo: BatchModuleRepository, moduleRepo: ModuleRepository) {
		return new GetBatchModuleUsecase(batchModuleRepo, moduleRepo);
	}

	async execute(batchId: string) {
		const [batchModule, modules] = await Promise.all([
			this.batchModuleRepo.getByBatch(batchId),
			this.moduleRepo.getAll()
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
		const batchModuleWithModulesMapByCategory = new Map<string, (TableBatchModule & { module?: ModuleGetAll})[]>()

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