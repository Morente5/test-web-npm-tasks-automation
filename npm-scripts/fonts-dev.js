const copy = require('copy');

copy(
	[
		//'./src/fonts/*.*',
		'node_modules/font-awesome/fonts/*.*'
	],
	'./dev/fonts',
	(err, file) => (err) ?
		console.log(err) :
		console.log('Carpeta fonts copiada con éxito a ./dev/fonts')
);