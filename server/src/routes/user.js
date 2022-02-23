import { Router } from "express";
import { UserController } from "../controllers";
import { accessVerify } from "../middlewares";

const router = Router();

router.get("/me", accessVerify, UserController.getUser);
router.get("/", accessVerify, UserController.getUsers);

export default router;
