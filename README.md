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

* Listado de dispositivos creado dinámicamente al cargar la SPA.
* Accionamiento de switches y persistencia del estado.
* Agregar un nuevo dispositivo con todos sus campos.
* Modificar información de dispositivos. (Solo despliegue de ventana y campos; sin funcionalidad)

## Backend:

    Métodos para:
    
- Obtener todos los campos de todos los dispositivos.
- Obtener todos los campos de un dispositivo por id.
- Crear un nuevo dispositivo.
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

Al final de este documento se incluye una guía indicando como instalar y configurar las requerimientos y dependencias del proyecto. [Instalación-de-dependencias-y-requisitos:]

## Configuración de Docker-compose

Se requiere un archivo docker-compose.yml con la configuración necesaria para inicar las imágenes y demás configuraciones (red) necesarias para el proyecto.


# Estructura del proyecto

El proyecto se encuentra conformado principalmente por los siguientes elementos:

## Front:
- index.html
- ts:
  - Main.ts
  - MyFramework.ts
  - ViewMainPage.ts
- static/images
  - Imagenes...

## Back:
- index.js
- mysql-connector.js


# Iniciando la Aplicación:

Cumpliendo con las prerequisitos y dependencias, el proyecto se puede iniciar haciendo:
```
    git clone https://github.com/gzocco/daw-project.git
    cd daw-project
    docker-compose up
```

Luego, se acceder a la SPA desde: http://localhost:8000/?#!


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


---


# Instalación de dependencias y requisitos:

### La instalación fue validada en la versión de Ubuntu:
```
lsb_release -a
No LSB modules are available.
Distributor ID: Ubuntu
Description:    Ubuntu 18.04.5 LTS
Release:        18.04
Codename:       bionic
```

### El proyecto se encuentra desplegado sobre imagenes en contenedore de Docker. Se instalará Docker a continuación:

1. Primero es necesario desinstalar otras versiones de Docker:

```    
sudo apt-get remove docker docker-engine docker.io containerd runc 
```    
    
2. Comenzar actualizando los repositorios del sistema con el siguiente comando.

```
sudo apt-get update 
```

3. Instalar las dependencias necesarias para Docker.

```
sudo apt-get install \ 
apt-transport-https \ 
ca-certificates \ 
curl \ 
gnupg-agent \ 
software-properties-common
```

4. Importar la clave GPG con el comando a continuación. 
```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - 
```
```
sudo apt-key fingerprint 0EBFCD88
```

5. Añadir el repositorio al sistema con el siguiente comando. 
```
sudo add-apt-repository \ 
"deb [arch=amd64] https://download.docker.com/linux/ubuntu \ $(lsb_release -cs) \ 
stable" 
```

6. Con los pasos anteriores realizados, actualizar nuevamente la lista de paquetes. 
```
sudo apt-get update 
```

7. Y ahora realizar la instalación de Docker CE con el siguiente comando. 
```
sudo apt-get install docker-ce docker-ce-cli containerd.io 
```

8. Configurar permisos 

Una vez que Docker ya se encuentra instalado, resta un paso importante, que es darle permisos al usuario para poder ejecutar comandos de Docker sin acceder a privilegios de super usuario (evita tener que correr los comandos de Docker con sudo). 

9. Crear el grupo Docker con el siguiente comando (puede ser que el grupo exista). 
```
sudo groupadd docker 
```

10. Añadir el grupo de Docker al usuario. 
```
sudo usermod -aG docker $USER 
sudo gpasswd -a $USER docker 
```

11. Reiniciar el servicio de Docker y proceder con Correr el Hello World!. 
```
sudo service docker restart 
```

12. Correr el Hello World! 
Para probar que la instalación de Docker se haya realizado correctamente ejecutar el "Hola mundo". Este comando descarga la imagen "hello-world" del repositorio oficial de imágenes Dockerhub y luego la ejecuta (convirtiéndola en container). 
```
sudo docker run hello-world 
```

### Instalación Docker Compose

Una vez que Docker se encuentra instalado es posible instalar Docker Compose con unos simples pasos. 

1. Comenzar descargando el ejecutable con el siguiente comando. 

```
sudo curl -L 
"https://github.com/docker/compose/releases/download/1.26.2/docker-compose -$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
``` 

2. Darle permisos de ejecución al binario descargado con el comando a continuación. 
```
sudo chmod +x /usr/local/bin/docker-compose 
```

```
$ docker-compose --version 
docker-compose version 1.26.2, build 1110ad01 
```

```
sudo reboot 
```

3. Luego de reiniciar el sistema Docker y Docker Compose se encuentran totalmente configurados. Para probar que las configuraciones de permisos se hayan realizado adecuadamente ejecutar nuevamente el Hello World sin permisos de super usuario con el siguiente comando. 
```
docker run hello-world
```

4. Hasta aqui se instaló y verificó el correcto funcionamiento de Docker y Docker-compose.


### Descarga e instalación de las imagenes de Docker necesarias para el proyecto

1. A continuación, se descargarán las imágenes de Docker necesarias para el proyecto.
```
docker pull harmish/typescript
docker pull mysql:5.7
docker pull phpmyadmin/phpmyadmin
docker pull abassi/nodejs-server:10.0-dev
```

2. Esperar a que termine de descargar las imagenes. Una vez que finaliza, se puede clonar el repositorio del proyecto e iniciarlo mediante:

``` 
git clone https://github.com/gzocco/daw-project.git
cd daw-project
docker-compose up
```

3. Luego, se accede a la SPA desde: http://localhost:8000/?#!





#### Nota: Información obtenida y en partcialmente modificada de la documentación ofrecida por la cátedra y de [this link](https://github.com/ce-iot/daw-project-template/wiki).

## Licence

This project is published under GPLV3+ licence.

![footer](doc/footer.png)

