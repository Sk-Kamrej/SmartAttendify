import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes/index.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Test Route
app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Welcome to SmartAttendify API 🚀",
  });
});

// API Routes
app.use("/api/v1", routes);

// Global Error Handler
app.use(errorMiddleware);

export default app;