// import { SubscriberInfoModel } from "./models/subscriberInfo";
import express, { Application, Request } from "express";
import router from "./routes";

const mongoSantize = require("express-mongo-sanitize");
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import bodyParser from "body-parser";
import cors from "cors";
class Server {
  public app: Application;

  private limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000,
  });

  private routes(): void {
    this.app.use("/api", router);
  }

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.databaseConnect();
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(bodyParser.json());
    this.app.use(mongoSantize());
    this.app.use("/js", express.static("public"));
    this.app.use(helmet());
    this.app.use(cors<Request>());
    this.app.use((req, res, next) => {
      next();
    });
  }

  private async databaseConnect(): Promise<void> {
    try {
      // await this.connectDB();
      this.startServer();
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }
  private startServer(): void {
    const PORT = process.env.PORT || 3002;

    this.app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
}

const server = new Server();
