import babel from 'rollup-plugin-babel';

const plugins = [
	babel( {
		exclude: 'node_modules/**',
		presets: [
			[ '@babel/preset-env', {
				modules: false,
				targets: {
					node: '6.0',
					browsers: [ 'ie 11' ],
				},
			} ],
		],
	} ),
];

const config = [
	{
		input: 'src/equivalent-key-map.js',
		output: {
			format: 'cjs',
			file: 'equivalent-key-map.js',
		},
		plugins,
	},
];

if ( process.env.NODE_ENV === 'production' ) {
	config.push( {
		input: 'src/equivalent-key-map.js',
		output: {
			format: 'iife',
			file: 'dist/equivalent-key-map.js',
			name: 'EquivalentKeyMap',
		},
		plugins,
	} );
}

export default config;
