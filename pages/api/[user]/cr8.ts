// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import connect from "../../../backend/lib/connectdb";
import Link from "../../../backend/models/schema";
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
      const cr8 = new Link({
        identifier,
        title,
        url,
        categories,
        bookmarked,
        time,
      });
      const savedCr8tn = cr8.save();
      console.log("Cte", categories);

      res.status(200).json({
        status: "Saved",
        data: savedCr8tn,
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
