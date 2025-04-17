import { ModuleDeveloper } from "@src/application/dto/module-developer";
import { ModuleGetAll } from "@src/application/dto/module-get-all";
import { Module } from "@src/domain/Module";
import { TableModuleType } from "@src/infra/databases/d1/dto/tables";

export interface ModuleRepository {
	getAll(): Promise<ModuleGetAll[]>
	getAllModuleType(): Promise<TableModuleType[]>
	getModuleType(type: string): Promise<TableModuleType>
	getModuleByDeveloper(uuid: string): Promise<Module[]>
	getById(uuid: string): Promise<Module>
	getAllWithModuleType(): Promise<Module[]>
	insert(module: Module, developer: ModuleDeveloper): Promise<void>
}

export interface ModuleInitializer {
	initializeAllTable(moduleId: string, maxtime: number): Promise<void>
}