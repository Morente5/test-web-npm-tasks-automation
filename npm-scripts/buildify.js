const  buildify = require('buildify'),
	filesJS = [
		'./src/js/script.js'
	],
	filesCSS = [
		'./dist/css/styles.css'
	];

	buildify()
		.concat( filesCSS )
		.cssmin()
		.save( './dist/css/styles.min.css' );

	buildify()
		.concat( filesJS )
		.save( './dist/js/script.js' )
		.uglify()
		.save( './dist/js/script.min.js' );