const fs = require('fs');
const { Data } = require('../../models/data')


let db = [];



const crear = (datos) => {
    cargarDB();

    let patrones = {
        idPatron: db[0] + 1,
        data: datos
    };

    db[0] += 1;

    db.push(patrones);

    guardarDB();

    console.log(db);

    return db;
};

const listar = () => {
    cargarDB();

    return db;
};

const buscarConjuntos = (id) => {
    return db.findIndex(patrones => patrones.idPatron === id);
};

const actualizar = (id, data) => {
    cargarDB();
    let index = buscarConjuntos(descripcion);
    if (index >= 0) {
        db[index].data = data;
        guardarDB();
        return db[index];
    }
};

const borrar = (descripcion) => {
    cargarDB();

    let index = buscarTarea(descripcion);

    db = db.filter(tarea => tarea.descripcion !== descripcion);

    guardarDB();

    return `${(index!==-1)?'Se elimino':'No se encontro'} la tarea con descripcion: ${descripcion}`;

};

const escribirArchivo = (data) => new Promise((resolve, reject) => {
    fs.writeFile(`./db/data.json`, data, (err) => {
        if (err) reject(err);
        resolve('data.json');
    });
});

const leerArchivo = () => new Promise((resolve, reject) => {
    fs.readFile(`./db/data.json`, (err, data) => {
        if (err) reject(err);
        resolve(data);
    });
});



const guardarDB = async() => {
    const dataJSON = JSON.stringify(listadoPorHacer);
    const data = new Uint8Array(Buffer.from(dataJSON));

    return await escribirArchivo(data);
};

const cargarDB = async() => {
    try {
        db = require('../db/data.json');
    } catch (error) {
        db = [];
    }


    // console.log(listadoPorHacer);

};

module.exports = {
    crear,
    listar,
    actualizar,
    borrar
};