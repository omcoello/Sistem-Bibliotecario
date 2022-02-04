# sitioExpress

Para este proyecto será necesario tener previamente instalado node js,express y utilizar una base de datos en MYSQL de preferencia con el nombre de schema de "biblioteca".

#Manual de despliegue:
Se creará un schema con el nombre "biblioteca" en MYSQL y se modificarán las credenciales correctas de su base de datos, esto es, el user y password del archivo config/config.json en la clase development. En caso de utilizar otro nombre de schema de base de datos, modificarlo en la clave "database" de development.

Para el correcto funcionamiento del proyecto luego de clonar el respectivo repositorio de sistema bibliotecario, entonces será necesario ejecutar los sgtes comandos del cmd en la ruta de la carpeta clonada:

- npm install
- npm i -g sequelize-cli
- npm i -S sequelize mysq2

Los comandos especificados anteriormente serán para instalar el ORM sequelize para el manejo de migración de los modelos de datos creados en la base de datos.

A continuación se migraran los modelos de la base de datos pero por el momento será necesario sacar temporalmente el archivo de migración "20220130211631-create-prestamo" ubicado en la carpeta migrations del proyecto. Será necesario alojarlo en una carpeta externa hasta nuevo aviso.

Luego de desplazar temporalmente el archivo indicado se ejecuta el siguiente comando en consola:

- sequelize db:migrate

Ahora sí podemos incluir el archivo  "20220130211631-create-prestamo" temporalmente desplazado, a la carpeta de migrations para ejecutar nuevamente el comando:

- sequelize db:migrate

La razón de realizar estas artimañas es que es necesario que se ejecuten primero los demás modelos debido a las dependencia de clave foránea de la tabla préstamos con la tabla estudiantes.

Luego de conectarse a la base de datos en MYSQL Workbench se ejecuta el siguiente query que será el encargado de crear los datos necesarios para la visualización de los datos:

use biblioteca;

-- #Inserciones en tabla libro
insert into libros (id,codigo,titulo,autor,cantidad,createdAt,updatedAt) values (1,1,"Zemansky","Goethe",20,now(),now());
insert into libros (id,codigo,titulo,autor,cantidad,createdAt,updatedAt) values (2,2,"Purcell","Sade",40,now(),now());
insert into libros (id,codigo,titulo,autor,cantidad,createdAt,updatedAt) values (3,3,"Estadistica","Shelley",30,now(),now());
insert into libros (id,codigo,titulo,autor,cantidad,createdAt,updatedAt) values (4,4,"Matematicas","Dickens",30,now(),now());
insert into libros (id,codigo,titulo,autor,cantidad,createdAt,updatedAt) values (5,5,"Quimica","Melville",40,now(),now());

-- #Inserciones en tabla estudiantes
insert into estudiantes (id,idEstudiante,user,password,createdAt,updatedAt) values (1,1,"abc",123,now(),now());
insert into estudiantes (id,idEstudiante,user,password,createdAt,updatedAt) values (2,2,"asd",123,now(),now());
insert into estudiantes (id,idEstudiante,user,password,createdAt,updatedAt) values (3,3,"user","user",now(),now());
insert into estudiantes (id,idEstudiante,user,password,createdAt,updatedAt) values (4,4,"qwe",123,now(),now());
insert into estudiantes (id,idEstudiante,user,password,createdAt,updatedAt) values (5,5,"zxc",123,now(),now());

-- #Inserciones en tabla administradores
insert into administradores (id,idAdmin,user,password,createdAt,updatedAt) values (1,1,"admin","admin",now(),now());
insert into administradores (id,idAdmin,user,password,createdAt,updatedAt) values (2,2,"prueba","prueba",now(),now());

Finalmente ya se puede levantar el servidor para el respectivo funcionamiento.

-npm run devstart

/*En el supuesto caso que presente inconvenientes, entonces utilizar: */

- npm start


#Endpoints:

Credenciales de estudiante:
user:abc password:123
user:user password:user
user:asd password:123
user:qwe password:123
user:zxc password:123

Credenciales de administrador:
user:admin password:admin
user:prueba password:prueba

La ruta raíz es la ruta del login, basta con posicionarse en el login para que fluya correctamente el código.

- GET localhost:3000/ => Ruta raíz que lleva al log in.
- POST /validate => Ruta para confirmar las credenciales y redireccionar al login en caso de ingresar datos incorrectos.

Para estudiante:
- GET /libros/catalogo/:idEst  => Ruta para mostrar los libros disponibles segun el estudiante logeado.
- GET /libros/:tituloLibro/:idEst => Ruta para confirmar el prestamo de un libro mostrando los datos del mismo.
- GET /libros/prestamo/:codigoLibro/:idEst => Ruta para registrar los prestamos activos luego de validar la confirmación del préstamo.
- GET /libros/prestamos/activos/:idEst => Ruta de visualización de préstamos activos según el estudiante logeado.
- GET /libros/prestamo_rechazo/:tituloLibro/:idEst' => Ruta para aumentar la cantidad temporalmente disminuida del libro a prestar en fase de confirmación.

Para administrador:
- GET /admin/menu => Ruta para mostrar el menú de opciones disponibles del administrador.
- POST /admin/menu/validate/query => Ruta para validar y mostrar los resultados de la búsqueda de libro por código.
- POST /admin/menu/validate/insert => Ruta para validar la inserción de un libro o de aumento de cantidad en caso de existir.

#Información de servicios:
Todo el backend funciona en el puerto 3000, ej: https://localhost:3000/

#Consideraciones

Para mejorar la sincronía de los datos al momento de realizar préstamos sería necesario utilizar funciones async/await para evitar que se renderice la página antes de obtener los resultados de las consultas a la base de datos.
Para mejorar la seguridad en el logeo se considera reemplazar los caracteres ingresados en contraseña con el punto en negro utilizado comúnmente en las plataformas web.
Si luego de realizar un préstamo no se visualiza ningúun dato, entonces es necesario volver al catálogo y ver los préstamos activos. Esto se debe a los problemas de sincronía mencionados anteriormente. Si se recarga la página se realiza la inserción dos veces del mismo préstamo.
