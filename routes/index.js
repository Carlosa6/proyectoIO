const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('presentacion');
});

router.get('/patrones', (req, res) => {
    res.render('patrones');
});

router.get('/patrones/registrar', (req, res) => {
    res.render('registrar');
});

router.get('/patrones/eliminar', (req, res) => {
    res.render('eliminar');
});

router.get('/patrones/listar', (req, res) => {
    res.render('listar');
});

router.get('/patrones/actulizar', (req, res) => {
    res.render('actualizar');
});

module.exports = router;