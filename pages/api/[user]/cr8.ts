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
  await runMiddleware(req, res, cors);

  try {
    await connect();
    const cr8 = new Link({
      identifier: req.body.identifier,
      title: req.body.title,
      url: req.body.url,
      category: req.body.category,
      bookmarked: req.body.bookmarked,
      time: req.body.time,
    });
    const savedCr8tn = cr8.save();

    res.json(savedCr8tn);
  } catch (error) {
    res.json(error);
  }
}
