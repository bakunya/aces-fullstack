import { BatchRepository } from "@src/application/repositories/BatchRepository";

export class GetAsesiUseCase {
	// @ts-ignore
	constructor(private batchRepository: BatchRepository) { }

	// @ts-ignore
	async execute(asesiId: string): Promise<undefined> {
		throw new Error("Method not implemented.");
	}
}