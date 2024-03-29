const warn = [ `warn` ]
const error = [ `error` ]
const never = [ `warn`, `never` ]
const always = [ `warn`, `always` ]
const asNeeded = [ `warn`, `as-needed` ]

module.exports = {
	root: true,
	parser: `@typescript-eslint/parser`,
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: [ `./tsconfig.json` ],
		extraFileExtensions: [ `.svelte` ],
		ecmaVersion: 2021,
		allowImportExportEverywhere: true,
		sourceType: `module`,
	},
	plugins: [ `svelte3`, `import`, `html`, `@typescript-eslint` ],
	overrides: [
		{
			files: [ `**/*.svelte` ],
			processor: `svelte3/svelte3`,
			rules: {
				'prefer-const': 0, // `eslint --fix` breaks with this enabled in some svelte files.
				'import/no-unresolved': 0,
				'import/no-absolute-path': 0,
			},
		},
		{
			files: [ `**/*.cjs`, `**/*.js` ],
			parser: `espree`,
		},
		{
			files: [ `**/*.ts`, `**/*.svelte` ],
			parser: `@typescript-eslint/parser`,
			parserOptions: {
				project: `./tsconfig.json`,
			},
			rules: {
				semi: `off`,
				'@typescript-eslint/no-misused-promises': error,
				'import/extensions': 0,
				'@typescript-eslint/semi': never,
				'@typescript-eslint/no-unused-vars': [ `warn`, { args: `after-used`, argsIgnorePattern: `^_` }],
				'comma-dangle': 0,
				// '@typescript-eslint/comma-dangle': [ `warn`, `always-multiline` ]
			},
		},
	],
	settings: {
		'svelte3/ignore-warnings': warning => warning.code === `a11y-autofocus`,
		'svelte3/typescript': require(`typescript`),
	},
	env: {
		browser: true,
		node: true,
		commonjs: true,
		es2021: true,
	},
	// extends: [
	//	 'eslint:recommended',
	// ],
	rules: {
		'require-atomic-updates': `off`,

		'no-mixed-spaces-and-tabs': warn,
		'no-inner-declarations': 0,
		'no-console': 0,
		'no-unexpected-multiline': 0,

		'no-extra-boolean-cast': 1,
		'array-bracket-spacing': always.concat({
			objectsInArrays: false,
		}),
		'block-spacing': always,
		'brace-style': 1,
		'comma-dangle': [ `warn`, `always-multiline` ],
		'comma-spacing': [ `warn`, { before: false, after: true }],
		'comma-style': 1,
		curly: 1,
		'computed-property-spacing': never,
		'func-call-spacing': never,
		indent: [ `warn`, `tab` ],
		'key-spacing': 1,
		'keyword-spacing': 1,
		'no-whitespace-before-property': 1,
		'no-trailing-spaces': 1,
		'object-curly-spacing': always,
		'padded-blocks': [ `warn`, `never` ],
		semi: never,
		'space-before-function-paren': never,
		'space-in-parens': never,
		'space-infix-ops': 1,
		'space-unary-ops': [ `warn`, {
			words: true,
			nonwords: false,
		}],
		'no-regex-spaces': 1,
		'no-unsafe-negation': 1,
		'dot-location': [ `warn`, `property` ],
		'dot-notation': 1,
		'no-extra-label': 1,
		'no-multi-spaces': [ `warn`, { exceptions: { Property: false } }],
		'no-useless-return': 1,
		'eol-last': always,
		'linebreak-style': 1,
		'no-lonely-if': 1,
		'no-unneeded-ternary': 1,
		'object-curly-newline': [ `warn`, { consistent: true }],
		'operator-linebreak': [ `warn`, `before` ],
		'quote-props': asNeeded,
		quotes: [ `warn`, `backtick` ],
		'space-before-blocks': always,
		// 'spaced-comment': always,
		'template-tag-spacing': 1,
		'unicode-bom': 1,
		'arrow-body-style': asNeeded,
		'arrow-parens': asNeeded,
		'arrow-spacing': 1,
		'generator-star-spacing': 1,
		'no-useless-computed-key': 1,
		'no-useless-rename': 1,
		'no-var': 1,
		'object-shorthand': 1,
		'prefer-arrow-callback': [ `warn`, { allowNamedFunctions: true }],
		'prefer-const': 1,
		'prefer-numeric-literals': 1,
		'prefer-spread': 1,
		'rest-spread-spacing': 1,
		eqeqeq: always,
		// 'template-curly-spacing': always, // someday this will be ok, but as of eslint-v7.0.0-rc.0 doesn't play nice with dynamic imports
		'yield-star-spacing': [ `warn`, `both` ],

		'no-undef': error,
		// 'no-unused-vars': [ `warn`, { args: `after-used`, argsIgnorePattern: `^_` }],
		'no-empty': [ `warn`, { allowEmptyCatch: true }],
		'no-debugger': warn,

		'import/no-unresolved': [ `error`, { commonjs: true }],
		'import/named': 2,
		'import/default': 2,
		'import/namespace': 1,
		'import/no-absolute-path': 2,
		'import/no-cycle': 2,
		'import/no-useless-path-segments': [ `warn`, { commonjs: true }],
		'import/export': 2,
		'import/no-named-as-default': 1,
		// 'import/no-unused-modules': [ 1, { unusedExports: true }],
		'import/extensions': [ `warn`, `ignorePackages`, {
			ts: `never`,
		}],
		"no-multi-assign": warn,
	},
}
