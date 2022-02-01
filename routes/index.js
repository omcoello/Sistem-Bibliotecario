var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
const Libro = require('../models').libro;
const Prestamo = require('../models').prestamo;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login', { title: 'Log In' });
});

router.get('/libros', function (req, res, next) {
    Libro.findAll()
    .then(catalogo => {
      res.render('libros', { title: 'My Dashboard :: Catalogo', librosArr: catalogo });
    })
    .catch(error => {
      res.status(400).send(error);
    })
});

//Ruta de confirmacion de prestamo
router.get('/libros/:tituloLibro', function (req, res, next) {
  var tituloLibro = req.params.tituloLibro;  
  
  Libro.findAll({ where: { titulo: tituloLibro } })
    .then(libro => {
      res.render('prestamo', { title: "Confirmacion", librosArr: libro});
    })
    .catch(error => {
      res.status(400).send(error);
    })

    Libro.decrement(
      { cantidad: 1 },
      { where: { titulo: tituloLibro } }
    );
});

router.get('/libros/prestamo/:codigoLibro', function (req, res, next) {
  var codigo = req.params.codigoLibro;
  registrarPrestamo(codigo);
  res.redirect('/libros');
});

//Devuelve en cantidad el libro preseleccionado y redirecciona al catalogo de libros
router.get('/libros/prestamo_rechazo/:tituloLibro',function(req,res,next){
  var tituloLibro = req.params.tituloLibro;  
    Libro.increment(
      { cantidad: +1},
      { where: { titulo: tituloLibro } }
    )
    res.redirect('/libros');
    });

function registrarPrestamo(codigoLib){    
  var hoy = new Date();
  var fecha = hoy.toISOString().split('T')[0];
  var formatoFecha = fecha + ' ' + hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
  
  var fechaDev = new Date();
  fechaDev.setDate(fechaDev.getDate() + 30);
  formatoFechaDev = fechaDev.toISOString().split('T')[0]  + ' ' + hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();    
  
  Prestamo.create({codigoLibro: codigoLib, fechaEmision: formatoFecha, fechaDevolucion: formatoFechaDev,createdAt: formatoFecha, updatedAt: formatoFecha});  
  }


  



module.exports = router;
