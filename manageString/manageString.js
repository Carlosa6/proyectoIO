const fs = require('fs');
const child_process = require('child_process');

const aumentarBarraInvertida = (direccion) => {
    let dir = direccion.split('');
    dir = dir.map(letra => (letra === '\\') ? letra += '\\' : letra);
    return dir.join('');
};

const retrocederUnaCarpeta = (direccion) => {
    let dir = direccion.split('\\');

    return dir.slice(0, dir.length - 1).join('\\');
};


const escribirArchivo = (dir, data) => new Promise((resolve, reject) => {
    fs.writeFile(dir, data, (err) => {
        if (err) reject('La direccion del fichero a escribir es incorrecta o no existe');
        resolve('data.json');
    });
});

const leerArchivo = (dir) => new Promise((resolve, reject) => {
    fs.readFile(dir, (err, data) => {
        if (err) reject('La direccion del fichero a leer es incorrecta o no existe');
        resolve(data);
    });
});

const reemplazarRutaDentroFichero = async(nombreVariable, direccion, direccionExcel) => {
    let archivoString = (await leerArchivo(direccion)).toString();
    archivoString = archivoString.split(nombreVariable).join(direccionExcel);
    return archivoString;
};

const generarDentroFichero = async(nombreVariable, direccion, direccionExcel, direccionFichero) => {
    try {
        if (!fs.existsSync(direccionFichero)) child_process.execSync(`type nul > "${direccionFichero}"`);
    } catch (error) {
        throw new Error('La direccion del fichero es incorrecta');
    }
    const archivoString = await reemplazarRutaDentroFichero(nombreVariable, direccion, direccionExcel);

    await escribirArchivo(direccionFichero, archivoString);

    return 'Se genero de manera correcta el archivo';

};

module.exports = {
    retrocederUnaCarpeta,
    generarDentroFichero
};