import { BatchDTO } from "@src/application/dto/batch"
import { Repository } from "@src/application/repositories/Repository"
import { BatchAssessment } from "@src/domain/BatchAssessment"
import { CreateBatch } from "@src/domain/CreateBatch"
import { PreparedTransaction } from "@src/infra/databases/d1/dto/transaction"

export interface BatchRepository extends Repository {
	createBatch<T extends false>(batch: CreateBatch, inTransaction?: T): Promise<void>
	createBatch<T extends true>(batch: CreateBatch, inTransaction: T): Promise<PreparedTransaction[]>
	createBatch(batch: CreateBatch, inTransaction?: boolean): Promise<void | PreparedTransaction[]>

	updateTitle<T extends false>(batchId: string, title: string, inTransaction?: T): Promise<void>
	updateTitle<T extends true>(batchId: string, title: string, inTransaction: T): Promise<PreparedTransaction[]>
	updateTitle(batchId: string, title: string, inTransaction?: boolean): Promise<void | PreparedTransaction[]>

	updateTime<T extends false>(batchId: string, timeType: string, timeStart: string, timeEnd: string, inTransaction?: T): Promise<void>
	updateTime<T extends true>(batchId: string, timeType: string, timeStart: string, timeEnd: string, inTransaction: T): Promise<PreparedTransaction[]>
	updateTime(batchId: string, timeType: string, timeStart: string, timeEnd: string, inTransaction?: boolean): Promise<void | PreparedTransaction[]>

	getBatchByToken(token: string): Promise<BatchDTO>
	getBatchById(id: string): Promise<BatchDTO>
	getAssessmentList(): Promise<BatchAssessment[]>
	getLastBatchToken(): Promise<number>
	getBatchIdInSameTimestamp(batchId: string): Promise<{ uuid: string }[]>
}