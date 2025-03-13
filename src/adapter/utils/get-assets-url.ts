import json from '../../../public/assets/generated/.vite/manifest.json'

export function getAssetsUrl(key: string[]): Record<'js' | 'css', string[]> {
	const meta = json as Record<string, any>

	const files = {
		js: [],
		css: [],
	} as Record<'js' | 'css', string[]>

	key.map(v => {
		const current = meta[`src/adapter/presenter/ts/${v}/index.ts`]
		const jsFile = current?.file
		if (jsFile) {
			files.js.push(`/assets/generated/${jsFile}`)
		}

		const cssFile = meta[`src/adapter/presenter/ts/${v}/index.ts`]?.css?.map?.((v: string) => `/assets/generated/${v}`)
		if (cssFile) {
			files.css.push(...cssFile)
		}

		if (Array.isArray(current?.imports)) {
			current.imports.map((v: string) => {
				const curr = meta[v]

				const cssFile = curr.css?.map?.((v: string) => `/assets/generated/${v}`)
				if (cssFile) {
					files.css.push(...cssFile)
				}
			})
		}
	})

	return files
}