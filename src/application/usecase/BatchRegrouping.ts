import { CustomSlot } from "@src/application/dto/custom-slot";
import { ModuleGetAll } from "@src/application/dto/module-get-all";
import { TableBatchModule } from "@src/infra/databases/d1/dto/tables";
import { IUsecase } from "@src/application/usecase-interface/IUsecase";
import { BatchRuntimeInfo, BatchRuntimeToken } from "@src/application/dto/batch-runtime-info";
import { IBatchModule } from "@src/application/usecase-interface/IBatchModule";
import { PersonRepository } from "@src/application/repositories/PersonRepository";
import { RegroupRepository } from "@src/application/repositories/RegroupRepository";
import { ICreateGroupingReturn, ICreateGroupReturn } from "@src/application/usecase-interface/IBatchRegroup";
import { Uuid } from "@src/application/uuid";

export class BatchRegrouping implements IUsecase<[string], unknown> {
	constructor(
		private readonly personRepo: PersonRepository,
		private readonly regroupRepo: RegroupRepository,
		private readonly batchModuleUsecase: IBatchModule,
		private readonly uuid: Uuid,
	) { }

	static create(personRepo: PersonRepository, regroupRepo: RegroupRepository, batchModuleUsecase: IBatchModule, uuid: Uuid): BatchRegrouping {
		return new BatchRegrouping(personRepo, regroupRepo, batchModuleUsecase, uuid)
	}

	private groupPattern(pop: number): number[] {
		// let n = parseInt(pop);
		let n = Math.round(pop);
		if (isNaN(n) || n < 1) return [];
		if (n <= 7) return [n];
		if (n == 7) return [4, 3];
		if (n == 8) return [4, 4];
		if (n == 9) return [5, 4];
		if (n == 10) return [5, 5];
		if (n == 11) return [4, 4, 3];
		if (n == 12) return [4, 4, 4];
		if (n == 13) return [5, 4, 4];
		if (n == 14) return [5, 5, 4];

		let jumlahGrup = n % 20 < 5 ? Math.floor(n / 5) : Math.ceil(n / 5);
		let array = Array(jumlahGrup).fill(5);
		let mod1 = n % 5;
		let mod2 = n % 20;
		if (mod1 == 0) return array;
		let index = mod2 < 5 ? jumlahGrup - mod2 : jumlahGrup + mod1 - 5;
		let tweak = mod2 < 5 ? 6 : 4;
		array.fill(tweak, index);
		return array.sort((a, b) => b - a);
	}

	private customSlots(module_tokens: BatchRuntimeToken[]): CustomSlot[] {
		const tokens = module_tokens.length <= 4 ? module_tokens : module_tokens.slice(0, 4);

		// 4 modules
		if (tokens.length == 4)
			return [
				{ slot1: { module_uuid: tokens[0].module_uuid, module_category: tokens[0].module_category }, slot2: { module_uuid: tokens[1].module_uuid, module_category: tokens[1].module_category }, slot3: { module_uuid: tokens[2].module_uuid, module_category: tokens[2].module_category }, slot4: { module_uuid: tokens[3].module_uuid, module_category: tokens[3].module_category } },
				{ slot1: { module_uuid: tokens[1].module_uuid, module_category: tokens[1].module_category }, slot2: { module_uuid: tokens[2].module_uuid, module_category: tokens[2].module_category }, slot3: { module_uuid: tokens[3].module_uuid, module_category: tokens[3].module_category }, slot4: { module_uuid: tokens[0].module_uuid, module_category: tokens[0].module_category } },
				{ slot1: { module_uuid: tokens[2].module_uuid, module_category: tokens[2].module_category }, slot2: { module_uuid: tokens[3].module_uuid, module_category: tokens[3].module_category }, slot3: { module_uuid: tokens[0].module_uuid, module_category: tokens[0].module_category }, slot4: { module_uuid: tokens[1].module_uuid, module_category: tokens[1].module_category } },
				{ slot1: { module_uuid: tokens[3].module_uuid, module_category: tokens[3].module_category }, slot2: { module_uuid: tokens[0].module_uuid, module_category: tokens[0].module_category }, slot3: { module_uuid: tokens[1].module_uuid, module_category: tokens[1].module_category }, slot4: { module_uuid: tokens[2].module_uuid, module_category: tokens[2].module_category } },
			];
		if (tokens.length == 3)
			return [
				{ slot1: { module_uuid: tokens[0].module_uuid, module_category: tokens[0].module_category }, slot2: { module_uuid: tokens[1].module_uuid, module_category: tokens[1].module_category }, slot3: { module_uuid: tokens[2].module_uuid, module_category: tokens[2].module_category }, slot4: null },
				{ slot1: { module_uuid: tokens[1].module_uuid, module_category: tokens[1].module_category }, slot2: { module_uuid: tokens[2].module_uuid, module_category: tokens[2].module_category }, slot3: { module_uuid: tokens[0].module_uuid, module_category: tokens[0].module_category }, slot4: null },
				{ slot1: { module_uuid: tokens[2].module_uuid, module_category: tokens[2].module_category }, slot2: { module_uuid: tokens[0].module_uuid, module_category: tokens[0].module_category }, slot3: { module_uuid: tokens[1].module_uuid, module_category: tokens[1].module_category }, slot4: null },
			];
		if (tokens.length == 2)
			return [
				{ slot1: { module_uuid: tokens[0].module_uuid, module_category: tokens[0].module_category }, slot2: { module_uuid: tokens[1].module_uuid, module_category: tokens[1].module_category }, slot3: null, slot4: null },
				{ slot1: { module_uuid: tokens[1].module_uuid, module_category: tokens[1].module_category }, slot2: { module_uuid: tokens[0].module_uuid, module_category: tokens[0].module_category }, slot3: null, slot4: null },
				{ slot1: null, slot2: null, slot3: { module_uuid: tokens[0].module_uuid, module_category: tokens[0].module_category }, slot4: { module_uuid: tokens[1].module_uuid, module_category: tokens[1].module_category } },
				{ slot1: null, slot2: null, slot3: { module_uuid: tokens[1].module_uuid, module_category: tokens[1].module_category }, slot4: { module_uuid: tokens[0].module_uuid, module_category: tokens[0].module_category } },
			];
		if (tokens.length == 1)
			return [
				{ slot1: { module_uuid: tokens[0].module_uuid, module_category: tokens[0].module_category }, slot2: null, slot3: null, slot4: null },
				{ slot1: null, slot2: { module_uuid: tokens[0].module_uuid, module_category: tokens[0].module_category }, slot3: null, slot4: null },
				{ slot1: null, slot2: null, slot3: { module_uuid: tokens[0].module_uuid, module_category: tokens[0].module_category }, slot4: null },
				{ slot1: null, slot2: null, slot3: null, slot4: { module_uuid: tokens[0].module_uuid, module_category: tokens[0].module_category } },
			];
			
		return [];
	}

	private slotGroupPattern(pop: number, permutation: number): number[] {
		if (![2, 3, 4].includes(permutation)) return [pop];
		if (permutation == 2) {
			const a = Math.round(pop / permutation);
			return [a, pop - a];
		} else {
			const base = Math.floor(pop / permutation);
			const remainder = pop - base * permutation;
			const rs = Array(permutation).fill(base);
			if (remainder) {
				for (let i = 0; i < remainder; i++) {
					rs[i] += 1;
				}
			}
			return rs;
		}
	}

	private getBatchRuntimeInfo(modules: (TableBatchModule & { module?: ModuleGetAll })[], batch_id: string, split = 1) {
		const info = {
			batch_uuid: batch_id,
			modules: modules.length,
			tokens: modules.map((m) => ({
				module_uuid: m.module_uuid,
				module_category: m.module?.category,
			})),

			slot_mode: 'CUSTOM ' + modules.length,
			types: '' + modules.map((m) => m.module?.category).join('-'),
			permutation: 4,
			grouping: modules.find((m) => m.module?.category == 'DISC') ? 'BY_DISC' : 'BY_SLOT',
			runtime: modules.find((m) => m.module?.category == 'FACE') || modules.find((m) => m.module?.category == 'DISC') ? 'ASSISSTED' : 'AUTO',
			mod_self: null,
			mod_case: null,
			mod_face: null,
			mod_disc: null,
			mod_1: modules[0] || null,
			mod_2: modules[1] || null,
			mod_3: modules[2] || null,
			mod_4: modules[3] || null,
		};
		if (modules.length == 3) {
			info.permutation = 3;
		} else if (modules.length == 2) {
			if (info.slot_mode == 'SELF-CASE') {
				info.permutation = split > 1 ? 2 : 1;
			} else {
				info.permutation = split > 1 ? 4 : 2;
			}
		} else if (modules.length == 1) {
			info.permutation = split;
		}
		return info as BatchRuntimeInfo;
	}

	private createGroup(info: BatchRuntimeInfo, totalPerson: number): ICreateGroupReturn[] {
		const slots = this.customSlots(info.tokens);
		const pattern = info.grouping == 'BY_DISC' ? this.groupPattern(totalPerson) : this.slotGroupPattern(totalPerson, info.permutation);
		return pattern.map((g, i) => {
			const index = i % info.permutation;
			return {
				uuid: this.uuid.get(),
				members: g,
				batch_uuid: info.batch_uuid,
				name: 'Group ' + (i + 1),
				slot1: slots[index].slot1,
				slot2: slots[index].slot2,
				slot3: slots[index].slot3,
				slot4: slots[index].slot4,
			};
		});
	}

	private createGrouping(groups: ICreateGroupReturn[], persons: { id: string }[], info: BatchRuntimeInfo): ICreateGroupingReturn[] {
		const groupings: ICreateGroupingReturn[] = [];
		let personIndex = 0;
		for (let i = 0; i < groups.length; i++) {
			const g = groups[i].members as number;
			for (let j = 0; j < g; j++) {
				groupings.push({
					face_assessor_user_uuid: null,
					case_assessor_user_uuid: null,
					group_id: groups[i].uuid,
					group_uuid: groups[i].uuid,
					batch_uuid: info.batch_uuid,
					person_uuid: persons[personIndex].id,
				});
				personIndex++;
			}
		}
		return groupings
	}


	async execute(batchId: string) {
		const persons = await this.personRepo.getByBatchId(batchId)
		if (persons.length == 0) return;
		await this.regroupRepo.clean(batchId)

		const modules = await this.batchModuleUsecase.getBatchModules(batchId);
		const groups = this.createGroup(this.getBatchRuntimeInfo(modules, batchId), persons.length);
		const groupings = this.createGrouping(groups, persons as { id: string }[], this.getBatchRuntimeInfo(modules, batchId));
		await this.regroupRepo.replace(groups, groupings);
		await this.regroupRepo.unsetShouldRegroup(batchId);
	}
}