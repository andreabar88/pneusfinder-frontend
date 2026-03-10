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

app.listen(PORT, () => {
  console.log(`Pneusfinder API avviata sulla porta ${PORT}`);
});