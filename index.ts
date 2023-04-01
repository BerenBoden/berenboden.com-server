import express from "express";
import resourceRouter from "./routes/resource.js";
import authRouter from "./routes/auth.js";
import errorHandler from "./middleware/errorHandler.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = 5000 || process.env.PORT;
app.use("/api/resource/", resourceRouter);
app.use("/api/auth/", authRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
