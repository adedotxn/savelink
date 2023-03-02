// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@api/auth/[...nextauth]";
import connect from "@db/lib/connectdb";
import Link from "@db/models/schema";
import { unstable_getServerSession } from "next-auth/next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user } = req.query;
  await connect();

  if (req.method !== "GET") {
    return res.status(400).json({ status: "error", message: "Wrong meethod" });
  }

  if (req.method === "GET") {
    const session = await unstable_getServerSession(req, res, authOptions);

    try {
      const data = await Link.find({ identifier: `${user}` }).sort({
        time: -1,
      });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json(error);
    }

    // res.status(404).send({
    //   error:
    //     "You must be signed in to view the protected content of this route.",
    // });
  }
}
