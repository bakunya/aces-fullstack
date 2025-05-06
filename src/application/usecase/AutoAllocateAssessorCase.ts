import { BatchAssessorRepository } from "@src/application/repositories/BatchAssessorRepository";
import { GroupingRepository } from "@src/application/repositories/GroupingRepository";
import { IUsecase } from "@src/application/usecase-interface/IUsecase";
import { ModuleCategory } from "@src/domain/ModuleType";

export class AutoAllocateAssessorCaseUsecase implements IUsecase<[string], void> {
	constructor(
		private readonly batchAssessorRepo: BatchAssessorRepository,
		private readonly batchGroupingRepo: GroupingRepository,
	) { }

	static create(
		batchAssessorRepo: BatchAssessorRepository,
		batchGroupingRepo: GroupingRepository,
	) {
		return new AutoAllocateAssessorCaseUsecase(batchAssessorRepo, batchGroupingRepo)
	}

	private splitArray<T>(arr: T[], size: number): T[][] {
		if (size <= 0) return [arr]; // jika size tidak valid

		const result = [];
		const chunkSize = Math.ceil(arr.length / size);

		for (let i = 0; i < arr.length; i += chunkSize) {
			result.push(arr.slice(i, i + chunkSize));
		}

		return result;
	}

	async execute(batchId: string): Promise<void> {
		const [assessors, groupings] = await Promise.all([
			this.batchAssessorRepo.getAllByType(batchId, ModuleCategory.CASE),
			this.batchGroupingRepo.getAllInBatch(batchId),
		])

		const toSave = this
			.splitArray(groupings, assessors.length)
			.map((grouping, i) => {
				console.log(i)
				return grouping.map(g => ({
					...g,
					case_assessor_user_uuid: assessors[i]?.user_uuid,
				}))
			}).flat()

		await this.batchGroupingRepo.autoAllocateCaseAssessor(batchId, toSave)
	}
}