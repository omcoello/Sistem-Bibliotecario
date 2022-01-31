var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
const Libro = require('../models').libro;

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
  models.prestamo.findAll({    

    where: {
        tituloLibro: req.params.id_tipo,
    },
  })
  .then(prestamo => {
    res.render('prestamo', { title: 'Préstamo', prestamo: prestamo });
  })
  .catch(error => {res.status(400).send(error);
  })

});



module.exports = router;
