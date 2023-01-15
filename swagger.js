const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "API for Order Service Statistics",
    description: "Documentation for Order Service Statistics",
  },
  host: "localhost:4000",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./app.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
