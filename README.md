# Paypals

## Integrantes
| Nombre                                                   | Padron | Email                |
|----------------------------------------------------------|--------|----------------------|
| [Francisco Orquera Lorda](https://github.com/gcc-florda) | 105554 | forquera@fi.uba.ar   |
| [Carolina Di Matteo](https://github.com/gcc-cdimatteo)   | 103963 | cdimatteo@fi.uba.ar  |
| [Federico Jaleh](https://github.com/Ezjafe)              | 105553 | fjaleh@fi.uba.ar     |
| [Tomás Apaldetti](https://github.com/Tomas-Apaldetti)    | 105157 | tapaldetti@fi.uba.ar |
| [Lucia Napoli](https://github.com/napoli-lucia)          | 101562 | lnapoli@fi.uba.ar    |

## Correr el proyecto

### Pre-Requisitos
- Node.JS 20.0
- Docker

### Variables de Entorno
Antes de instalar y correr el programa se debe configurar las variables de entorno

### Docker
En el directorio de docker, realizar una copia del archivo `.env template`, cambiandole el nombre a `.env`
- `FRONTEND_PORT`= El puerto que usara el frontend para recibir peticiones. Recomendado `3000`
- `BACKEND_PORT`= El puerto que usara el backend para recibir peticiones. Recomendado `5000`
- `MONGO_PORT`= El puerto que usara mongo para recibir peticiones. Recomendado `27017`
- `MONGO_USER`= El root user de Mongo. Defaults to: `root`
- `MONGO_PWD`= La contraseña del root user. Defaults to: `root`

### Backend
En el directorio del backend, realizar una copia del archivo `.env template`, cambiandole el nombre a `.env`
Completar la variables de entorno requeridas
 - `PORT` : El puerto donde recibira peticiones el backend. Se debe completar `BACKEND_PORT` con los mismos valores que el `.env` de docker
 - `MONGODB_URL`: La string de conexion a la base de datos MongoDB. Se debe completar `MONGO_PORT`, `MONGO_USER`, y `MONGO_PWD` con los mismos valores que el `.env` de docker

### Frontend
En el directorio del frontend, realizar una copia del archivo `.env template`, cambiandole el nombre a `.env`
- `PORT` : El puerto donde recibira peticiones el frontend. Se debe completar `FRONTEND_PORT` con los mismos valores que el `.env` de docker
- `REACT_APP_BACKEND_URL`= Direccion del backend. Defaults to: http://localhost:BACKEND_PORT donde `BACKEND_PORT` es el valor dentro del `.env` de docker

### Comandos
Una vez completados las variables de entorno, dentro del directorio principal.
```bash
npm run setup
```

```bash
npm run start:build
```

Una vez los contenedores terminaron de inicializar, la aplicacion estara disponible en `http://localhost:FRONTEND_PORT`
