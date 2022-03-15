import { Router } from "express";
import { accessVerify } from "../middlewares";
import { CarsControllers } from "../controllers";

const router = Router();

router.get("/", accessVerify, CarsControllers.getCars);
router.put("/add", accessVerify, CarsControllers.addCar);

export default router;
