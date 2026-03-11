import axios from "axios";
import * as cheerio from "cheerio";

export async function searchOponeo(size: string) {
  try {
    const normalizedSize = size.replace(/\//g, "-").toLowerCase();
    const url = `https://www.oponeo.it/pneumatici/${normalizedSize}`;

    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const $ = cheerio.load(data);
    const results: Array<{
      shop: string;
      brand: string;
      model: string;
      price: string;
      link: string;
    }> = [];

    $(".product, .product-item, article").each((_, el) => {
      const text = $(el).text().replace(/\s+/g, " ").trim();

      const brand =
        $(el).find(".brand").first().text().trim() ||
        $(el).find("[class*=brand]").first().text().trim();

      const model =
        $(el).find(".model").first().text().trim() ||
        $(el).find("[class*=model]").first().text().trim();

      const price =
        $(el).find(".price").first().text().trim() ||
        $(el).find("[class*=price]").first().text().trim();

      const href = $(el).find("a[href]").first().attr("href") || "";
      const link = href
        ? href.startsWith("http")
          ? href
          : `https://www.oponeo.it${href}`
        : "";

      if ((brand || text) && price) {
        results.push({
          shop: "Oponeo",
          brand: brand || "N/D",
          model: model || text.slice(0, 120),
          price,
          link
        });
      }
    });

    return results;
  } catch (error) {
    console.error("Oponeo scraping error:", error);
    return [];
  }
}