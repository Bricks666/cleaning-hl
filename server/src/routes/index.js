import { Router } from "express";
import authRouter from "./auth";
import userRouter from "./user";
import offerRouter from "./offers";

export const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
/*router.use("/cars");*/
router.use("/offers", offerRouter);
