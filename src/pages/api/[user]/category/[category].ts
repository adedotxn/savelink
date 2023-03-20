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
      const { category: query } = req.query;
      await connect();

      //getting for links stored only under "category" before the categories update
      const category = await Link.find({ category: `${query}` }).sort({
        time: -1,
      });

      //getting links added after the multi-category update. There's probably a better way to do this hmph
      const categories = await Link.find({ categories: `${query}` }).sort({
        time: -1,
      });

      const allCategories = [...categories, ...category];

      res.json(allCategories);
      return;
    } catch (error) {
      res.json(error);
    }
  }

  res.send({
    error: "You must be signed in to view the protected content on this page.",
  });
}
