import getTitleFromUrl from "@utils/helpers/getTitleFromUrl";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { url } = req.body;
    if (!url) {
      return new Response("Missing url", { status: 400 });
    }
    const title = await getTitleFromUrl(url);
    return new Response(JSON.stringify(title), { status: 200 });
  } else {
    return new Response(`Method ${req.method} Not Allowed`, { status: 405 });
  }
}
