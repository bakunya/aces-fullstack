import { PersonDomain } from "@src/domain/Person";
import { BatchPersonDetailAggregation } from "@src/infra/databases/d1/dto/aggregations";

export interface PersonRepository {
	insertMany(persons: PersonDomain[]): Promise<void>;
	getByBatchId(batchId: string): Promise<PersonDomain[]>;
	updateOne(person: PersonDomain): Promise<void>;
	createOne(person: PersonDomain): Promise<void>;
	getCountByBatchId(batchId: string): Promise<number>;
	getUniqueInBatch(batch_uuid: string, username: string, email: string): Promise<PersonDomain | undefined>
	deletePersonInBatch(personId: string, batchId: string): Promise<void>;
	getDetailInBatch(batchId: string): Promise<BatchPersonDetailAggregation[]>;
}