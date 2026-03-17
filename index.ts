import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import * as database from "./config/database";
dotenv.config();
var cors = require('cors')
const app: Express = express();
const port: number | string= process.env.PORT || 3000;
const bodyParser = require('body-parser')
app.use(bodyParser.json())
database.connect();
import mainV1Routes from "./api/v1/routes/index.route";
mainV1Routes(app)
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});