import { Asesor } from "@src/domain/Asesor";

export interface AsesorRepository {
	getByUsername(username: string): Promise<Asesor | undefined>
}