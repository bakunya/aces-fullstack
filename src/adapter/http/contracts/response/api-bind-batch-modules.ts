export type ApiBindBatchModulesResponse = {
	batch_uuid: string;
	module_uuid: string;
	uuid: string;
	created: string;
	updated?: string;
	priority: number;
	module?: {
		uuid: string
		type: string
		title: string
		description: string
		category: string
		hash?: string
	}
}