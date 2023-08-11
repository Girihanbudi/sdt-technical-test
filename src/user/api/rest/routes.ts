import { Router } from "express";
import { createUserApi, updateUserApi, deleteUserApi } from "./handler";
import { jsonParser } from "../../../libs/parser";

export const router = Router();

/* POST programming language */
router.post("/", jsonParser, createUserApi);

/* PUT programming language */
router.put("/:id", jsonParser, updateUserApi);

/* DELETE programming language */
router.delete("/:id", deleteUserApi);

export default router;
