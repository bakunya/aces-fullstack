import { ModuleGetAll } from "@src/application/dto/module-get-all";

export interface ModuleBinding {
	getAll(): Promise<ModuleGetAll[]>
}