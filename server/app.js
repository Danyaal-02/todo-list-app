import express from "express";
import cookieParser from "cookie-parser";
import { createClient } from "@supabase/supabase-js";
import cors from "cors";
import morgan from "morgan";
import { config } from "dotenv";
import userRoutes from "./routes/user.route.js";
import todoRoutes from "./routes/todo.route.js";
config();

const app = express();

const corsOptions = {
  origin: [process.env.FE_URL],
  credentials: true,
};

app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors(corsOptions));

export const supabaseConfig = {
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseKey: process.env.SUPABASE_ANON_KEY,
};
export const supabase = createClient(
  supabaseConfig.supabaseUrl,
  supabaseConfig.supabaseKey
);
try {
  if (supabase) {
    console.log("supabase connected");
  }
} catch (error) {
  console.log("supabase not connected");
}

app.get("/", (req, res) => {
  res.send("server is healthy and working");
});

app.use("/api/v1/", userRoutes);
app.use("/api/v1/todos", todoRoutes);

export default app;
