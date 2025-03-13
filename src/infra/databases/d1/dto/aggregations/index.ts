import { TableBatch, TableModule, TableModuleType, TableOrganization } from "@src/infra/databases/d1/dto/tables";

export type BatchJoinOrganization = TableBatch & TableOrganization
export type ModuleJoinModuleType = TableModule & TableModuleType