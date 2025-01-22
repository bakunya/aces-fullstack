import { Batch } from "@src/domain/Batch"
import { BatchModule } from "@src/domain/BatchModule"

export interface BatchRepository {
	getBatchByAsesorId(asesorId: string): Promise<Batch[]>
	getBatchDetailById(batchId: string): Promise<{ batch: Batch, modules: BatchModule[] }>
	getBatchDetailByAsesiId(asesiId: string): Promise<{ batch: Batch, modules: BatchModule[] }>
}