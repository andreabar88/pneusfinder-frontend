import { Router } from "express";

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

router.get("/search", (req, res) => {
  const size = String(req.query.size || "").trim();
  const season = String(req.query.season || "").trim();
  const brand = String(req.query.brand || "").trim();

  if (!size) {
    return res.status(400).json({
      success: false,
      error: "Parametro size obbligatorio"
    });
  }

  return res.json({
    success: true,
    query: { size, season, brand },
    shops_used: ["Oponeo", "Pneumaticileader"],
    count_raw_offers: 0,
    count_products: 0,
    results: []
  });
});

export default router;