# Backend with Node.js

## Introduction

- Node.js. Conceptos básicos. Asynchronous programming. Event loop.
- NPM. Package.json. Instalación de paquetes.
- Proyecto inicial: TS + ESLint + Prettier + Jest
- [Nodemon](https://nodemon.io/). Node --watch.
- Http server solo con Node.js
  
- Variables de entorno
  - [Cross-env](https://www.npmjs.com/package/cross-env)
  - [Dotenv](https://www.npmjs.com/package/dotenv)
  - Node native [--env-file](https://nodejs.org/en/learn/command-line/how-to-read-environment-variables-from-nodejs)

- File System. Callbacks v. Promises
  - [fs](https://nodejs.org/api/fs.html)
  - JSON files. Añadir elementos. CRUD
  
- Consola con Node
  - [Commander](https://www.npmjs.com/package/commander)
  - [Inquirer](https://www.npmjs.com/package/inquirer)

## Express

- [Express.js](https://expressjs.com/). Conceptos básicos. Middlewares.
- Instalación
- Incorporación en un servidor HTTP. Alternativa (sólo express)
- Rutas básicas. Pruebas desde [Postman](https://www.postman.com/).

- Configuración adicional: middleware
  - [Morgan](https://www.npmjs.com/package/morgan)
  - [Helmet](https://www.npmjs.com/package/helmet) o
  - [Cors](https://www.npmjs.com/package/cors)
  - Middleware nativo: `app.use(express.json())`
  - Middleware personalizado
  - static
  
- Arquitectura en capas
  - models (entities)
  - routers
  - controllers
  - repositories


## Express. Arquitectura. Gestión de Errores. Testing. Validación

- Revisamos la arquitectura en capas
  - models (entities)
  - routers (como clase)
  - controllers
  - repositories (fileSystemRepository)
  - app (Instancia Router, Controller y Repositorio)

- Repositorio de datos - JSON FileSystem

- Middleware de errores

- Validación de datos con [Joi](https://joi.dev/)
  - Ejemplo para la validación con Joi

- Testing con [Jest](https://jestjs.io/)
  - controller y repositorios
  - router y app (test de humo)

- Publicación (Deploy) en [Render](https://render.com/)
