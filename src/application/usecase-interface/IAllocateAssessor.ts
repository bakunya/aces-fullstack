import { ModuleCategory } from "@src/domain/ModuleType";
import { RawGroupAllocation } from "@src/infra/databases/d1/dto/aggregations";

export interface IAllocateAssessor {
	/**
	 * 
	 * @param type 
	 * @param groups
	 * @returns group_id[] 
	 */
	getGroupPosition(type: ModuleCategory, groups: RawGroupAllocation[]): string[][]

	/**
	 * 
	 * @param type 
	 * @param groups
	 * @returns {  [slot: number]: group_id[] }  
	 */
	getGroupPositionAsObject(type: ModuleCategory, groups: RawGroupAllocation[]): Record<number, string[]>
}