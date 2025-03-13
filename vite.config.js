import path from 'path';
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
				"admin-organization": 'src/adapter/presenter/ts/admin-organization/index.ts',
				"admin-batch-detail": 'src/adapter/presenter/ts/admin-batch-detail/index.ts',
			},
		},
	},
	resolve: {
		alias: {
			'@browser': path.resolve(__dirname, 'src/adapter/presenter/ts'),
			'@request_contracts': path.resolve(__dirname, 'src/adapter/http/contracts/request'),
			'@response_contracts': path.resolve(__dirname, 'src/adapter/http/contracts/response'),
		}
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
