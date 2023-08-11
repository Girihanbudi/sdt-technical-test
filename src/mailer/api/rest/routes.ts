import { Router } from "express";
import { sendMailApi } from "./handler";
import { jsonParser } from "../../../libs/parser";

export const router = Router();

/* POST programming language */
router.post("/send", jsonParser, sendMailApi);
