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

  if (session && req.method === "PUT") {
    try {
      const { id } = req.query;
      await connect();
      const sl = await Link.findById(id);
      sl.bookmarked = !sl.bookmarked;
      sl.save();

      if (sl.bookmarked) {
        return res
          .status(200)
          .json({ status: "success", message: "Bookmarked." });
      } else {
        return res
          .status(200)
          .json({ status: "success", message: "Bookmark Removed." });
      }
    } catch (error) {
      res.status(404).json({ status: "error", data: error });
    }
  } else {
    res.status(404).send({
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }
}
