import { getAssetsUrl } from "@src/adapter/utils/get-assets-url";
import { JSX } from "hono/jsx/jsx-runtime";

export function AsesorHTML({ children, js, css }: { js: string[], css: string[], children: JSX.Element }) {
	return (
		<html>
			<head>
				<title>Asesor</title>
				<link rel="stylesheet" href="/assets/css/asesor.css" />
				{ css.map((file) => <link rel="stylesheet" href={ file } />) }
			</head>
			<body>
				{ children }

				{ js.map((file) => <script type="module" src={ file }></script>) }
			</body>
		</html>
	)
}

export function AsesorHTMLHOC<T extends {} = {}>(Component: (props: T) => JSX.Element, { css, js, viteGenerated }: { viteGenerated?: string[], css?: string[], js?: string[] } = {}) {
	const files = getAssetsUrl(viteGenerated ?? [])

	const jsFiles = [...js ?? [], ...files.js]
	const cssFiles = [...css ?? [], ...files.css]

	return (props: T) => (
		<AsesorHTML js={ jsFiles } css={ cssFiles }>
			<Component { ...props } />
		</AsesorHTML>
	)
}