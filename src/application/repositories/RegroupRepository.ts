import { Repository } from "@src/application/repositories/Repository";
import { ICreateGroupingReturn, ICreateGroupReturn } from "@src/application/usecase-interface/IBatchRegroup";
import { PreparedTransaction } from "@src/infra/databases/d1/dto/transaction";

export interface RegroupRepository extends Repository {
	clean<T extends false>(batchId: string, inTransaction?: T): Promise<void>;
	clean<T extends true>(batchId: string, inTransaction: T): Promise<PreparedTransaction[]>;
	clean(batchId: string, inTransaction?: boolean): Promise<void | PreparedTransaction[]>;

	setShouldRegroup<T extends false>(batchId: string, inTransaction?: T): Promise<void>;
	setShouldRegroup<T extends true>(batchId: string, inTransaction: T): Promise<PreparedTransaction[]>;
	setShouldRegroup(batchId: string, inTransaction?: boolean): Promise<void | PreparedTransaction[]>;
	
	unsetShouldRegroup<T extends false>(batchId: string, inTransaction?: T): Promise<void>;
	unsetShouldRegroup<T extends true>(batchId: string, inTransaction: T): Promise<PreparedTransaction[]>;
	unsetShouldRegroup(batchId: string, inTransaction?: boolean): Promise<void | PreparedTransaction[]>;
	
	replace<T extends false>(groups: ICreateGroupReturn[], groupings: ICreateGroupingReturn[], inTransaction?: T): Promise<void>;
	replace<T extends true>(groups: ICreateGroupReturn[], groupings: ICreateGroupingReturn[], inTransaction: T): Promise<PreparedTransaction[]>;
	replace(groups: ICreateGroupReturn[], groupings: ICreateGroupingReturn[], inTransaction?: boolean): Promise<void | PreparedTransaction[]>;
}