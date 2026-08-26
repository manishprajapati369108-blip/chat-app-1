import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import fetchUsers from "./routes/fetchUsers.js";
import authMiddleware from "./middleware/authMiddle.js";

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:4000",
    credentials: true,
  }),
);

app.use("/auth", authRoutes);
app.use("/api", authMiddleware, fetchUsers);

export default app;
