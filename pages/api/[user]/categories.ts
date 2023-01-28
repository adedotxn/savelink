// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import connect from "../../../backend/lib/connectdb";
import Link from "../../../backend/models/schema";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  await connect();
  const { user } = req.query;
  console.log("user", user);

  //   if (session) {
  try {
    const data = await Link.find({ identifier: `${user}` }).sort({
      time: -1,
    });

    let category: string[] = [];
    let catgeories: string[] = [];

    data.map((data) => {
      catgeories.push(data.categories);
      category.push(data.category);
    });

    const _allCategories = [...catgeories, ...category];

    const filter = _allCategories.flat().filter((e) => e !== null);
    const allCategories = [...new Set(filter)];

    return res.status(200).json(allCategories);
  } catch (error) {
    res.status(404).json(error);
  }
  //   }

  //   res.send({
  //     error: "You must be signed in to view the protected content on this page.",
  //   });
}
