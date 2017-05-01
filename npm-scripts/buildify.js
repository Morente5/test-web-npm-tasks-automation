const  buildify = require('buildify'),
	filesJS = [
		'./node_modules/jquery/dist/jquery.min.js',
		'./node_modules/sticky-kit/dist/sticky-kit.js',
		'./dev/js/forms.js',
		'./dev/js/map.js',
		'./dev/js/mobile-menu.js',
		'./dev/js/sticky.js'
	],
	filesCSS = [
		'./dev/css/styles.css'
	];

	buildify()
		.concat( filesCSS )
		.cssmin()
		.save( './dist/css/styles.css' );

	buildify()
		.concat( filesJS )
		.save( './dist/js/script.js' )
		.uglify()
		.save( './dist/js/script.min.js' );