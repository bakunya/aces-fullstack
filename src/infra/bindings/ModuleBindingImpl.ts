import { ModuleGetAll } from "@src/application/dto/module-get-all";
import { ModuleBinding } from "@src/application/bindings/ModuleBinding";

export class ModuleBindingImpl implements ModuleBinding {
	private readonly endpoint = "https://bind.cloudflare.com/api-bind"
	constructor(
		private readonly service: Service,
		private readonly apiKey: string
	) { }

	static create(service: Service, apiKey: string): ModuleBinding {
		return new ModuleBindingImpl(service, apiKey)
	}

	async getAll(): Promise<ModuleGetAll[]> {
		const data = await this.service.fetch(`${this.endpoint}/modules`, {
			method: "GET",
			headers: {
				"x-api-key": this.apiKey,
				"Content-Type": "application/json"
			}
		})
		return (await data.json()) as unknown as ModuleGetAll[]
	}
}