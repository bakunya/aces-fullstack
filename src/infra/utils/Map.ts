export class Map {
	constructor() {}
	
	static create() {
		return new Map()
	}

	fromArrayToSingle<T>(key: string, array: T[]) {
		const map = new globalThis.Map<string, T>()
		array.forEach((item) => {
			const itemKey = item[key as keyof T] as unknown as string
			map.set(itemKey, item)
		})
		return map
	}

	fromArrayToArray<T>(key: string, array: T[]) {		
		const map = new globalThis.Map<string, T[]>()
		array.forEach((item) => {
			const itemKey = item[key as keyof T] as unknown as string
			if (!map.has(itemKey)) {
				map.set(itemKey, [])
			}
			map.get(itemKey)?.push(item)
		})
		return map
	}
}