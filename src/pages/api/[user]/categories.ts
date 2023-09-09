import connect from "@db/lib/connectdb";
import Link from "@db/models/schema";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connect();
  const { user } = req.query;

  if (req.method === "GET") {
    try {
      const data: { category?: string; categories: String[] }[] =
        await Link.find({ identifier: user }).select(
          "category categories -_id"
        );

      const _allCategories: String[] = [];
      data.forEach((data) => {
        if (data.category !== undefined) {
          _allCategories.push(data.category);
        }

        data.categories.forEach((data) => {
          if (data.length > 0) _allCategories.push(data);
        });
      });

      const allCategories = [...new Set(_allCategories)];
      return res.status(200).json(allCategories);
    } catch (error) {
      return res.status(404).json(error);
    }
  }

  return res.send({
    error: "You must be signed in to view the protected content on this page.",
  });
}
