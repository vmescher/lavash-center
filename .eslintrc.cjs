module.exports = {
	root: true,
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: '@typescript-eslint/parser',
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	env: {
		node: true,
		browser: true,
		es2022: true,
	},
	plugins: ['@typescript-eslint', 'prettier'],
	extends: [
		'airbnb-base',
		'plugin:@typescript-eslint/recommended',
		'plugin:vue/vue3-recommended',
		"@vue/typescript/recommended",
		'prettier',
	],
	rules: {
		'import/extensions': 0,
		'import/prefer-default-export': 0,
		'import/newline-after-import': 0,
		'no-tabs': 0,
		'no-console': 0,
		'no-unused-vars': 0,
		'no-empty-function': 0,
		'no-underscore-dangle': 0,
		'no-param-reassign': 0,
		'no-shadow': 0,
		'@typescript-eslint/no-shadow': 2,
		'vue/no-v-html': 0,
		...(process.env.NODE_ENV !== 'production' ? {
			'import/no-absolute-path': 0,
			'import/no-unresolved': 0,
			semi: 0,
			indent: 0,
			'object-curly-spacing': 0,
			'no-multiple-empty-lines': 0,
			'no-trailing-spaces': 0,
			'no-multi-spaces': 0,
			'linebreak-style': 0,
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					varsIgnorePattern: '^_',
					argsIgnorePattern: '^_',
				},
			],
			'@typescript-eslint/no-empty-function': 1,
			'padded-blocks': 0,
			quotes: 0,
		} : {
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					varsIgnorePattern: '^_',
					argsIgnorePattern: '^_',
				},
			],
			'@typescript-eslint/no-empty-function': 2,
		}),
	},
	settings: {
		'import/resolver': {
			alias: {
				map: [
					['@', './src'],
					['@components', './src/components'],
					['@styles', './src/styles'],
					['@img', './src/assets/img'],
					['@scripts', './src/scripts'],
					['@fonts', './src/assets/fonts']
				],
				extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
			},
		},
		'eslint-plugin': {
			dir: 'src',
		},
	},
};
