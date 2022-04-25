const serverless = require("serverless-http");
const express = require("express");
const path = require("path");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load(path.join(__dirname, "../swagger.yaml"));
const people = require("./people");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from app serverless aws-zoluxiones!",
  });
});

app.get("/people", people.getPeople);

app.get("/people/:id", people.getPeopleId);

app.post("/people", people.addPeople);

app.use("/document", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res, next) => {
  return res.status(404).json({
    sucess: false,
    message: "Data not Found",
  });
});

module.exports.handler = serverless(app);
