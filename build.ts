import { build, context, type BuildOptions } from 'esbuild'
import sveltePlugin from 'esbuild-svelte'

const is_watch = process.argv.includes('--watch')
const is_dev = process.argv.includes('--dev') || is_watch

const build_options: BuildOptions = {
	entryPoints: ['landing-page/index.ts'],
	mainFields: ['svelte', 'browser', 'module', 'main'],
	bundle: true,
	outfile: 'public/landing-page.bundle.js',
	plugins: [
		sveltePlugin({
			compilerOptions: {
				dev: is_dev,
			},
		}),
	],
	logLevel: 'info',
}

if (is_watch) {
	const ctx = await context(build_options)
	await ctx.watch()
	console.log('Watching for changes...')
} else {
	await build(build_options)
	console.log('Build complete')
}
