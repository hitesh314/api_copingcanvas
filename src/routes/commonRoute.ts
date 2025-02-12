import { Router } from "express";
import helloWorldController from "../controllers/commonController";

const commonRoute = Router();

commonRoute.use("/hello", helloWorldController);

export default commonRoute;
