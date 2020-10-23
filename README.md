![header](doc/header.png)

# Trabajo Práctico Final

Autor:
* Gustavo Zocco

Docentes:
* Agustin Bassi
* Brian Ducca
* Santiago Germino

# Descripción:

El proyecto consiste en un prototipo básico de una Single Page Application (SPA) para el control de un Smart Home. Permite accionar distintos dispositivos mediante switches.
Para concretar las objetivos propuestos, se desarrollaron distintas funcionalidades tanto en el FrontEnd como en el BackEnd.

# Funcionalidades Implementadas:

## FrontEnd:

    - Listado de dispositivos creado dinámicamente al cargar la SPA.
    - Agregar un nuevo dispositivo.

## Backend:
    Métodos para:
    
    - Obtener todos los campos de todos los dispositivos.
    - Obtener todos los campos de un dispositivo por id.
    - Crear un dispositivo nuevo.
    - Eliminar un dispositivo por id.

# Dependencias:

Los requisitos para correr esta aplicación son:

## Tener instalado: 

* Docker 
* Docker-compose

## Tenes las siguiente Imagenes de Docker instaladas:

* mysql                   5.7                 d589ea3123e0        6 weeks ago         448MB
* phpmyadmin/phpmyadmin   latest              dfd1f4649053        7 weeks ago         469MB
* abassi/nodejs-server    10.0-dev            921893dceae7        5 months ago        925MB
* harmish/typescript      latest              bfec44dee8d2        2 years ago         458MB

### Conteniendo las siguientes versiones:

* express: "^4.17.1"
* mysql: "^2.18.1"

Nota: phpmyadmin se emplea para verificar y/o realizar cambios en la base de datos y no es requerido para correr la SPA.

## Permisos de usuario correctamente configurados

En la siguiente Wiki ofrecida por la cátedra de la materia se detallan los primeros pasos para desplegar las dependencias y requerimientos de la SPA. [this link](https://github.com/ce-iot/daw-project-template/wiki).

# Estructura del proyecto

El proyecto se encuentra conformado principalmente por los siguientes elementos:

## Front:
index.html
ts:
Main.ts
MyFramework.ts
ViewMainPage.ts
static/images
Imagenes...

## Back:
index.js
mysql-connector.js

# Iniciando la Aplicación:

Cumpliendo con las prerequisitos y dependencias, el proyecto se puede iniciar haciendo:
```
    git clone https://github.com/gzocco/daw-project.git
    cd daw-project
    docker-compose up
```

Luego, se accede a la SPA desde: http://localhost:8000/?#!

# Verificaciones de la API Rest en Backend:
Se realizaron mediante la herramienta curl, como se detalla a continuación:

## Método create:
```
gzocco@gdansk:~$ curl -d '{"name":"NameEx","description":"DescEx","state":"0","type":"1"}' -H 'Content-Type: application/json' http://localhost:8000/devices/create
{"fieldCount":0,"affectedRows":1,"insertId":10,"serverStatus":2,"warningCount":0,"message":"","protocol41":true,"changedRows":0}
```

## Método delete por id:
```
gzocco@gdansk:~$ curl -d '{"id":"10"}' -H 'Content-Type: application/json' http://localhost:8000/devices/delete
{"fieldCount":0,"affectedRows":1,"insertId":0,"serverStatus":2,"warningCount":0,"message":"","protocol41":true,"changedRows":0}
 ```

## Método update state por id:
```
gzocco@gdansk:~$ curl -d '{"id":1,"state":0}' -H 'Content-Type: application/json' http://localhost:8000/devices
{"fieldCount":0,"affectedRows":1,"insertId":0,"serverStatus":2,"warningCount":0,"message":"(Rows matched: 1  Changed: 1  Warnings: 0","protocol41":true,"changedRows":1}
```

## Método read de la totalidad de los campos de todos los devices:
```
gzocco@gdansk:~$ curl http://localhost:8000/devices
[{"id":1,"name":"Lampara 1","description":"Luz living","state":1,"type":0},{"id":2,"name":"Lampara 2","description":"Luz cocina","state":0,"type":0},{"id":3,"name":"Velador","description":"Velador living","state":0,"type":0},{"id":4,"name":"Persiana 1","description":"Persiana living","state":1,"type":1},{"id":5,"name":"Persiana 2","description":"Persiana de la cocina","state":1,"type":1},{"id":6,"name":"Persiana 3","description":"Persiana balcon","state":0,"type":1},{"id":9,"name":"Dispo Prueba ","description":"Es persiana","state":0,"type":1}]
```

## Método read de un device por id:
```
gzocco@gdansk:~$ curl http://localhost:8000/devices/1
[{"id":1,"name":"Lampara 1","description":"Luz living","state":1,"type":0}]
```


## Licence

This project is published under GPLV3+ licence.

![footer](doc/footer.png)

