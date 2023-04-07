import express from "express";
import resourceRouter from "./routes/resource.js";
import authRouter from "./routes/auth.js";
import analyticsRouter from "./routes/analytics.js";
import errorHandler from "./middleware/errorHandler.js";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import { connectDB } from "./config/db.js";
import helmet from "helmet";
import cors from "cors";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
const envFile =
  process.env.NODE_ENV === "local" ? ".env.local" : ".env.production";
dotenv.config({ path: envFile });
const app = express();
connectDB();
app.use(
  cors({
    origin: process.env.CLIENT_URI,
    credentials: true,
  })
);
app.use(limiter);
app.use(helmet());
app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));

const PORT = 5000 || process.env.PORT;
app.use("/api/analytics/", analyticsRouter);
app.use("/api/resource/", resourceRouter);
app.use("/api/auth/", authRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
