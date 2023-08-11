import { Express } from "express";
import { userRouter } from "./user/api";
import { mailerRouter } from "./mailer/api";

// Routing reference
// https://stackoverflow.com/questions/23332317/hierarchical-routing-with-plain-express-js

export const registerRestApi = (app: Express) => {
  app.use("/users", userRouter);
  app.use("/mailer", mailerRouter);
};
