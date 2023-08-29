import { authOptions } from "@api/auth/[...nextauth]";
import connect from "@db/lib/connectdb";
import Link from "@db/models/schema";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  await connect();
  const { user } = req.query;

  if (req.method === "GET") {
    try {
      const data = await Link.find({
        identifier: `${user}`,
        bookmarked: true,
      }).sort({
        time: -1,
      });

      return res.status(200).json(data);
    } catch (error) {
      return res.status(404).json(error);
    }
  }
}
