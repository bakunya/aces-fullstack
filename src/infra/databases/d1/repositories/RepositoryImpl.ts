import { Repository } from "@src/application/repositories/Repository";

export class RepositoryImpl implements Repository {
	constructor(protected readonly db: D1Database) {
		this.db = db;
	}

	async begin(): Promise<void> {
		// await this.db.prepare("BEGIN TRANSACTION").raw();
		console.log("Unsupported: Transaction management is not supported in D1 database.");
	}

	async commit(): Promise<void> {
		// await this.db.prepare("COMMIT").raw();
		console.log("Unsupported: Transaction management is not supported in D1 database.");
	}

	async rollback(): Promise<void> {
		// await this.db.prepare("ROLLBACK").raw();
		console.log("Unsupported: Transaction management is not supported in D1 database.");
	}
}