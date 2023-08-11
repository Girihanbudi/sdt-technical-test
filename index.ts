import express, { Express } from "express";
import dotenv from "dotenv";
import { registerRestApi } from "./src/registar";
import cron from "node-cron";
import CronList from "./src/cronjob";

dotenv.config();

// Run a cron list
CronList.forEach((setting) => cron.schedule(setting.format, setting.task));

const app: Express = express();
const port = process.env.APP_PORT;

registerRestApi(app);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
