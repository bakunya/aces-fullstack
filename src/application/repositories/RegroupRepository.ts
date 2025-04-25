import { ICreateGroupingReturn, ICreateGroupReturn } from "@src/application/usecase-interface/IBatchRegroup";

export interface RegroupRepository {
	clean(batchId: string): Promise<void>;
	setShouldRegroup(batchId: string): Promise<void>;
	unsetShouldRegroup(batchId: string): Promise<void>;
	replace(groups: ICreateGroupReturn[], groupings: ICreateGroupingReturn[]): Promise<void>
}