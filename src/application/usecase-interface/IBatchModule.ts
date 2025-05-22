import { ModuleGetAll } from "@src/application/dto/module-get-all";
import { TableBatchModule } from "@src/infra/databases/d1/dto/tables";

export interface IBatchModule {
	getBatchModules(batchId: string): Promise<(TableBatchModule & { module?: ModuleGetAll})[]>
	getBatchModulesByToken(token: string): Promise<(TableBatchModule & { module?: ModuleGetAll})[]>
}