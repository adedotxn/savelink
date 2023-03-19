// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import connect from "@db/lib/connectdb";
import Link from "@db/models/schema";
import Cors from "cors";

const cors = Cors({
  origin: "*",
});

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await runMiddleware(req, res, cors);
    const { identifier, title, url, categories, bookmarked, time } = req.body;

    try {
      await connect();
      const save = new Link({
        identifier,
        title,
        url,
        categories,
        bookmarked,
        time,
      });
      const saved = save.save();

      res.status(200).json({
        status: "success",
        data: saved,
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  } else {
    res.status(400).send({
      error: "Wrong request method",
    });
  }
}
