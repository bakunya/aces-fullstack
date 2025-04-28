import { Repository } from "@src/application/repositories/Repository";

export class RepositoryImpl implements Repository {
	constructor(protected readonly db: D1Database) {
		this.db = db;
	}

	async begin(): Promise<void> {
		this.db.prepare("BEGIN TRANSACTION").raw();
	}

	async commit(): Promise<void> {
		this.db.prepare("COMMIT").raw();
	}

	async rollback(): Promise<void> {
		this.db.prepare("ROLLBACK").raw();
	}
}