import { BatchDTO } from "@src/application/dto/batch"
import { BatchAssessment } from "@src/domain/BatchAssessment"
import { CreateBatch } from "@src/domain/CreateBatch"

export interface BatchRepository {
	getBatchByToken(token: string): Promise<BatchDTO>
	getBatchById(id: string): Promise<BatchDTO>
	getAssessmentList(): Promise<BatchAssessment[]>
	getLastBatchToken(): Promise<number>
	createBatch(batch: CreateBatch): Promise<void>
	updateTitle(batchId: string, title: string): Promise<void>
	getBatchIdInSameTimestamp(batchId: string): Promise<{ uuid: string }[]>
}