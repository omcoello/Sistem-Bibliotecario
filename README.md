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

Estas serán las rutas principales a ejecutarse en el puerto 3000. La ruta raíz es la ruta del login, basta con posicionarse en el login para que fluya correctamente el código.

- GET localhost:3000/ : Ruta raíz que lleva al log in.

Credenciales de estudiante:
user:abc password:123
user:user password:user
user:asd password:123
user:qwe password:123
user:zxc password:123

Credenciales de administrador:
user:admin password:admin
user:prueba password:prueba
 
- POST /validate : Ruta para confirmar las credenciales y redireccionar al login en caso de ingresar datos incorrectos
- GET /libros/catalogo/:idEst




