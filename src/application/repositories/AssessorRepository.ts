import { Repository } from "@src/application/repositories/Repository";
import { TableAssessorBatch } from "@src/infra/databases/d1/dto/tables";

export interface AssessorRepository extends Repository {
	getInBatch(batchId: string): Promise<(TableAssessorBatch & { email: string, username: string, fullname: string })[]>
	getFree(batchId: string[], type: string): Promise<(TableAssessorBatch & { email: string, username: string, fullname: string })[]>
}