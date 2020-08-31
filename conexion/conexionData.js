const Excel = require('exceljs');
const { retrocederUnaCarpeta, leerArchivo } = require('../manageString/manageString');

const workbook = new Excel.Workbook();

const pathRaiz = retrocederUnaCarpeta(__dirname.toString());
const direccionExcel = `${pathRaiz}\\excel\\patrones.xlsx`;
const direccionDatoSalida = `${pathRaiz}\\salida\\data.txt`;

const leerResultado = async() => {

    let archivoString = (await leerArchivo(direccionDatoSalida)).toString();
    archivoString = archivoString.split('\r\n');
    archivoString = archivoString.map(data => data.split('        ').filter(data => data !== ''));
    archivoString = archivoString.slice(0, archivoString.length - 1).map(data => Number.parseInt(data));
    const cantidadPatrones = {
        CnP1: archivoString[0],
        CnP2: archivoString[1],
        CnP3: archivoString[2],
        CnP4: archivoString[3],
    };

    return cantidadPatrones;
};

const escribirParametros = async(presupuesto, demandaInsatisfecha, demandaTotal, patrones) => {

    await workbook.xlsx.readFile(direccionExcel);

    const woorksheets = workbook.worksheets[0];
    //Presupuesto
    woorksheets.getCell('A7').value = presupuesto;

    //Demanda Inzatisfecha de estudiantes
    woorksheets.getCell('C7').value = demandaInsatisfecha;

    //Demanda Total de estudiantes
    woorksheets.getCell('E7').value = demandaTotal;

    //cantidad de ocupantes de los patrones
    woorksheets.getCell('A13').value = patrones[0].ocupantes;
    woorksheets.getCell('B13').value = patrones[1].ocupantes;
    woorksheets.getCell('C13').value = patrones[2].ocupantes;
    woorksheets.getCell('D13').value = patrones[3].ocupantes;

    //Costo de cada patron
    woorksheets.getCell('A17').value = patrones[0].costo;
    woorksheets.getCell('B17').value = patrones[1].costo;
    woorksheets.getCell('C17').value = patrones[2].costo;
    woorksheets.getCell('D17').value = patrones[3].costo;

    return await workbook.xlsx.writeFile(direccionExcel);


};

const cerrarExcel = async() => {
    return workbook.xlsx.writeFile(direccionExcel);
};

// leerResultado(direccionExcel)
//     .then(resp => console.log(resp))
//     .catch(err => console.log(err));

// escribirParametros(direccionExcel, patrones, presupuesto, demandaInsatisfecha, demandaTotal)
//     .then(resp => console.log('Se escribio de manera correcta los datos'))
//     .catch(err => console.log(err));

module.exports = {
    leerResultado,
    escribirParametros,
    cerrarExcel
};