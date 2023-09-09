import type { NextApiRequest, NextApiResponse } from "next";
import connect from "@db/lib/connectdb";
import Link from "@db/models/schema";
import { getServerSession } from "next-auth/next";

/** Endpoint to get all links saved in a category */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { category: query } = req.query;
      await connect();

      //getting for links stored only under "category" before the categories update
      const linksInCategory = await Link.find({ category: `${query}` }).sort({
        time: -1,
      });

      //getting links added after the multi-category update. There's probably a better way to do this hmph
      const linksInCategories = await Link.find({
        categories: `${query}`,
      }).sort({
        time: -1,
      });

      const allLinks = [...linksInCategories, ...linksInCategory];
      return res.status(200).json(allLinks);
    } catch (error) {
      res.json(error);
    }
  }

}
