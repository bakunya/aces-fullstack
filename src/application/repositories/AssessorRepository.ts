import { TableAssessorBatch } from "@src/infra/databases/d1/dto/tables";

export interface AssessorRepository {
	getInBatch(batchId: string): Promise<(TableAssessorBatch & { email: string, username: string, fullname: string })[]>
	getFree(batchId: string[], type: string): Promise<(TableAssessorBatch & { email: string, username: string, fullname: string })[]>
}