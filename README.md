# Memento Backend

## Descripción
Este repositorio contiene el backend de **Memento**, una aplicación diseñada para la gestión de eventos. El backend se desarrolló utilizando Node.js con Express y se conecta a una base de datos MongoDB para garantizar un rendimiento óptimo y escalabilidad.

## Decisiones Técnicas

### Arquitectura: Hexagonal

La arquitectura Hexagonal, también conocida como Arquitectura de Puertos y Adaptadores, se eligió para estructurar el backend por las siguientes razones:

1. **Separación de responsabilidades**: Facilita el mantenimiento y escalabilidad del proyecto al separar la lógica de negocio de las interfaces externas (como bases de datos, APIs, etc.). Esto permite que la lógica de negocio sea independiente de los detalles de implementación.
2. **Flexibilidad**: Permite cambiar las dependencias externas (como bases de datos o servicios externos) sin afectar la lógica de negocio. Esto se logra mediante el uso de puertos y adaptadores.
3. **Testabilidad**: Facilita la realización de pruebas unitarias y de integración al permitir que la lógica de negocio se pruebe de manera aislada de las dependencias externas.
4. **Escalabilidad**: Facilita la adición de nuevas funcionalidades y la integración con otros servicios sin afectar las ya existentes.

#### Organización del proyecto:

- **config/**: Contiene archivos de configuración, como la conexión a la base de datos.
- **controllers/**: Contiene los controladores que manejan la lógica de negocio y procesan las solicitudes entrantes.
- **models/**: Contiene los esquemas y modelos de datos definidos con Mongoose para MongoDB.
- **routes/**: Define las rutas disponibles en el backend y redirige las solicitudes al controlador correspondiente.
- **middlewares/**: Incluye funciones reutilizables, como la verificación de tokens JWT.
- **services/**: Contiene la lógica de negocio de la aplicación.
  - `userService.js`: Lógica de negocio relacionada con usuarios.
  - `eventService.js`: Lógica de negocio relacionada con eventos.
- **repositories/**: Contiene la lógica de acceso a datos.
  - `userRepository.js`: Acceso a datos para usuarios.
  - `eventRepository.js`: Acceso a datos para eventos.
- **utils/**: Contiene utilidades y funciones auxiliares.
  - `jwtUtils.js`: Funciones para manejar JWT.
- **tests/**: Contiene las pruebas unitarias.
  - `userController.test.js`: Pruebas para el controlador de usuarios.
  - `eventController.test.js`: Pruebas para el controlador de eventos.

### Autenticación con JWT y uso de `cookie-parser`

#### ¿Por qué usar JWT?
1. **Seguridad**: JWT permite una autenticación segura mediante la generación de tokens únicos para cada usuario autenticado.
2. **Sin estado (stateless)**: Reduce la carga en el servidor al no almacenar sesiones.
3. **Escalabilidad**: Facilita la integración con otros servicios al ser un estándar ampliamente adoptado.

#### Uso de `cookie-parser`
El middleware `cookie-parser` se utiliza para almacenar y gestionar el token JWT en cookies por las siguientes razones:

1. **Simplicidad en el manejo del token**: Almacenar el JWT en una cookie permite accederlo fácilmente en cada solicitud sin tener que manejar manualmente los encabezados.
2. **Mayor control**: Facilita establecer opciones como el tiempo de expiración, la protección contra accesos de terceros (`HttpOnly`), y el uso seguro (`Secure` para HTTPS).
3. **Compatibilidad con navegadores**: Permite una experiencia más fluida al almacenar automáticamente el token en las cookies sin requerir acciones explícitas por parte del cliente.

### Base de datos: MongoDB
Se eligió MongoDB debido a:
- **Flexibilidad**: Su modelo basado en documentos se adapta perfectamente a los datos dinámicos de eventos y usuarios.
- **Escalabilidad**: Ideal para aplicaciones modernas que pueden crecer rápidamente.
- **Integración con Node.js**: Mongoose ofrece una interfaz intuitiva para definir esquemas y realizar operaciones CRUD.

## Instalación
1. Clona el repositorio back:
   ```bash
   git clone https://github.com/CharlineMosquera/memento-backend.git
   ```
   Accede a la carpeta del proyecto
   ````bash
   cd memento-backend/
   ````
2. Instala las dependencias:
   ```bash
   # con npm
   npm install

   # con pnpm
   pnpm install
   ```
3. Crea un archivo `.env` en la raíz del proyecto, consulta `.env.example`:
   ```env
   PORT=your_preferred_port
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

   **Generación del Token JWT**

   El proyecto incluye un script que genera un **JWT secret** para asegurar la    autenticación. Puedes generar el token con el siguiente comando:
   ```bash
   node ./src/config/generateSecret.js
   ```
   Copiarlo en la consola y pegarlo en el archivo .env
4. Inicia el servidor backend:
   ```bash
   npm start
   # o con pnpm
   pnpm start
   ```

## Levantar el Frontend
1. Clona el repositorio front:
   ```bash
   git clone https://github.com/CharlineMosquera/memento-frontend.git
   ```
   Accede a la carpeta del proyecto
   ````bash
   cd memento-frontend/
   ````
2. Instala las dependencias:
   ```bash
   # con npm
   npm install

   # con pnpm
   pnpm install
   ```
3. Inicia el servidor frontend:
   ```bash
   npm start
   # o con pnpm
   pnpm start
   ```

## Endpoints principales
- **Autenticación**:
  - POST `/users/register`: Registrar un nuevo usuario.
  - POST `/users/login`: Iniciar sesión y recibir un token JWT.

- **Gestión de eventos**:
  - GET `/events`: Listar eventos con soporte para filtros.
  - POST `/events`: Crear un nuevo evento.
  - PUT `/events/:id`: Editar un evento existente.
  - DELETE `/events/:id`: Eliminar un evento.

## Documentación de la API (Swagger)
La API de Memento cuenta con documentación interactiva utilizando Swagger. La ruta para acceder a la documentación es:
   ```bash
   /api-docs
   ```

---

Este backend está diseñado para ser el núcleo robusto y seguro de la aplicación **Memento**, proporcionando servicios esenciales para la gestión de eventos.
