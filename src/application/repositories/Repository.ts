import { PreparedTransaction } from "@src/infra/databases/d1/dto/transaction";

export interface Repository {
	commit(args: PreparedTransaction[]): Promise<void>
}