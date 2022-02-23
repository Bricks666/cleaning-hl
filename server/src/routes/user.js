import { Router } from "express";
import { UserController } from "../controllers";
import { accessVerify } from "../middlewares";

const router = Router();

router.get("/", accessVerify, UserController.getUser);

export default router;
