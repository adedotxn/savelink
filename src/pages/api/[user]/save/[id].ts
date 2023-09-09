import type { NextApiRequest, NextApiResponse } from "next";
import connect from "@db/lib/connectdb";
import Link from "@db/models/schema";
import { getServerSession } from "next-auth/next";
import { authOptions } from "src/lib/authOptions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (session && req.method === "DELETE") {
    try {
      const { id } = req.query;
      await connect();
      await Link.findByIdAndDelete(id);
      return res.status(204).json({ status: "success" });
    } catch (error) {
      return res.status(404).json({ status: "error", error });
    }
  }

  return res.send({
    error: "You must be signed in to view the protected content on this page.",
  });
}
