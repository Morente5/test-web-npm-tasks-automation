const  buildify = require('buildify'),
	filesJS = [
		'./dev/js/forms.js',
		'./dev/js/carousel.js',
		'./dev/js/map.js',
		'./dev/js/mobile-menu.js',
		'./dev/js/sticky.js',
		'./dev/js/faq.js'
	],
	filesCSS = [
		'./dev/css/styles.css'
	];
	buildify()
		.concat( filesJS )
		.save( './dist/js/script.js' )
		.uglify()
		.save( './dist/js/script.min.js' );

	buildify()
		.concat( filesCSS )
		.cssmin()
		.save( './dist/css/styles.css' );
