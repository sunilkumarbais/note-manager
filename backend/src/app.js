import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import noteRoute from "./routes/noteRoute.js"
import authRoute from "./routes/authRoute.js"
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "https://notes-manager-01.netlify.app/",
  credentials: true
}));

// API ROUTES //
app.use("/api/notes", noteRoute);
app.use("/api/auth", authRoute);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;  