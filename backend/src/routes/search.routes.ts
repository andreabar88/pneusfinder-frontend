import { Router } from "express";
import { searchOponeo } from "../adapters/oponeo.adapter.js";

const router = Router();

router.get("/shops", (_req, res) => {
  res.json({
    success: true,
    shops: [
      { name: "Oponeo", enabled: true },
      { name: "Pneumaticileader", enabled: true },
      { name: "Gommedinamica", enabled: false },
      { name: "Amazon", enabled: false }
    ]
  });
});

router.get("/search", async (req, res) => {
  const size = String(req.query.size || "").trim();
  const season = String(req.query.season || "").trim();
  const brand = String(req.query.brand || "").trim();

  if (!size) {
    return res.status(400).json({
      success: false,
      error: "Parametro size obbligatorio"
    });
  }

  try {

    const oponeoResults = await searchOponeo(size);

    return res.json({
      success: true,
      query: { size, season, brand },
      shops_used: ["Oponeo"],
      count_raw_offers: oponeoResults.length,
      count_products: oponeoResults.length,
      results: oponeoResults
    });

  } catch (error) {

    console.error("Search error:", error);

    return res.status(500).json({
      success: false,
      error: "Errore durante la ricerca"
    });

  }
});

export default router;