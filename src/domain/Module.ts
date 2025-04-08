import { ModuleCategory, ModuleCategoryMapping, ModuleType, ModuleTypeMapping } from './ModuleType'

enum ModuleStatus {
	Disabled = -1,
	Developing = 0,
	Reviewing = 1,
	Active = 3,
}

export class ModuleStatusMapping {
	static fromNumber(status: number): ModuleStatus {
		switch (status) {
			case -1:
				return ModuleStatus.Disabled
			case 0:
				return ModuleStatus.Developing
			case 1:
				return ModuleStatus.Reviewing
			case 3:
				return ModuleStatus.Active
			default:
				throw new Error('Invalid module status')
		}
	}

	static toString(status: ModuleStatus): string {
		switch (status) {
			case ModuleStatus.Disabled:
				return 'Disabled'
			case ModuleStatus.Developing:
				return 'Developing'
			case ModuleStatus.Reviewing:
				return 'Reviewing'
			case ModuleStatus.Active:
				return 'Active'
			default:
				throw new Error('Invalid module status')
		}
	}
}

export class Module {
	constructor(
		public readonly uuid: string,
		public readonly type: ModuleType,
		public readonly title: string,
		public readonly category: ModuleCategory,
		public readonly status?: ModuleStatus,
		public readonly description?: string
	) { }

	static create(uuid: string, type: string, title: string, category: string, status?: number, description?: string): Module {
		if (status !== undefined) {
			return new Module(
				uuid,
				ModuleTypeMapping.fromString(type),
				title,
				ModuleCategoryMapping.fromString(category),
				ModuleStatusMapping.fromNumber(status),
				description
			)
		}
		return new Module(uuid, ModuleTypeMapping.fromString(type), title, ModuleCategoryMapping.fromString(category), undefined, description)
	}
}

