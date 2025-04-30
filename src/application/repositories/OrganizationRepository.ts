import { Repository } from "@src/application/repositories/Repository";
import { OrganizationEntity } from "@src/domain/Organization";
import { PreparedTransaction } from "@src/infra/databases/d1/dto/transaction";

export interface OrganizationRepository extends Repository {
	create<T extends false>(data: OrganizationEntity, inTransaction?: T): Promise<void>
	create<T extends true>(data: OrganizationEntity, inTransaction: T): Promise<PreparedTransaction[]>
	create(data: OrganizationEntity, inTransaction?: boolean): Promise<void | PreparedTransaction[]>

	all(): Promise<OrganizationEntity[]>
}
