import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import * as database from "./config/database";
dotenv.config();

const app: Express = express();
const port: number | string= process.env.PORT || 3000;

database.connect();
import mainV1Routes from "./api/v1/routes/index.route";
mainV1Routes(app)
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});