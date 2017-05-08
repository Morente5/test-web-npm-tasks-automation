const copy = require('copy');

copy(
    './src/statics/*.*',
    './dist',
    (err, file) => (err) ?
        console.log(err) :
        console.log('Archivos estáticos copiados con éxito a ./dist')
);

copy(
    './src/statics/mail/*.*',
    './dist/mail',
    (err, file) => (err) ?
        console.log(err) :
        console.log('Carpeta mail copiada con éxito a ./dist')
);