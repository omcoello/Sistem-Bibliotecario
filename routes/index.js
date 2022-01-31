var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
const Libro = require('../models').libro;
const Prestamo = require('../models').prestamo;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My Dashboard' });
});

router.get('/libros', function(req, res, next) {
  Libro.findAll()
  .then(catalogo => {
    res.render('libros', { title: 'My Dashboard :: Catalogo', librosArr: catalogo });
  })
  .catch(error => {res.status(400).send(error);
  })
});


router.get('/libros/:tituloLibro', function(req,res,next){
  var tituloLibro = req.params.tituloLibro;  
  console.log(tituloLibro)
  Libro.increment(
    {cantidad: -1},
    {where: {titulo: tituloLibro}}
  )
  .then(libroArr => {
    res.render('prestamo', { title: 'Prestamo', libro: libroArr });
  })
  .catch(error => {res.status(400).send(error);
  }) 
});

function (){

}


module.exports = router;
