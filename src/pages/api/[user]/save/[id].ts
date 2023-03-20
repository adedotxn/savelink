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
  if (session && req.method === "DELETE") {
    try {
      const { id } = req.query;
      await connect();
      await Link.findByIdAndDelete(id);
      return res.status(204).json({ status: "success" });
    } catch (error) {
      res.status(404).json({ status: "error", error });
    }
  }

  res.send({
    error: "You must be signed in to view the protected content on this page.",
  });
}
