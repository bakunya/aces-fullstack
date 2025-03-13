import { BatchDTO } from "@src/application/dto/batch";

export interface IBatch {
	getById(id: string): Promise<BatchDTO>
	getByToken(token: string): Promise<BatchDTO>
}