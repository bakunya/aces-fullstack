import { Repository } from "@src/application/repositories/Repository";
import { ModuleCategory } from "@src/domain/ModuleType";
import { TableAssessorBatch } from "@src/infra/databases/d1/dto/tables";

export interface AssessorRepository extends Repository {
	getInBatch(batchId: string): Promise<(TableAssessorBatch & { email: string, username: string, fullname: string })[]>
	getFree(batchId: string[], type: ModuleCategory): Promise<(TableAssessorBatch & { email: string, username: string, fullname: string })[]>
	isAssessorFree(batchId: string[], assessorId: string, type: ModuleCategory): Promise<boolean>
}