import esbuild from 'esbuild'
import svelte from 'esbuild-svelte'
import { typescript } from 'svelte-preprocess-esbuild'

esbuild
	.build({
		entryPoints: [ `landing-page/index.ts` ],
		mainFields: [ `svelte`, `browser`, `module`, `main` ],
		bundle: true,
		outfile: `public/landing-page.bundle.js`,
		plugins: [
			svelte({
				preprocess: [
					typescript(),
				],
			}),
		],
		logLevel: `info`,
	})
	.catch(() => process.exit(1))
