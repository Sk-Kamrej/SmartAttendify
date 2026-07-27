import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

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

export default app;
