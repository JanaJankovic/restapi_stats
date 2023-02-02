const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");

var app = express();

/**CORS ERRORS------------------------------------------- */
app.use(bodyParser.json());
var cors = require("cors");
var allowedOrigins = [
  "http://localhost:4200",
  "http://localhost:4300",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "http://studentdocker.informatika.uni-mb.si:3742",
];

app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    return res.status(200).json({});
  }
  next();
});
/**CORS ERRORS------------------------------------------- */

// import routes
const statsRoute = require("./routes/stats");

app.use("/stats", statsRoute);

console.log("here");
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

mongoose.connect(
  process.env.DB_CONNECTION,
  { dbName: process.env.DB, useNewUrlParser: true },
  () => {
    console.log("connected");
  }
);

// listening port
app.listen(process.env.PORT);
