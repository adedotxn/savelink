// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import connect from "../../../backend/lib/connectdb";
import Link from "../../../backend/models/schema";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    await connect();
    const session = await unstable_getServerSession(req, res, authOptions);

    // if (session) {
    try {
      const { user } = req.query;
      const specificLink = await Link.find({ identifier: `${user}` }).sort({
        time: -1,
      });
      res.json(specificLink);
      return;
    } catch (error) {
      res.json(error);
    }
    // }

    res.status(404).send({
      error:
        "You must be signed in to view the protected content of this route.",
    });
  } else {
    res.status(400).send({
      error: "Wrong request method",
    });
  }
}
