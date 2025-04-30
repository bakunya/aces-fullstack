import { Repository } from "@src/application/repositories/Repository";
import { PreparedTransaction } from "@src/infra/databases/d1/dto/transaction";

export class RepositoryImpl implements Repository {
	constructor(protected readonly db: D1Database) {
		this.db = db;
	}

	async commit(args: PreparedTransaction[]): Promise<void> {
		await this.db.batch(args);
	}
}