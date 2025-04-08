import { HxIntrayDevSectionUpdateIntroDev, HxIntrayDevSectionUpdateOutroDev, HxIntrayDevSectionUpdateTask1, HxIntrayDevSectionUpdateTask2, HxIntrayDevSectionUpdateTask3, HxIntrayDevSectionUpdateTask4, HxIntrayDevSectionUpdateTask5 } from "@src/adapter/http/contracts/request/hx-intray-dev-section-update";
import { AppError } from "@src/application/error/AppError";
import { ModuleInitializer } from "@src/application/repositories/ModuleRepository";



export type UpdateIntroDev = HxIntrayDevSectionUpdateIntroDev
export type UpdateOutroDev = HxIntrayDevSectionUpdateOutroDev
export type UpdateTask1 = HxIntrayDevSectionUpdateTask1
export type UpdateTask2 = HxIntrayDevSectionUpdateTask2
export type UpdateTask3 = HxIntrayDevSectionUpdateTask3
export type UpdateTask4 = HxIntrayDevSectionUpdateTask4
export type UpdateTask5 = HxIntrayDevSectionUpdateTask5

export enum IntrayTable {
	// dont rearrange items
	mod_intray_intro = "intro",
	mod_intray_task_1 = "task 1",
	mod_intray_task_2 = "task 2",
	mod_intray_task_3 = "task 3",
	mod_intray_task_4 = "task 4",
	mod_intray_task_5 = "task 5",
	mod_intray_outro = "outro",
}

export type IntrayTableString = keyof typeof IntrayTable;

export class IntrayTableMapping {
	static getKeyFromValue(value: string): string {
		const key = Object.entries(IntrayTable).find(([key, val]) => {
			if (val === value.toLocaleLowerCase().trim()) return key;
		})
		if (key) return key[0];
		throw AppError.conversion("IntrayTableMapping");
	}

	static getKeyFromString(data: string) {
		try {
			const key = Object.entries(IntrayTable).find(([key]) => {
				if (key === data.toLocaleLowerCase().trim()) return key;
			})
			if (key) return key[0];
			throw AppError.conversion("IntrayTableMapping");
		} catch (e) {
			throw AppError.conversion("IntrayTableMapping");
		}
	}

	static getFromKeyString(key: string): IntrayTable {
		try {
			const value = IntrayTable[key as IntrayTableString];
			if (value) return value;
			throw AppError.conversion("IntrayTableMapping");
		} catch (e) {
			throw AppError.conversion("IntrayTableMapping");
		}
	}
}

export interface IntrayRepository extends ModuleInitializer {
	getSection(moduleId: string, section: IntrayTableString): Promise<unknown>
	updateIntrayIntro(data: UpdateIntroDev): Promise<void>
	updateIntrayOutro(data: UpdateOutroDev): Promise<void>
	updateIntrayTask1(data: UpdateTask1): Promise<void>
	updateIntrayTask2(data: UpdateTask2): Promise<void>
	updateIntrayTask3(data: UpdateTask3): Promise<void>
	updateIntrayTask4(data: UpdateTask4): Promise<void>
	updateIntrayTask5(data: UpdateTask5): Promise<void>
}