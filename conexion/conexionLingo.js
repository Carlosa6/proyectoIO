const child_process = require('child_process');

const { retrocederUnaCarpeta, generarDentroFichero } = require('../manageString/manageString');
const { leerResultado, escribirParametros, cerrarExcel } = require('../conexion/conexionExcel');

const pathRaiz = retrocederUnaCarpeta(__dirname.toString());

const direccionLingoBaseNoEjecutable = `${pathRaiz}\\lingo\\patrones.ltf`;
const direccionLingoBaseEjecutable = `${pathRaiz}\\lingo\\patronesEjecutable.ltf`;
const direccionExcelEjecutar = `${pathRaiz}\\excel\\patrones.xlsx`;

const comnadoLingo = `runlingo "${direccionLingoBaseEjecutable}"`;
// const comandoGuardarExcel = `/p "${direccionExcelEjecutar}"`;
const comandoCerrarExcel = `TASKKILL /F /IM EXCEL.EXE`;




const correrLingo = async(presupuesto, demandaInsatisfecha, demandaTotal, patrones) => {

    console.log(presupuesto, demandaInsatisfecha, demandaTotal, patrones);

    await escribirParametros(presupuesto, demandaInsatisfecha, demandaTotal, patrones);

    const fichero = await generarDentroFichero('direccionExcel', direccionLingoBaseNoEjecutable, direccionExcelEjecutar, direccionLingoBaseEjecutable);

    let comando = await child_process.execSync(comnadoLingo).toString();

    // console.log(comando);

    console.log(await leerResultado());

    //cierra cualquier instancia de excel
    comando = await child_process.execSync(comandoCerrarExcel).toString();

    console.log(comando);
};

module.exports = {
    correrLingo
};