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
    attributes: { exclude: ["EstudianteId"] },
    where: { estudiante: idEst }
  })
    .then(prestamoArr => {
      res.render('prestamosActivos', { title: "Prestamos Activos", prestamos: prestamoArr, est: idEst });
    })
});

//Ruta para ver prestamos activos
router.get('/libros/prestamos/activos/:idEst', function (req, res, next) {
  var idEst = req.params.idEst;
  Prestamo.findAll({
    attributes: { exclude: ["EstudianteId"] },
    where: { estudiante: idEst }
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

//Buscar informacion de un libro por su codigo

router.get('/admin/menu', function (req, res, next) {

  res.render("admin", { title: "Admin Menu" });


});

router.post('/admin/menu/validate/query', function (req, res, next) {
  var ingreso = req.body.ingreso;
  Libro.findAll({
    where: { codigo: ingreso }
  })
    .then(catalogo => {
      res.render('libros_admin', { title: 'Detalles de libro', librosArr: catalogo });
    })
    .catch(error => {
      res.status(400).send(error);
    })
});

router.post('/admin/menu/validate/insert', function (req, res, next) {
  var codigo = req.body.codigo;
  var titulo = req.body.titulo;
  var autor = req.body.autor;
  var cantidad = parseInt(req.body.cantidad);

  let verif = false;
  codigosArr = [];

  (async () => {
    const libroPromess = await Libro.findAll();

    libroPromess.forEach(lib => {
      codigosArr.push(lib.codigo);
      if (codigo == lib.codigo) {
        verif = true;
        Libro.increment(
          { cantidad: +cantidad },
          { where: { codigo: codigo } }
        )
        return res.redirect('/admin/menu');
      }

    });

    //Insercion por inexistencia del libro
    if (!verif) {

      (async () => {
        var lastCode = parseInt(codigosArr[codigosArr.length -1]) + 1;
        const insertPromess = await Libro.create({codigo:lastCode, titulo: titulo, autor: autor, cantidad: cantidad, createdAt: new Date(), updatedAt: new Date()});
        console.log("Creado nuevo libro con id: " + insertPromess.id);
        return res.redirect('/admin/menu');
      })();
    }


  })();

});




module.exports = router;
