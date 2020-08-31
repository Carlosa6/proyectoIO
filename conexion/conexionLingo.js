const child_process = require('child_process');

const { retrocederUnaCarpeta, generarDentroFichero } = require('../manageString/manageString');
const { leerResultado, escribirParametros, cerrarExcel } = require('../conexion/conexionData');

const pathRaiz = retrocederUnaCarpeta(__dirname.toString());

const direccionLingoBaseNoEjecutable = `${pathRaiz}\\lingo\\patrones.ltf`;
const direccionLingoBaseEjecutable = `${pathRaiz}\\lingo\\patronesEjecutable.ltf`;

const direccionExcelEjecutar = `${pathRaiz}\\excel\\patrones.xlsx`;
const direccionDatoSalida = `${pathRaiz}\\salida\\data.txt`;

const comnadoLingo = `runlingo "${direccionLingoBaseEjecutable}"`;
// const comandoGuardarExcel = `/p "${direccionExcelEjecutar}"`;
const comandoCerrarExcel = `TASKKILL /F /IM EXCEL.EXE`;

const esperaTiempo = (time) => new Promise((resolve, reject) => {

    setTimeout(() => {
        resolve(`pasaron ${time} segundos`);
    }, time * 1000);

});

const correrLingo = async(presupuesto, demandaInsatisfecha, demandaTotal, patrones) => {

    console.log(presupuesto, demandaInsatisfecha, demandaTotal, patrones);

    await escribirParametros(presupuesto, demandaInsatisfecha, demandaTotal, patrones);

    const fichero = await generarDentroFichero('direccionExcel', 'direccionSalida', direccionLingoBaseNoEjecutable, direccionExcelEjecutar, direccionDatoSalida, direccionLingoBaseEjecutable);

    let comando = await child_process.execSync(comnadoLingo).toString();

    //muestra el resultado de lingo
    // console.log(comando);

    console.log(await leerResultado());

    //cierra cualquier instancia de excel
    comando = await child_process.execSync(comandoCerrarExcel).toString();

    //muestra el resultadodel cierre del comando
    //console.log(comando);

    await esperaTiempo(1);

};

module.exports = {
    correrLingo
};