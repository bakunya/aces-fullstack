import { ModuleCategory } from "@src/domain/ModuleType"

type TReqs = {
	slot_module_category_1: ModuleCategory
	slot_module_category_2: ModuleCategory
	slot_module_category_3: ModuleCategory
	slot_module_category_4: ModuleCategory
}

export function getSlotPosition<T = string>(groups: (any & TReqs)[], type: ModuleCategory, key?: string):Record<number, T[]> {
	return groups.reduce((acc, curr) => {
		const toPush = (key ? curr[key] : curr) as T[]
		if (curr.slot_module_category_1?.toUpperCase?.()?.includes?.(type)) {
			acc[1] = [...new Set([...acc[1], toPush])] as T[]
		}
		if (curr.slot_module_category_2?.toUpperCase?.()?.includes?.(type)) {
			acc[2] = [...new Set([...acc[2], toPush])] as T[]
		}
		if (curr.slot_module_category_3?.toUpperCase?.()?.includes?.(type)) {
			acc[3] = [...new Set([...acc[3], toPush])] as T[]
		}
		if (curr.slot_module_category_4?.toUpperCase?.()?.includes?.(type)) {
			acc[4] = [...new Set([...acc[4], toPush])] as T[]
		}
		return acc
	}, {  1: [], 2: [], 3: [], 4: [] } as Record<number, T[]>)
}