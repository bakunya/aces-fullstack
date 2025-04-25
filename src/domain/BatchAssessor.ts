import { ModuleCategory, ModuleCategoryMapping } from "@src/domain/ModuleType";

export class BatchAssessorDomain {
	constructor(
		public batchId: string,
		public userId: string,
		public type: ModuleCategory
	) {}

	static create(batchId: string, userId: string, type: string) {
		return new BatchAssessorDomain(batchId, userId, ModuleCategoryMapping.fromString(type.toUpperCase()));
	}
}