import { AppError } from "@src/application/error/AppError";
import { BatchRepository } from "@src/application/repositories/BatchRepository";
import { Batch } from "@src/domain/Batch";
import { BatchModule } from "@src/domain/BatchModule";


const batches = [
	{
		id: "1",
		asesorId: '1',
		asesiId: '1',
		name: 'Batch 1',
	},
	{
		id: "2",
		asesorId: '1',
		asesiId: '2',
		name: 'Batch 2',
	},
	{
		id: "3",
		asesorId: '2',
		asesiId: '3',
		name: 'Batch 3',
	},
	{
		id: "4",
		asesorId: '2',
		asesiId: '4',
		name: 'Batch 4',
	}
]

const modules = [
	{ id: '1', batchId: '1', name: 'Module 1 of Batch 1' },
	{ id: '2', batchId: '1', name: 'Module 2 of Batch 1' },
	{ id: '3', batchId: '1', name: 'Module 3 of Batch 1' },
	{ id: '4', batchId: '1', name: 'Module 4 of Batch 1' },
	{ id: '5', batchId: '2', name: 'Module 1 of Batch 2' },
	{ id: '6', batchId: '2', name: 'Module 2 of Batch 2' },
	{ id: '7', batchId: '2', name: 'Module 3 of Batch 2' },
	{ id: '8', batchId: '2', name: 'Module 4 of Batch 2' },
	{ id: '9', batchId: '3', name: 'Module 1 of Batch 3' },
	{ id: '10', batchId: '3', name: 'Module 2 of Batch 3' },
	{ id: '11', batchId: '3', name: 'Module 3 of Batch 3' },
	{ id: '12', batchId: '3', name: 'Module 4 of Batch 3' },
	{ id: '13', batchId: '4', name: 'Module 1 of Batch 4' },
	{ id: '14', batchId: '4', name: 'Module 2 of Batch 4' },
	{ id: '15', batchId: '4', name: 'Module 3 of Batch 4' },
	{ id: '16', batchId: '4', name: 'Module 4 of Batch 4' },
]



export class BatchRepositoryImpl implements BatchRepository {
	constructor(private readonly DB: D1Database) {}

	getBatchByAsesorId(asesorId: string) {
		return Promise.resolve(batches.filter((x) => x.asesorId === asesorId));
	}

	getBatchDetailByAsesiId(asesiId: string) {
		let batch = batches.find((x) => x.asesiId === asesiId);
		if (!batch) throw AppError.notFound('Batch not found');
		let module = modules.filter((x) => x.batchId === batch.id);
		if (!module.length) throw AppError.notFound('Module not found');
		return Promise.resolve({
			batch: Batch.create(
				batch.asesorId,
				batch.asesiId,
				batch.name,
				batch.id
			),
			modules: module.map((x) => new BatchModule(x.id, x.batchId, x.name))
		});
	}

	getBatchDetailById(batchId: string) {
		let batch = batches.find((x) => x.asesiId === batchId);
		if (!batch) throw AppError.notFound('Batch not found');
		let module = modules.filter((x) => x.batchId === batch.id);
		if (!module.length) throw AppError.notFound('Module not found');
		return Promise.resolve({
			batch: Batch.create(
				batch.asesorId,
				batch.asesiId,
				batch.name,
				batch.id
			),
			modules: module.map((x) => new BatchModule(x.id, x.batchId, x.name))
		});
	}
}