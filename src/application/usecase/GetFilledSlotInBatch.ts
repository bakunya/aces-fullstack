import { GroupRepository } from "@src/application/repositories/GroupRepository";
import { IUsecase } from "@src/application/usecase-interface/IUsecase";

export class GetFilledSlotInBatch implements IUsecase<[string], { slot_1: boolean, slot_2: boolean, slot_3: boolean, slot_4: boolean }> {
	constructor(
		private readonly groupRepo: GroupRepository,
	) { }

	static create(groupRepo: GroupRepository): GetFilledSlotInBatch {
		return new GetFilledSlotInBatch(groupRepo);
	}

	async execute(batchId: string): Promise<any> {
		const data: { slot_1: boolean, slot_2: boolean, slot_3: boolean, slot_4: boolean } = {
			slot_1: false,
			slot_2: false,
			slot_3: false,
			slot_4: false,
		}

		const result = await this.groupRepo.getSlotAllocationInBatch(batchId);
		for (const el of result) {
			if (!Object.values(data).some(c => !c)) break;
			try {
				if (el.slot_module_uuid_1) {
					data.slot_1 = true
				}
				if (el.slot_module_uuid_2) {
					data.slot_2 = true
				}
				if (el.slot_module_uuid_3) {
					data.slot_3 = true
				}
				if (el.slot_module_uuid_4) {
					data.slot_4 = true
				}
			} catch (e) { console.log(e) }
		}

		return data
	}
}