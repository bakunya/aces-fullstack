import { ModuleCategory, ModuleCategoryMapping, ModuleType, ModuleTypeMapping } from './ModuleType'



export class Module {
	constructor(
		public readonly uuid: string,
		public readonly type: ModuleType,
		public readonly title: string,
		public readonly category: ModuleCategory,
	) { }

	static create(uuid: string, type: string, title: string, category: string): Module {
		return new Module(uuid, ModuleTypeMapping.fromString(type), title, ModuleCategoryMapping.fromString(category))
	}
}

