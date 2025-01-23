import { getAssetsUrl } from "@src/adapter/utils/get-assets-url";
import { JSX } from "hono/jsx/jsx-runtime";

export function AdminHTML({ children, js, css }: { js: string[], css: string[], children: JSX.Element }) {
	return (
		<html>
			<head>
				<title>Admin</title>
				<link rel="stylesheet" href="/assets/css/admin.css" />
				{ css.map((file) => <link rel="stylesheet" href={ file } />) }
			</head>
			<body>
				{ children }

				{ js.map((file) => <script type="module" src={ file }></script>) }
			</body>
		</html>
	)
}

export function AdminHTMLHOC<T extends {} = {}>(Component: (props: T) => JSX.Element, { viteGenerated, css, js }: { viteGenerated?: string[], css?: string[], js?: string[] } = {}) {
	const files = getAssetsUrl(viteGenerated ?? [])

	const jsFiles = [...js ?? [], ...files.js]
	const cssFiles = [...css ?? [], ...files.css]

	return (props: T) => (
		<AdminHTML js={ jsFiles } css={ cssFiles }>
			<Component { ...props } />
		</AdminHTML>
	)
}