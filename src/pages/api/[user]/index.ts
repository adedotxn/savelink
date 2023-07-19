import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@api/auth/[...nextauth]";
import connect from "@db/lib/connectdb";
import Link from "@db/models/schema";
import { getServerSession } from "next-auth/next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user } = req.query;
  const session = await getServerSession(req, res, authOptions);
  await connect();

  if (req.method !== "GET") {
    return res.status(400).json({ status: "error", message: "Wrong method" });
  }

  if (req.method === "GET" && session) {
    try {
      const data = await Link.find({ identifier: `${user}` }).sort({
        time: -1,
      });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(404).send({
      error:
        "You must be signed in to view the protected content of this route.",
    });
  }
}
