const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Documentation Memento",
            version: "1.0.0",
            description: "API documentation for the backend projec",
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