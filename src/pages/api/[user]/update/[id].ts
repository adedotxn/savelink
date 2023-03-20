// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@api/auth/[...nextauth]";
import connect from "@db/lib/connectdb";
import Link from "@db/models/schema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    try {
      const { id } = req.query;
      await connect();
      const sl = await Link.findById(id).sort({ time: -1 });
      sl.title = req.body.title;
      sl.url = req.body.url;
      sl.save();
      res.json(sl);
      return;
    } catch (error) {
      res.json(error);
    }
  }

  res.send({
    error: "You must be signed in to view the protected content on this page.",
  });
}
