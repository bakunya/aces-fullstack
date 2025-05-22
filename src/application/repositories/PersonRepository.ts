import { Repository } from "@src/application/repositories/Repository";
import { PersonDomain } from "@src/domain/Person";
import { BatchPersonDetailAggregation } from "@src/infra/databases/d1/dto/aggregations";
import { PreparedTransaction } from "@src/infra/databases/d1/dto/transaction";

export interface PersonRepository extends Repository {
	updateOne<T extends false>(person: PersonDomain, inTransaction?: T): Promise<void>;
	updateOne<T extends true>(person: PersonDomain, inTransaction: T): Promise<PreparedTransaction[]>;
	updateOne(person: PersonDomain, inTransaction?: boolean): Promise<void | PreparedTransaction[]>;
	
	createOne<T extends false>(person: PersonDomain, inTransaction?: boolean): Promise<void>;
	createOne<T extends true>(person: PersonDomain, inTransaction: boolean): Promise<PreparedTransaction[]>;
	createOne(person: PersonDomain, inTransaction?: boolean): Promise<void | PreparedTransaction[]>;
	
	insertMany<T extends false>(persons: PersonDomain[], inTransaction?: T): Promise<void>;
	insertMany<T extends true>(persons: PersonDomain[], inTransaction: T): Promise<PreparedTransaction[]>;
	insertMany(persons: PersonDomain[], inTransaction?: boolean): Promise<void | PreparedTransaction[]>;

	deletePersonInBatch<T extends false>(personId: string, batchId: string, inTransaction?: T): Promise<void>;
	deletePersonInBatch<T extends true>(personId: string, batchId: string, inTransaction: T): Promise<PreparedTransaction[]>;
	deletePersonInBatch(personId: string, batchId: string, inTransaction?: boolean): Promise<void | PreparedTransaction[]>;

	getCountByBatchId(batchId: string): Promise<number>;
	getByBatchId(batchId: string): Promise<PersonDomain[]>;
	getDetailInBatch(batchId: string): Promise<BatchPersonDetailAggregation[]>;
	getUniqueInBatch(batch_uuid: string, username: string, email: string): Promise<PersonDomain | undefined>
	getUniqueInBatchByUsername(batch_token: string, username: string): Promise<PersonDomain | undefined>
}