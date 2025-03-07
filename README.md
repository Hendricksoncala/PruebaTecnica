A continuación encontrarás un **README** completo que describe el proyecto de gestión de películas y usuarios, incluyendo la configuración de la base de datos, los endpoints disponibles, ejemplos de uso y requisitos cumplidos. Puedes adaptar la redacción o secciones según prefieras.

---

# Movies Management API

Este repositorio contiene la solución a la prueba técnica para un servicio de gestión de películas, usuarios y sus películas vistas.

## Tecnologías utilizadas

- **Node.js** como entorno de ejecución
- **Express** para la creación de endpoints
- **MySQL** (o la base de datos relacional de tu preferencia)
- **Thunder Client / Postman** para pruebas locales
- **Railway** para despliegue

## Contenido del repositorio

1. **Modelo Relacional y Script de Base de Datos**  
   - Se incluyen las tablas:  
     - **Categories** (categorías precargadas: Terror, Suspenso, Drama, Comedia, Action, Romance, etc.)  
     - **Movies** (almacena películas con un `releaseDate` y un `categoryId`)  
     - **Users** (almacena usuarios con `name`, `email`, `password`)  
     - **WatchedMovies** (tabla intermedia para marcar qué usuario ha visto qué película)  
   - El script de creación de tablas (`init.sql`) o la creación manual se explica en la carpeta `docs` (o en la sección correspondiente).

2. **Endpoints y Estructura del Código**  
   - **routes/**: Define los endpoints de la API (por ejemplo, `moviesRoutes.js`, `usersRoutes.js`).  
   - **controllers/**: Lógica para cada endpoint (e.g. `moviesController.js`, `usersController.js`).  
   - **services/**: Contiene la lógica de negocio (e.g. `moviesService.js`, `usersService.js`).  
   - **repositories/**: Acceso directo a la base de datos con consultas SQL (e.g. `moviesRepository.js`, `usersRepository.js`).  

3. **Ejemplos de uso**  
   - Ejemplos de peticiones (body, métodos, endpoints) para crear, leer, actualizar, eliminar y filtrar datos.

---

## Requisitos Cumplidos

A continuación se detallan los requerimientos de la prueba y cómo se cumplen en este proyecto:

1. **Tener datos precargados de categorías en la base de datos**  
   - La tabla **Categories** incluye categorías como: `Terror, Suspenso, Drama, Comedia, Action, Romance, etc.`  
   - Esto permite asignar una categoría a cada película.

2. **Crear un usuario**  
   - Endpoint: **`POST /users`**  
   - Ejemplo de Body (JSON):
     ```json
     {
       "name": "Alice",
       "email": "alice@example.com",
       "password": "secret123"
     }
     ```
   - Respuesta exitosa:
     ```json
     {
       "id": 1,
       "name": "Alice",
       "email": "alice@example.com"
     }
     ```

3. **Crear una película con su respectiva categoría**  
   - Endpoint: **`POST /movies`**  
   - Ejemplo de Body (JSON):
     ```json
     {
       "title": "Fast & Furious",
       "description": "An action-packed movie...",
       "releaseDate": "2023-07-15",
       "categoryName": "Action"
     }
     ```
   - El backend convierte `categoryName` a un `categoryId` y crea la película.

4. **Obtener un listado de películas**  
   - Endpoint: **`GET /movies`**  
   - Devuelve todas las películas, con opción de **filtros**, **paginación** y **orden** (según lo implementado).

5. **Filtrar las películas por título y categoría**  
   - **Título**: Ejemplo: `GET /movies?title=Furious` (si se usa un query param `title`)  
   - **Categoría**: Ejemplo: `GET /movies?category=Action`  
   - **Ambos** (según la lógica implementada).

6. **Paginación y orden (fecha de estreno de más reciente a más antigua)**  
   - Ejemplo: `GET /movies?page=1&limit=5&order=DESC`  
   - Ajusta la consulta para devolver los resultados paginados y ordenados.

7. **Endpoint para obtener el listado de novedades**  
   - Una película es novedad si su `releaseDate` es inferior a 3 semanas.  
   - Endpoint: **`GET /movies/recent`**  
   - Devuelve películas con `releaseDate >= (CURDATE() - INTERVAL 3 WEEK)`.

8. **Endpoint para marcar como vista una película por determinado usuario**  
   - Existen dos variantes:  
     1. **Por ID**: `POST /users/:userId/watched` (enviando `{ "movieId": 5 }` en el body).  
     2. **Por título y nombre de usuario**: `POST /users/:username/:movieTitle` (para una experiencia más “friendly”).  
   - Ejemplo de Body (por ID):
     ```json
     {
       "movieId": 5
     }
     ```

9. **Endpoint para listar usuarios con las películas que han visto**  
   - Endpoint: **`GET /users/watched`**  
   - Devuelve un array con cada usuario y la lista de películas vistas, por ejemplo:
     ```json
     [
       {
         "userId": 1,
         "name": "Alice",
         "watchedMovies": "Fast & Furious, Action Reloaded"
       },
       {
         "userId": 2,
         "name": "Bob",
         "watchedMovies": null
       }
     ]
     ```

10. **Entrega**  
    - Todo el código se encuentra estructurado en carpetas:  
      - **routes**: Define endpoints  
      - **controllers**: Lógica de cada endpoint  
      - **services**: Lógica de negocio (transformaciones, validaciones, etc.)  
      - **repositories**: Acceso directo a la base de datos (consultas SQL)  
      - **docs** (opcional): Modelo relacional, script SQL, etc.

---

## Ejemplos de Peticiones

A continuación, se listan algunos ejemplos clave de peticiones con **Thunder Client** o **Postman**:

1. **Crear usuario**  
   - **Método**: POST  
   - **URL**: `http://localhost:3000/users`  
   - **Body (JSON)**:
     ```json
     {
       "name": "Charlie",
       "email": "charlie@example.com",
       "password": "secret789"
     }
     ```

2. **Crear película**  
   - **Método**: POST  
   - **URL**: `http://localhost:3000/movies`  
   - **Body (JSON)**:
     ```json
     {
       "title": "Inception",
       "description": "A mind-bending thriller",
       "releaseDate": "2010-07-16",
       "categoryName": "Science Fiction"
     }
     ```

3. **Obtener películas (con filtros)**  
   - **Método**: GET  
   - **URL**: `http://localhost:3000/movies?title=Inception&category=Science%20Fiction&order=DESC&page=1&limit=5`

4. **Novedades (últimas 3 semanas)**  
   - **Método**: GET  
   - **URL**: `http://localhost:3000/movies/recent`

5. **Marcar película como vista (por IDs)**  
   - **Método**: POST  
   - **URL**: `http://localhost:3000/users/1/watched`  
   - **Body (JSON)**:
     ```json
     {
       "movieId": 3
     }
     ```

6. **Marcar película como vista (por nombres)**  
   - **Método**: POST  
   - **URL**: `http://localhost:3000/users/Alice/Inception`  
   - (Sin body, asumiendo que el endpoint parsea `username` y `movieTitle` de la URL)

7. **Listar usuarios con sus películas vistas**  
   - **Método**: GET  
   - **URL**: `http://localhost:3000/users/watched`

---

## Contribución y Despliegue

1. **Clonar el repositorio** y correr `npm install`.
2. **Configurar** variables de entorno (`.env`) para la base de datos.
3. **Crear tablas** usando `init.sql` o scripts en la carpeta `docs`.
4. **Correr** `npm run start` para modo desarrollo 
5. **Opcional**: Desplegar en Railway (ajustando la base de datos en la nube).

---
# Variables de entorno necesarias

- `MYSQL_HOST`: Host de la base de datos.
- `MYSQL_PORT`: Puerto de la base de datos.
- `MYSQL_DATABASE`: Nombre de la base de datos.
- `MYSQL_USER`: Usuario de la base de datos.
- `MYSQL_PASSWORD`: Contraseña de la base de datos.
- `PORT`: Puerto en el que se ejecutará la aplicación.
## Licencia

Este proyecto es solo de referencia para la prueba técnica. 
solo puede ser usado por:
 Campuslands
 Kubo S.A.S

---
