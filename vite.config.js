import { defineConfig } from 'vite';

export default defineConfig({
	publicDir: false,
	build: {
		manifest: true,
		outDir: 'public/assets/generated',
		sourcemap: !process.env.npm_lifecycle_script.includes("--mode production"),
		minify: process.env.npm_lifecycle_script.includes("--mode production") ? "esbuild" : false,
		rollupOptions: {
			input: {
				"admin": 'src/adapter/presenter/ts/admin/index.ts',
				"asesi": 'src/adapter/presenter/ts/asesi/index.ts',
			},
		},
	},
	resolve: {
		alias: {
			'@browser': 'src/adapter/presenter/ts'
		},
	},
	esbuild: {
		jsxInject: `import React from 'react'`,
		drop: process.env.npm_lifecycle_script.includes("--mode production") ? ['console', 'debugger'] : [],
	},
	plugins: [
		{
			name: 'custom-manifest-path',
			apply: 'build',
			enforce: 'post',
			configResolved(config) {
				config.build.manifest = 'meta/manifest.json'; // Set custom manifest path
			},
		},
	],
});
