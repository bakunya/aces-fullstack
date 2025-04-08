import { CreateModuleRequest } from "@src/adapter/http/contracts/request/create_module";
import { ModuleDeveloper } from "@src/application/dto/module-developer";
import { ModuleInitializer, ModuleRepository } from "@src/application/repositories/ModuleRepository";
import { IModuleType } from "@src/application/usecase-interface/IModuleType";
import { Uuid } from "@src/application/uuid";
import { Module } from "@src/domain/Module";

export class CreateModuleUsecase {
	constructor(private readonly repo: ModuleRepository, private readonly  moduleType: IModuleType, private readonly uuid: Uuid, private readonly moduleInitializer: ModuleInitializer) { }

	static create(repo: ModuleRepository, moduleType: IModuleType, uuid: Uuid, moduleInitializer: ModuleInitializer) {
		return new CreateModuleUsecase(repo, moduleType, uuid, moduleInitializer);
	}

	async execute(request: CreateModuleRequest): Promise<void> {
		const moduleType = await this.moduleType.getFromType(request.module_type);
		
		const module = Module.create(this.uuid.get(), moduleType.type, request.module_title, moduleType.category, undefined, request.module_description);
		const developer: ModuleDeveloper = { 
			mod_uuid: module.uuid,
			user_uuid: request.module_developer,
		}
		
		await this.repo.insert(module, developer);
		await this.moduleInitializer.initializeAllTable(module.uuid, Number(request.module_maxtime));
	}
}