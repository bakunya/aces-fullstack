import { AsesorRepository } from "@src/application/repositories/AsesorRepository";
import { Asesor } from "@src/domain/Asesor";

const seeds = [
	{
		id: "1",
		username: 'user 1',
		password: "$2a$12$u.mGdtJKJEqZ6BXQ/.kPIuFsCEneIPypnIiqOWs0/qf0yv5q3GTF2",
	},
	{
		id: "2",
		username: 'user 2',
		password: "$2a$12$u.mGdtJKJEqZ6BXQ/.kPIuFsCEneIPypnIiqOWs0/qf0yv5q3GTF2",
	}
]

export class AsesorRepositoryImpl implements AsesorRepository {
	constructor(DB: D1Database) {}

	async getByUsername(username: string): Promise<Asesor | undefined> {
		const data = seeds.find((x) => x.username === username);
		if (!data) return undefined;
		return new Asesor(data.username, data.id, data.password);
	}
}