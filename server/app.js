import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import memberRoutes from "./routes/memberRoutes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://phase-7-1.onrender.com",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/api/projects", projectRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to CollabSphere API!",
    status: "success",
  });
});

app.use("/api/auth", authRoutes);

export default app;
