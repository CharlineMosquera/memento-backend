const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Documentación de la API de Memento",
            version: "1.0.0",
            description: `
## Bienvenido a la documentación de la API de Memento

Esta API proporciona funcionalidades para gestionar usuarios y eventos en la plataforma Memento.

### Funcionalidades:

- **Usuarios**: Registro, inicio de sesión, cierre de sesión, y gestión de usuarios.
- **Eventos**: Creación, actualización, eliminación y visualización de eventos.

Utiliza las rutas documentadas a continuación para interactuar con la API.
            `,
            license: {
                name: "MIT",
                url: "https://opensource.org/licenses/MIT"
            }
        },
        servers: [
            {
                url: "http://localhost:5000",
                description: "Servidor de desarrollo",
            },
        ],
    },
    apis: ["./src/routes/*.js"],
};

export default swaggerOptions;