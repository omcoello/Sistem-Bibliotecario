var express = require('express');
var router = express.Router();
const estudianteModel = require('../models').estudiante;
const adminModel = require('../models').administrador;

let bd = {
  'usuario': 'abc',
  'contrasenia': '123'
}

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/validate', function (req, res, next) {
  let usuario = req.body.user;
  let contrasenia = req.body.password;

  console.log("usuario: ", usuario)
  console.log("contraseña: ", contrasenia)

  //Validación de estudiantes
  let verif = false;
  estudianteModel.findAll()
    .then(estudiantes => {
      console.log(estudiantes);
      estudiantes.forEach(est => {

        if (usuario == est['user'] && contrasenia == est['password']) {
          res.redirect('/libros/user');
          verif = true;
        }

      });
    });
  //Validacion de admin en caso de no ser estudiante
  if (!verif) {
    adminModel.findAll()
      .then(admins => {
        admins.forEach(adm => {

          if (usuario == adm['user'] && contrasenia == adm['password']) {
            res.redirect('/libros/admin');
            verif = true;
          }
        })
      });
  }
  //Redireccionando al login por datos incorrectos
  if (!verif) {
    res.redirect('/login')
  }

});


router.get('/validate', function (req, res, next) {
  let usuario = req.query.user;
  let contrasenia = req.query.password;

  console.log("usuario: ", usuario)
  console.log("contraseña: ", contrasenia)

  //Validación
  if (usuario == bd['usuario'] && contrasenia == bd['contrasenia']) {
    res.redirect('/');
  } else {
    res.redirect('/login');
  }

});


module.exports = router;
