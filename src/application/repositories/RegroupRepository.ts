import { Repository } from "@src/application/repositories/Repository";
import { ICreateGroupingReturn, ICreateGroupReturn } from "@src/application/usecase-interface/IBatchRegroup";

export interface RegroupRepository extends Repository {
	clean(batchId: string): Promise<void>;
	setShouldRegroup(batchId: string): Promise<void>;
	unsetShouldRegroup(batchId: string): Promise<void>;
	replace(groups: ICreateGroupReturn[], groupings: ICreateGroupingReturn[]): Promise<void>
}