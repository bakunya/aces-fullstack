import { ModuleGetAll } from "@src/application/dto/module-get-all";
import { Module } from "@src/domain/Module";
import { TableModuleType } from "@src/infra/databases/d1/dto/tables";

export interface ModuleRepository {
	getAll(): Promise<ModuleGetAll[]>
	getAllModuleType(): Promise<TableModuleType[]>
	getModuleType(type: string): Promise<TableModuleType>
	getById(uuid: string): Promise<Module>
	getAllWithModuleType(): Promise<Module[]>
}

export interface ModuleInitializer {
	initializeAllTable(moduleId: string, maxtime: number): Promise<void>
}