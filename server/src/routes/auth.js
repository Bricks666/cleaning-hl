import { Router } from "express";
import { AuthController } from "../controllers/auth";

const router = Router();

router.post("/login", AuthController.login);
router.put("/registration", AuthController.registration);

export default router;
