const Excel = require('exceljs');
const { retrocederUnaCarpeta } = require('../manageString/manageString');

const workbook = new Excel.Workbook();

const pathRaiz = retrocederUnaCarpeta(__dirname.toString());
const direccionExcel = `${pathRaiz}\\excel\\patrones.xlsx`;

const leerResultado = async() => {

    await workbook.xlsx.readFile(direccionExcel);

    const woorksheets = workbook.worksheets[0];

    const cantidadPatrones = {
        CnP1: woorksheets.getCell('A23').value,
        CnP2: woorksheets.getCell('B23').value,
        CnP3: woorksheets.getCell('C23').value,
        CnP4: woorksheets.getCell('D23').value
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