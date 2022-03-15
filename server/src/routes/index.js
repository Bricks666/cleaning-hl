import { Router } from "express";
import authRouter from "./auth";
import userRouter from "./user";
import offerRouter from "./offers";
import carsRouter from "./cars";
import votesRouter from "./votes";

export const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/cars", carsRouter);
router.use("/offers", offerRouter);
router.use("/votes", votesRouter);
