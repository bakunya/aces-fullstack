import { AsesiRepository } from "@src/application/repositories/AsesiRepository";
import { Asesi } from "@src/domain/Asesi";

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
	},
	{
		id: "3",
		username: 'user 3',
		password: "$2a$12$u.mGdtJKJEqZ6BXQ/.kPIuFsCEneIPypnIiqOWs0/qf0yv5q3GTF2",
	},
	{
		id: "4",
		username: 'user 4',
		password: "$2a$12$u.mGdtJKJEqZ6BXQ/.kPIuFsCEneIPypnIiqOWs0/qf0yv5q3GTF2",
	}
]

export class AsesiRepositoryImpl implements AsesiRepository {
	constructor(DB: D1Database) {}

	async getByUsername(username: string): Promise<Asesi | undefined> {
		const data = seeds.find((x) => x.username === username);
		if (!data) return undefined;
		return new Asesi(data.username, data.id, data.password);
	}
}