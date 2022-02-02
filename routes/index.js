var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
const Libro = require('../models').libro;
const Prestamo = require('../models').prestamo;

const { QueryTypes } = require('sequelize');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login', { title: 'Log In' });
});

//SECCION ESTUDIANTE

//Muestra el catalogo de libros disponibles y que no ha prestado
router.get('/libros/catalogo/:idEst', function (req, res, next) {
  var idEst = req.params.idEst;

  Libro.sequelize.query("select * from libros where codigo not in (select codigoLibro from prestamos where estudiante = :id)", {
    replacements: { id: idEst },
    type: QueryTypes.SELECT
  }
  )
    .then(catalogo => {
      res.render('libros', { title: 'My Dashboard :: Catalogo', librosArr: catalogo, est: idEst });
    })
    .catch(error => {
      res.status(400).send(error);
    })
});

//Ruta de confirmacion de prestamo
router.get('/libros/:tituloLibro/:idEst', function (req, res, next) {
  var tituloLibro = req.params.tituloLibro;
  var idEst = req.params.idEst;

  Libro.findAll({ where: { titulo: tituloLibro } })
    .then(libro => {
      res.render('prestamo', { title: "Confirmacion", librosArr: libro, est: idEst });
    })
    .catch(error => {
      res.status(400).send(error);
    })

  Libro.decrement(
    { cantidad: 1 },
    { where: { titulo: tituloLibro } }
  );
});

router.get('/libros/prestamo/:codigoLibro/:idEst', function (req, res, next) {
  var codigo = req.params.codigoLibro;
  var idEst = req.params.idEst;
  registrarPrestamo(codigo, idEst);
  Prestamo.findAll({
    attributes: { exclude: ["EstudianteId"] }
  })
    .then(prestamoArr => {
      res.render('prestamosActivos', { title: "Prestamos Activos", prestamos: prestamoArr, est: idEst });
    })
});

//Ruta para ver prestamos activos
router.get('/libros/prestamos/activos/:idEst', function (req, res, next) {  
  var idEst = req.params.idEst;  
  Prestamo.findAll({
    attributes: { exclude: ["EstudianteId"] }
  })
    .then(prestamoArr => {
      res.render('prestamosActivos', { title: "Prestamos Activos", prestamos: prestamoArr, est: idEst });
    })
});

//Devuelve en cantidad el libro preseleccionado y redirecciona al catalogo de libros
router.get('/libros/prestamo_rechazo/:tituloLibro/:idEst', function (req, res, next) {
  var idEst = req.params.idEst;
  var tituloLibro = req.params.tituloLibro;
  Libro.increment(
    { cantidad: +1 },
    { where: { titulo: tituloLibro } }
  )
  res.redirect('/libros/catalogo/' + idEst);
});

function registrarPrestamo(codigoLib, idEst) {
  var hoy = new Date();
  var fecha = hoy.toISOString().split('T')[0];
  var formatoFecha = fecha + ' ' + hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();

  var fechaDev = new Date();
  fechaDev.setDate(fechaDev.getDate() + 30);
  formatoFechaDev = fechaDev.toISOString().split('T')[0] + ' ' + hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
  
  Prestamo.create({ codigoLibro: codigoLib, estudiante: idEst, fechaEmision: formatoFecha, fechaDevolucion: formatoFechaDev, createdAt: formatoFecha, updatedAt: formatoFecha });
}

//SECCION DE ADMINISTRADOR






module.exports = router;
