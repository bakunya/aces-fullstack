import { AppError } from "@src/application/error/AppError"

export enum ModuleCategory {
	SELF = "SELF",
	CASE = "CASE",
	FACE = "FACE",
	DISC = "DISC",
}

export class ModuleCategoryMapping {
	static fromString(category: string): ModuleCategory {
		try {
			const x = ModuleCategory[category.toUpperCase() as keyof typeof ModuleCategory]
			if(!x) throw new Error()
			return x
		} catch (_) {
			throw AppError.entity("ModuleCategory", "Invalid module category")
		}
	}
}

export enum ModuleType {
	Abstract = 'abstract',
	Aime = 'aime',
	Csi = 'csi',
	Ggate = 'ggate',
	Gmate = 'gmate',
	Gpq = 'gpq',
	GpqGmate = 'gpq-gmate',
	Gpro = 'gpro',
	Intray = 'intray',
	Numerical = 'numerical',
	Lgd = 'lgd',
	Verbal = 'verbal',
	Interview = 'interview',
	CaseAnalysis = 'case-analysis'
}

export class ModuleTypeMapping {
	static fromString(type: string): ModuleType {
		try {
			const x = Object.entries(ModuleType).find(([_, v]) => v === type)
			if(!x) throw new Error()
			return ModuleType[x[0] as keyof typeof ModuleType]
		} catch (_) {
			throw AppError.entity("ModuleType", "Invalid module type")
		}
	}
}

export class ModuleTypeDomain {
	constructor(
		public readonly type: ModuleType,
		public readonly category: string,
		public readonly id?: number,
	) { }

	static create(type: string, category: string, id: number): ModuleTypeDomain {
		return new ModuleTypeDomain(ModuleTypeMapping.fromString(type), category, id)
	}
}