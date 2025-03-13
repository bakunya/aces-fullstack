import { ModuleDeveloper } from "@src/application/dto/module-developer";
import { Module } from "@src/domain/Module";
import { TableModuleType } from "@src/infra/databases/d1/dto/tables";

export interface ModuleRepository {
	getAll(): Promise<Module[]>
	getAllModuleType(): Promise<TableModuleType[]>
	getModuleType(type: string): Promise<TableModuleType>
	insert(module: Module, developer: ModuleDeveloper): Promise<void>
}