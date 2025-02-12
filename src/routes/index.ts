import { Router } from "express";
import commonController from "./commonRoute";
const router = Router();

router.use("/v1", commonController);

export default router;
