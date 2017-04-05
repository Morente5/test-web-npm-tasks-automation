const copy = require('copy');

copy(
	[
		'./src/img/*.*'
	],
	'./dev/img',
	(err, file) => (err) ?
		console.log(err) :
		console.log('Carpeta img copiada con éxito a ./dev/img')
);