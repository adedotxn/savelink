import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import connect from "@db/lib/connectdb";
import Link from "@db/models/schema";
import { authOptions } from "src/lib/authOptions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (session && req.method === "UPDATE") {
    try {
      const { id } = req.query;
      await connect();
      const savedLink = await Link.findById(id).sort({ time: -1 });
      savedLink.title = req.body.title;
      savedLink.url = req.body.url;
      savedLink.save();

      return res.status(200).json(savedLink);
    } catch (error) {
      res.json(error);
    }
  }

  res.send({
    error: "You must be signed in to view the protected content on this page.",
  });
}
