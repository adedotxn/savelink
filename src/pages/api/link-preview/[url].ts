import cheerio from "cheerio";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = req.query.url as string;

  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const title = $("head title").text().trim();
    const description =
      $('head meta[name="description"]').attr("content") || "";
    const image =
      $('head meta[property="og:image"]').attr("content") ||
      $('head meta[name="twitter:image:src"]').attr("content") ||
      "";
    res.json({ title, description, image });
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to fetch link preview");
  }
}
