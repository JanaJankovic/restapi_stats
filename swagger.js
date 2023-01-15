const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "API for Order Service Statistics",
    description: "Documentation for Order Service Statistics",
  },
  host: "https://order-stats.herokuapp.com/doc",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./app.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
