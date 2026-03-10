import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import searchRoutes from "./routes/search.routes.js";

dotenv.config();

const app = express();

const PORT = Number(process.env.PORT || 3001);
const APP_ORIGIN = process.env.APP_ORIGIN || "*";

app.use(cors({ origin: APP_ORIGIN }));
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    app: "Pneusfinder API",
    version: "v11",
    status: "ok"
  });
});

app.use("/api", searchRoutes);

process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled rejection:", reason);
});

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Pneusfinder API avviata sulla porta ${PORT}`);
});

server.on("error", (err) => {
  console.error("Server error:", err);
  process.exit(1);
});