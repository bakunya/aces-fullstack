import { getAssetsUrl } from "@src/adapter/utils/get-assets-url";
import { JSX } from "hono/jsx/jsx-runtime";

export function ModuleHTML({ children, js, css }: { js: string[], css: string[], children: JSX.Element }) {
	return (
		<html>
			<head>
				<title>Module</title>
				<link rel="stylesheet" href="/assets/css/module.css" />
				{ css.map((file) => <link rel="stylesheet" href={ file } />) }
			</head>
			<body>
				{ children }
				
				<script src="https://unpkg.com/htmx.org@2.0.4" integrity="sha384-HGfztofotfshcF7+8n44JQL2oJmowVChPTg48S+jvZoztPfvwD79OC/LTtG6dMp+" crossorigin="anonymous"></script>
				{ js.map((file) => <script type="module" src={ file }></script>) }
			</body>
		</html>
	)
}

export function ModuleHTMLHOC<T extends {} = {}>(Component: (props: T) => JSX.Element, { css, js, viteGenerated }: { viteGenerated?: string[], css?: string[], js?: string[] } = {}) {
	const files = getAssetsUrl(["shared", ...(viteGenerated ?? [])])

	const jsFiles = [...js ?? [], ...files.js]
	const cssFiles = [...css ?? [], ...files.css]

	return (props: T) => (
		<ModuleHTML js={ jsFiles } css={ cssFiles }>
			<Component { ...props } />
		</ModuleHTML>
	)
}