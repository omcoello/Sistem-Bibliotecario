var express = require('express');
var router = express.Router();
const estudianteModel = require('../models').estudiante;
const adminModel = require('../models').administrador;

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/validate', function (req, res, next) {
  let usuario = req.body.user;
  let contrasenia = req.body.password;

  //Validación de estudiantes
  let verif = false;

  (async () => {
    const Estud = await estudianteModel.findAll();

    Estud.forEach(est => {
      if (usuario == est['user'] && contrasenia == est['password']) {
        verif = true;
        console.log("Retorna un estudiante")
        return res.redirect('/libros/catalogo/'+est.id);
      }

    });

    //Validacion de admin en caso de no ser estudiante
    if (!verif) {

      (async () => {

        const Admini = await adminModel.findAll()
        Admini.forEach(adm => {
          if (usuario == adm['user'] && contrasenia == adm['password']) {
            verif = true;
            console.log("Entro aquí")
            return res.redirect('/libros/admin');            
          }
        });
        console.log("No deberia estar aqui ya")
    //Redireccionando al login por datos incorrectos
    if (!verif) {
      res.redirect('/login')
    }

      })();
    }
    

  })();


});


module.exports = router;
