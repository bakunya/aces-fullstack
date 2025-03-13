import { ModuleRepository } from "@src/application/repositories/ModuleRepository";
import { IModuleType } from "@src/application/usecase-interface/IModuleType";
import { ModuleTypeDomain } from "@src/domain/ModuleType";

export class ModuleTypeUsecase implements IModuleType {
	constructor(private readonly repo: ModuleRepository) { }

	static create(repo: ModuleRepository): ModuleTypeUsecase {
		return new ModuleTypeUsecase(repo);
	}

	async getFromType(type: string) {
		const data = await this.repo.getModuleType(type);
		return ModuleTypeDomain.create(data.type, data.category, data.id);
	}
}