import { Request, Response, Router } from "express";
import { HelloWorldService } from "../services/commonService";

const router = Router();
const helloWorldService = new HelloWorldService();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: helloWorldService.getHello() });
});

export default router;
