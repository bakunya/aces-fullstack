import { ModuleGetAll } from "@src/application/dto/module-get-all";
import { Repository } from "@src/application/repositories/Repository";

export interface ModuleRepository extends Repository {
	getAll(): Promise<ModuleGetAll[]>
}