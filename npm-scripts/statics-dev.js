const copy = require('copy');

copy(
    './src/statics/*.*',
    './dev',
    (err, file) => (err) ?
        console.log(err) :
        console.log('Archivos estáticos copiados con éxito a ./dev')
);

copy(
    './src/statics/mail/*.*',
    './dev/mail',
    (err, file) => (err) ?
        console.log(err) :
        console.log('Carpeta mail copiada con éxito a ./dev')
);