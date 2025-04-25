import { AssessorRequirement } from "@src/application/dto/assessor-requreiment";
import { FormattedGroupAllocation } from "@src/application/dto/formatted-group-allocation";
import { AssessorRepository } from "@src/application/repositories/AssessorRepository";
import { GroupRepository } from "@src/application/repositories/GroupRepository";
import { GetAllocationExecutionReturn, IGetAllocation } from "@src/application/usecase-interface/IGetAllocation";
import { IUsecase } from "@src/application/usecase-interface/IUsecase";
import { ModuleCategory } from "@src/domain/ModuleType";
import { RawGroupAllocation } from "@src/infra/databases/d1/dto/aggregations";

export class GetAllocation implements IGetAllocation, IUsecase<[string], GetAllocationExecutionReturn> {
	private groupAllocation?: FormattedGroupAllocation

	constructor(
		private readonly groupRepo: GroupRepository, 
		private readonly assessorRepo: AssessorRepository
	) { }

	static create(
		groupRepo: GroupRepository, 
		assessorRepo: AssessorRepository
	) {
		return new GetAllocation(groupRepo, assessorRepo)
	}

	private processAllocations(raw: RawGroupAllocation[]): FormattedGroupAllocation {
		const result: FormattedGroupAllocation = {
			batch_id: raw[0]?.batch_uuid ?? '',
			disc: [0, 0, 0, 0],
			face: [0, 0, 0, 0],
			face_size: [0, 0, 0, 0],
			case: [0, 0, 0, 0],
			case_size: [0, 0, 0, 0],
			permutation: 0,
		};

		const seenPermutations = new Set<string>();

		for (const group of raw) {
			const slots = [group.slot_module_category_1, group.slot_module_category_2, group.slot_module_category_3, group.slot_module_category_4];
			const permKey = slots.join('|');
			seenPermutations.add(permKey);

			slots.forEach((slot, idx) => {
				if (!slot) return;
				const type = slot.split(':')[0];
				switch (type) {
					case 'DISC':
						result.disc[idx]++;
						break;
					case 'FACE':
						result.face[idx]++;
						result.face_size[idx] += group.members;
						break;
					case 'CASE':
						result.case[idx]++;
						result.case_size[idx] += group.members;
						break;
				}
			});
		}

		result.permutation = seenPermutations.size;
		return result;
	}

	private _getAssessorRequirement(alloc?: FormattedGroupAllocation): AssessorRequirement {
		if (!alloc) {
			return {
				mindisc: 0, maxdisc: 0,
				minface: 0, maxface: 0,
				mincase: 0, maxcase: 0
			};
		}

		const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);
		const max = (arr: number[]) => Math.max(...arr, 0);

		return {
			mindisc: max(alloc.disc),
			maxdisc: sum(alloc.disc),
			minface: max(alloc.face_size),
			maxface: sum(alloc.face_size),
			mincase: max(alloc.case_size),
			maxcase: sum(alloc.case_size),
		};
	}

	async execute(batchId: string) {
		const groupAllocation = await this.getGroupAllocation(batchId)
		const assessorAllocated = await this.getAssessorAllocated(batchId)
		const assessorRequirement = this._getAssessorRequirement(groupAllocation);

		return {
			groupAllocation,
			assessorAllocated,
			assessorRequirement,
		}
	}

	async getAssessorRequirement(batch_id: string): Promise<AssessorRequirement> {
		if(!this.groupAllocation) {
			this.groupAllocation = await this.getGroupAllocation(batch_id)
		}
		return this._getAssessorRequirement(this.groupAllocation);
	}

	async getGroupAllocation(batchId: string): Promise<FormattedGroupAllocation | undefined> {
		const rawAllocations = await this.groupRepo.getSlotAllocationInBatch(batchId)

		if (rawAllocations.length === 0) return undefined
		this.groupAllocation = this.processAllocations(rawAllocations);

		return this.groupAllocation;
	}

	async getAssessorAllocated(batchId: string) {
		const allocated = await this.assessorRepo.getInBatch(batchId)
		const face_assessors = allocated.filter((x) => x.type == ModuleCategory.FACE);
		const disc_assessors = allocated.filter((x) => x.type == ModuleCategory.DISC);
		const case_assessors = allocated.filter((x) => x.type == ModuleCategory.CASE);

		return {
			face_assessors,
			disc_assessors,
			case_assessors,
		}
	}
}