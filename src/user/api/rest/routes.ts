import { Router } from "express";
import {
  getUserApi,
  createUserApi,
  updateUserApi,
  deleteUserApi,
} from "./handler";
import { jsonParser } from "../../../libs/parser";

export const router = Router();

/* GET programming language */
router.get("/:id", jsonParser, getUserApi);

/* POST programming language */
router.post("/", jsonParser, createUserApi);

/* PUT programming language */
router.put("/:id", jsonParser, updateUserApi);

/* DELETE programming language */
router.delete("/:id", deleteUserApi);

export default router;
