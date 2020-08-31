const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

//ubicación de las vistas
app.set('views', path.join(__dirname,'views'))

//configuración de handlebars
app.engine('hbs', exphbs({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname:'.hbs'
}));
app.set('view engine','hbs');

//middlewares
app.use(express.urlencoded({extended:false}));

//rutas
app.use(require('./routes/index'));

app.listen(port, console.log("Server on port",port));

/////////////////////////////
const { correrLingo } = require('./conexion/conexionLingo');

const { Data } = require('./models/data');
const { Patron } = require('./models/patron');


const procesoInicial = async() => {
    let datos = new Data(1000000, 147, 1000, [new Patron(123, 8840),
        new Patron(120, 8610), new Patron(120, 8610), new Patron(122, 8380)
    ]);

    await correrLingo(datos.presupuesto, datos.demandaInsatisfecha, datos.demandaTotal, datos.patrones);


    // datos = new Data(200000, 247, 30000, [new Patron(123, 8840),
    //     new Patron(120, 8610), new Patron(120, 8610), new Patron(122, 8380)
    // ]);

    // await correrLingo(datos.presupuesto, datos.demandaInsatisfecha, datos.demandaTotal, datos.patrones);

    // datos = new Data(100000, 400, 10000, [new Patron(123, 8840),
    //     new Patron(120, 8610), new Patron(120, 8610), new Patron(122, 8380)
    // ]);

    // await correrLingo(datos.presupuesto, datos.demandaInsatisfecha, datos.demandaTotal, datos.patrones);

};

//procesoInicial();