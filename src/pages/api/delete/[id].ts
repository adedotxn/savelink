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
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session) {
    try {
      const { id } = req.query;
      await connect();
      const deleteLink = await Link.findByIdAndDelete(id);
      res.json(deleteLink);
      return;
    } catch (error) {
      res.json(error);
    }
  }

  res.send({
    error: "You must be signed in to view the protected content on this page.",
  });
}
