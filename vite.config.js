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
				"asesi": 'src/adapter/presenter/ts/asesi/index.ts',
				"aces-organization": 'src/adapter/presenter/ts/aces-organization/index.ts',
				"aces-batch-detail": 'src/adapter/presenter/ts/aces-batch-detail/index.ts',
				"case-analys-dev": 'src/adapter/presenter/ts/case-analys-dev/index.ts',
				"intray-dev": 'src/adapter/presenter/ts/intray-dev/index.ts',
				"shared": 'src/adapter/presenter/ts/shared/index.ts',
			},
		},
	},
	resolve: {
		alias: {
			'@constant': path.resolve(__dirname, 'src/adapter/constant'),
			'@presenter': path.resolve(__dirname, 'src/adapter/presenter'),
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
