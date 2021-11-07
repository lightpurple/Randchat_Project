const swaggerUi = require("swagger-ui-express");
const swaggereJsdoc = require("swagger-jsdoc");
const options = {
    swaggerDefinition: {
        info: {
            title: "Random Chat API",
            version: "1.0.0",
            description: "Random Chat API with Swagger",
        },
        host: "localhost:5000",
        basePath: "/",
    },
    apis: ["./routes/*.js"],
};
const specs = swaggereJsdoc(options);
module.exports = { swaggerUi, specs };
