import { ModuleTypeDomain } from "@src/domain/ModuleType";

export interface IModuleType {
	getFromType(type: string): Promise<ModuleTypeDomain>
}