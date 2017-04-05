const copy = require('copy');

copy(
    './src/statics/*.*',
    './dev',
    (err, file) => (err) ?
        console.log(err) :
        console.log('Archivos estáticos copiados con éxito a ./dev')
);